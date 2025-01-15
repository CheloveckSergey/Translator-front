import { useInfiniteQuery, useQuery } from "react-query"
import { UserWordsQuery, WordApi } from "../api"
import { TodayList, UserWordInfo, UserWordInfoDto } from "../model";
import { useState } from "react";
import { mapTodayWord, mapUserWordInfo } from "../model/mappers";
import { SharedHooks } from "../../../shared/lib";

const wordKeys = {
  wordTranslation: {
    root: 'wordTranslation',
    slug: (value: string) => [wordKeys.wordTranslation.root, value],
  },
  todayList: {
    root: 'todayList',
  },
  allWords: {
    root: 'allWords',
    slug: (userId: number) => [wordKeys.allWords.root, userId],
  }
}

const useWordTranslation = (
  value: string, 
  setTranslation: (translation: string) => void, 
  options: { enabled: boolean }
) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: wordKeys.wordTranslation.slug(value),
    queryFn: () => {
      return WordApi.getTranslation(value);
    },
    onSuccess: (data) => {
      setTranslation(data.translation);
    },
    enabled: options.enabled,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}

const useTodayList = (
  options: { enabled: boolean }
) => {
  const [todayList, setTodayList] = useState<TodayList>(new TodayList([]));

  const { isLoading, isError, refetch } = useQuery({
    queryKey: wordKeys.todayList.root,
    queryFn: () => {
      return WordApi.getTodayList();
    },
    onSuccess: (data) => {
      setTodayList(new TodayList(data.map((todayWord) => mapTodayWord(todayWord))));
    },
    enabled: options.enabled,
  });

  return {
    todayList,
    setTodayList,
    isLoading,
    isError,
    refetch,
  }
}

const useUserWords = (query: UserWordsQuery) => {

  const {
    entities: words,
    updateState,
    isFetching,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = SharedHooks.useMyInfineQuery<
    UserWordInfo,
    UserWordsQuery,
    UserWordInfoDto
  >({
    query,
    apiFunction: WordApi.getAllWords,
    queryKey: wordKeys.allWords.slug(query.userId),
    mapDto: mapUserWordInfo,
  })

  return {
    words,
    isFetching,
    isError,
    updateState,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}

export const WordLib = {
  useWordTranslation,
  useTodayList,
  useUserWords,
}