import { useInfiniteQuery, useQuery } from "react-query";
import { FriendsApi, GetFindFriendsQuery, GetFriendsQuery, GetIncomeRequestsQuery, GetOutcomeRequestsQuery, UserApi, UserQuery } from "../api";
import { useState } from "react";
import { FindFriendDto, Friend, FriendDto, IncomeRequestUser, IncomeRequestUserDto, OutcomeRequestUser, OutcomeRequestUserDto, PotentialFriend, User } from "../model";
import { mapFindFriendDto, mapFriendDto, mapIncomeRequest, mapOutcomeRequest, mapUserDto } from "../model/mappers";
import { SharedHooks, SharedLib } from "../../../shared/lib";

const userKeys = {
  findUsers: {
    root: 'findUsers',
    slug: (userId: number) => [userKeys.findUsers.root, userId],
  },
  friends: {
    root: 'friends',
    slug: (userId: number) => [userKeys.friends.root, userId],
  },
  incomeRequests: {
    root: 'incomeRequests',
    slug: (userId: number) => [userKeys.incomeRequests.root, userId],
  },
  outcomeRequests: {
    root: 'outcomeRequests',
    slug: (userId: number) => [userKeys.outcomeRequests.root, userId],
  },
  user: {
    root: 'user',
    slug: (userId: number, query?: UserQuery) => {
      const keys = [userKeys.user.root, userId];
      if (query) {
        keys.push(...Object.values(query).map(String));
      }
      return keys
    },
  }
}

const useFriends = (query: GetFriendsQuery) => {

  const data = SharedHooks.useMyInfineQuery<Friend, GetFriendsQuery, FriendDto>({
    query,
    apiFunction: FriendsApi.getFriends,
    mapDto: mapFriendDto,
    queryKey: userKeys.friends.slug(query.userId),
  })

  return {
    ...data,
    users: data.entities,
  }
}

const useFindFriends = (query: GetFindFriendsQuery) => {

  const data = SharedHooks.useMyInfineQuery<PotentialFriend, GetFindFriendsQuery, FindFriendDto>({
    query,
    apiFunction: FriendsApi.getFindFriends,
    mapDto: mapFindFriendDto,
    queryKey: userKeys.friends.slug(query.userId),
  })

  return {
    ...data,
    users: data.entities,
  }
}

const useIncomeRequests = (query: GetIncomeRequestsQuery) => {

  const data = SharedHooks.useMyInfineQuery<IncomeRequestUser, GetIncomeRequestsQuery, IncomeRequestUserDto>({
    query,
    apiFunction: FriendsApi.getIncomeRequests,
    mapDto: mapIncomeRequest,
    queryKey: userKeys.friends.slug(query.userId),
  })

  return {
    ...data,
    users: data.entities,
  }
}

const useOutcomeRequests = (query: GetOutcomeRequestsQuery) => {

  const data = SharedHooks.useMyInfineQuery<OutcomeRequestUser, GetOutcomeRequestsQuery, OutcomeRequestUserDto>({
    query,
    apiFunction: FriendsApi.getOutcomeRequests,
    mapDto: mapOutcomeRequest,
    queryKey: userKeys.friends.slug(query.userId),
  })

  return {
    ...data,
    users: data.entities,
  }
}

const useUser = (userId: number, query?: UserQuery) => {
  const [user, setUser] = useState<User>();

  const { isFetching, isError } = useQuery({
    queryKey: userKeys.user.slug(userId, query),
    queryFn: () => {
      return UserApi.getUserById(userId, query)
    },
    onSuccess: (data) => {
      setUser(mapUserDto(data));
    },
  });

  function updateState() {
    const newUser = user?.getCopy();
    setUser(newUser);
  }

  return {
    user,
    isLoading: isFetching,
    isError,
    updateState,
  }
}

export const UserLib = {
  useFindFriends,
  useFriends,
  useIncomeRequests,
  useOutcomeRequests,
  useUser,
}