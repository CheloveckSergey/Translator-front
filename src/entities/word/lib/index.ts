import { useInfiniteQuery, useQuery } from "react-query"
import { WholeWordQuery, WordApi } from "../api"
import { TransWordDto } from "../model";
import { useState } from "react";
import { TodayList } from "../model/todayList";
import { mapTodayWord, mapWholeWord } from "../model/mappers";
import { TodayWordClass } from "../model/todayWord";
import { WholeWord } from "../model/wholeWord";

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

const useWholeWords = (query: WholeWordQuery) => {

  const [words, setWords] = useState<WholeWord[]>([]);

  const { isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: wordKeys.allWords.slug(query.userId ?? 0),
    queryFn: ({ pageParam = query.offset ?? 0 }) => {
      return WordApi.getAllWords({ 
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
      let words: WholeWord[] = [];
      for (let page of data.pages) {
        const curWords = page.map(word => mapWholeWord(word));
        words = [...words, ...curWords];
      }
      setWords(words);
    }
  });

  function updateWords() {
    const newWords = words.map(word => word.getCopy());
    setWords(newWords);
  }

  return {
    words,
    setWords,
    isLoading,
    isError,
    updateWords,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}

export const WordLib = {
  useWordTranslation,
  useTodayList,
  useWholeWords,
}