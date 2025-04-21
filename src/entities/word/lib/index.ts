import { UserWordsQuery, WordApi, WordsInfoQuery } from "../api"
import { TodayList, UserWordInfo, UserWordInfoDto, WordsInfo } from "../model";
import { useState } from "react";
import { mapTodayWord, mapUserWordInfo, mapWordsInfo } from "../model/mappers";
import { SharedHooks } from "../../../shared/lib";
import { useQuery } from "@tanstack/react-query";

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
    slug: (query: UserWordsQuery) => {
      const keys: string[] = [wordKeys.allWords.root];
      Object.values(query).forEach(value => {
        keys.push(String(value));
      });
      return keys
    },
  },
  wordsInfo: {
    root: 'words',
    slug: (userId: number) => [wordKeys.wordsInfo.root, userId], 
  }
}

const useWordTranslation = (
  value: string, 
  setTranslation: (translation: string) => void, 
  options: { enabled: boolean }
) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: wordKeys.wordTranslation.slug(value),
    queryFn: async () => {
      const data = await WordApi.getTranslation(value);

      setTranslation(data.translation);

      return data
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
    queryKey: [wordKeys.todayList.root],
    queryFn: async () => {
      const data = await WordApi.getTodayList();

      setTodayList(new TodayList(data.map((todayWord) => mapTodayWord(todayWord))));

      return data
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

  const key = wordKeys.allWords.slug(query)

  const {
    data: words,
    isFetching,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    updateState,
  } = SharedHooks.useMyInfineQuery3<
    UserWordInfo,
    UserWordsQuery,
    UserWordInfoDto
  >({
    query,
    apiFunction: WordApi.getAllWords,
    queryKey: key,
    mapDto: mapUserWordInfo,
  }) 

  return {
    words,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    key,
    updateState,
  }
}

const useWordsInfo = (query: WordsInfoQuery) => {

  const [info, setInfo] = useState<WordsInfo>(new WordsInfo(0, 0, 0));

  const { isFetching, isError } = useQuery({
    queryKey: wordKeys.wordsInfo.slug(query.userId),
    queryFn: async () => {
      const data = await WordApi.getWordsInfo(query);

      setInfo(mapWordsInfo(data));

      return data
    },
  });

  function updateState() {
    const copy = info.getCopy();
    setInfo(copy);
  }

  return {
    info,
    updateState,
    isFetching,
    isError,
  }
}

export const WordLib = {
  useWordTranslation,
  useTodayList,
  useUserWords,
  useWordsInfo,
}