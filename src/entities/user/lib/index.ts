import { useInfiniteQuery, useQuery } from "react-query";
import { useAppSelector } from "../../../app/store";
import { FriendsApi, GetFindFriendsQuery, GetFriendsQuery, GetIncomeRequestsQuery, GetOutcomeRequestsQuery, UserApi, Users1Query } from "../api";
import { useState } from "react";
import { User } from "../model";
import { mapFindFriendDto, mapFriendDto, mapIncomeRequest, mapOutcomeRequest, mapUserDto } from "../model/mappers";
import { FindFriend } from "../model/findFriend";
import { Friend } from "../model/friend";
import { IncomeRequestUser } from "../model/incomeRequest";
import { OutcomeRequestUser } from "../model/outcomeRequest";

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
    slug: (userId: number, meUserId: number) => [userKeys.user.root, userId, meUserId],
  }
}

const useFriends = (query: GetFriendsQuery) => {
  const { user } = useAppSelector(state => state.user);

  const [users, setUsers] = useState<Friend[]>([]);

  const { 
    isLoading, 
    isError, 
    fetchNextPage, 
    isFetchingNextPage, 
    hasNextPage 
  } = useInfiniteQuery({
    queryKey: userKeys.friends.slug(user!.id),
    queryFn: ({ pageParam = query.offset ?? 0 }) => {
      return FriendsApi.getFriends({ 
        offset: pageParam, 
        limit: query.limit, 
        order: query.order,
        userId: query.userId,
      });
    },
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    },
    onSuccess: (data) => {
      let users: Friend[] = [];
      for (let page of data.pages) {
        const curUsers = page.map(mapFriendDto);
        users = [...users, ...curUsers];
      }
      setUsers(users);
    }
  });

  function updateState() {
    const newUsers = users.map(user => user.getCopy());
    setUsers(newUsers); 
  }

  return {
    users,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    updateState,
  }
}

const useIncomeRequests = (query: GetIncomeRequestsQuery) => {
  const { user } = useAppSelector(state => state.user);

  const [users, setUsers] = useState<IncomeRequestUser[]>([]);

  const { 
    isLoading, 
    isError, 
    fetchNextPage, 
    isFetchingNextPage, 
    hasNextPage 
  } = useInfiniteQuery({
    queryKey: userKeys.incomeRequests.slug(user!.id),
    queryFn: ({ pageParam = query.offset ?? 0 }) => {
      return FriendsApi.getIncomeRequests({ 
        offset: pageParam, 
        limit: query.limit, 
        order: query.order,
        userId: query.userId,
      });
    },
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    },
    onSuccess: (data) => {
      let users: IncomeRequestUser[] = [];
      for (let page of data.pages) {
        const curUsers = page.map(mapIncomeRequest);
        users = [...users, ...curUsers];
      }
      setUsers(users);
    }
  });

  function updateState() {
    const newUsers = users.map(user => user.getCopy());
    setUsers(newUsers); 
  }

  return {
    users,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    updateState,
  }
}

const useOutcomeRequests = (query: GetOutcomeRequestsQuery) => {
  const { user } = useAppSelector(state => state.user);

  const [users, setUsers] = useState<OutcomeRequestUser[]>([]);

  const { 
    isLoading, 
    isError, 
    fetchNextPage, 
    isFetchingNextPage, 
    hasNextPage 
  } = useInfiniteQuery({
    queryKey: userKeys.outcomeRequests.slug(user!.id),
    queryFn: ({ pageParam = query.offset ?? 0 }) => {
      return FriendsApi.getOutcomeRequests({ 
        offset: pageParam, 
        limit: query.limit, 
        order: query.order,
        userId: query.userId,
      });
    },
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    },
    onSuccess: (data) => {
      let users: OutcomeRequestUser[] = [];
      for (let page of data.pages) {
        const curUsers = page.map(mapOutcomeRequest);
        users = [...users, ...curUsers];
      }
      setUsers(users);
    }
  });

  function updateState() {
    const newUsers = users.map(user => user.getCopy());
    setUsers(newUsers); 
  }

  return {
    users,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    updateState,
  }
}

const useFindFriends = (query: GetFindFriendsQuery) => {
  const { user } = useAppSelector(state => state.user);

  const [users, setUsers] = useState<FindFriend[]>([]);

  const { 
    isLoading, 
    isError, 
    fetchNextPage, 
    isFetchingNextPage, 
    hasNextPage 
  } = useInfiniteQuery({
    queryKey: userKeys.findUsers.slug(user!.id),
    queryFn: ({ pageParam = query.offset ?? 0 }) => {
      return FriendsApi.getFindFriends({ 
        offset: pageParam, 
        limit: query.limit, 
        order: query.order,
        userId: query.userId,
      });
    },
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    },
    onSuccess: (data) => {
      let users: FindFriend[] = [];
      for (let page of data.pages) {
        const curUsers = page.map(mapFindFriendDto);
        users = [...users, ...curUsers];
      }
      setUsers(users);
    }
  });

  function updateState() {
    const newUsers = users.map(user => user.getCopy());
    setUsers(newUsers); 
  }

  return {
    users,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    updateState,
  }
}

const useUser = (userId: number, meUserId: number) => {
  const [user, setUser] = useState<User>();

  const { isLoading, isError } = useQuery({
    queryKey: userKeys.user.slug(userId, meUserId),
    queryFn: () => {
      return UserApi.getUserById(userId)
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
    isLoading,
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