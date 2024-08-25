import { useQuery } from "react-query"
import { WordApi } from "../api"
import { TranslationWordDto } from "../model";
import { useState } from "react";
import { TodayList } from "../model/todayList";
import { mapTodayWord } from "../model/mappers";
import { TodayWordClass } from "../model/todayWord";

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
      console.log(data);
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

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: wordKeys.todayList.root,
    queryFn: () => {
      return WordApi.getTodayList();
    },
    onSuccess: (data) => {
      console.log(data);
      setTodayList(new TodayList(data.map((translatorWord) => mapTodayWord(translatorWord))));
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

const useWords = () => {

  const [words, setWords] = useState<TodayWordClass[]>([])

  const { isLoading, isError } = useQuery({
    queryKey: wordKeys.allWords.root,
    queryFn: () => {
      return WordApi.getAllWords();
    },
    onSuccess: (data) => {
      setWords(data.map(word => mapTodayWord(word)));
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
  }
}

export const WordLib = {
  useWordTranslation,
  useTodayList,
  useWords,
}