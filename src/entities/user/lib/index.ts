import { FriendsApi, GetFindFriendsQuery, GetFriendsQuery, GetIncomeRequestsQuery, GetOutcomeRequestsQuery, UserApi, UserQuery, UserQuery1 } from "../api";
import { useState } from "react";
import { AvatarUser, FindFriendDto, Friend, FriendDto, IncomeRequestUser, IncomeRequestUserDto, OutcomeRequestUser, OutcomeRequestUserDto, PotentialFriend, User, UserDtoSchema } from "../model";
import { mapFindFriendDto, mapFriendDto, mapIncomeRequest, mapOutcomeRequest, mapAvatarUserDto } from "../model/mappers";
import { SharedHooks, SharedLib } from "../../../shared/lib";
import { useQuery } from "@tanstack/react-query";
import { Copyable } from "../../../shared/types";

export const userKeys = {
  findUsers: {
    root: 'findUsers',
    slug: (userId: number) => [userKeys.findUsers.root, String(userId)],
  },
  friends: {
    root: 'friends',
    slug: (userId: number) => [userKeys.friends.root, String(userId)],
  },
  incomeRequests: {
    root: 'incomeRequests',
    slug: (userId: number) => [userKeys.incomeRequests.root, String(userId)],
  },
  outcomeRequests: {
    root: 'outcomeRequests',
    slug: (userId: number) => [userKeys.outcomeRequests.root, String(userId)],
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
  const queryKey = userKeys.friends.slug(query.userId);
  const data = SharedHooks.useMyInfineQuery3<Friend, GetFriendsQuery, FriendDto>({
    query,
    apiFunction: FriendsApi.getFriends,
    mapDto: mapFriendDto,
    queryKey,
  });

  console.log(data.error);

  return {
    ...data,
    queryKey,
  }
}

const useFindFriends = (query: GetFindFriendsQuery) => {
  const queryKey = userKeys.findUsers.slug(query.userId);
  const data = SharedHooks.useMyInfineQuery3<PotentialFriend, GetFindFriendsQuery, FindFriendDto>({
    query,
    apiFunction: FriendsApi.getFindFriends,
    mapDto: mapFindFriendDto,
    queryKey,
  })

  return {
    ...data,
    queryKey,
  }
}

const useIncomeRequests = (query: GetIncomeRequestsQuery) => {
  const queryKey = userKeys.incomeRequests.slug(query.userId);
  const data = SharedHooks.useMyInfineQuery3<IncomeRequestUser, GetIncomeRequestsQuery, IncomeRequestUserDto>({
    query,
    apiFunction: FriendsApi.getIncomeRequests,
    mapDto: mapIncomeRequest,
    queryKey,
  })

  return {
    ...data,
    queryKey,
  }
}

const useOutcomeRequests = (query: GetOutcomeRequestsQuery) => {
  const queryKey = userKeys.outcomeRequests.slug(query.userId);
  const data = SharedHooks.useMyInfineQuery3<OutcomeRequestUser, GetOutcomeRequestsQuery, OutcomeRequestUserDto>({
    query,
    apiFunction: FriendsApi.getOutcomeRequests,
    mapDto: mapOutcomeRequest,
    queryKey,
  })

  return {
    ...data,
    queryKey,
  }
}

const useAvatarUser = (userId: number, query?: UserQuery) => {
  const [user, setUser] = useState<AvatarUser>();

  const { isFetching, isError } = useQuery({
    queryKey: userKeys.user.slug(userId, query),
    queryFn: async () => {
      const data = await UserApi.getUserById(userId, query);
      setUser(mapAvatarUserDto(data));
      return data
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

function useUser1<
  E extends Copyable<E>,
  K extends keyof UserDtoSchema,
>(
  query: UserQuery1<K>,
  mapper: (dto: Pick<UserDtoSchema, K>) => E,
) {
  const [user, setUser] = useState<E>();

  const { isFetching, isError } = useQuery({
    queryKey: ['user', ...query.fields],
    queryFn: async () => {
      const data = await UserApi.getUser1(query);
      setUser(mapper(data));
      return data
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
  useAvatarUser,
  useUser1,
}