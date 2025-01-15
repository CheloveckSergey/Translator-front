import { useState } from "react";
import { ShortTextPreviewDto, TextList, TextPreview, TextSpan, Translation } from "../model";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { LastFriendsTextsQuery, TextApi, TextPreviewsQuery } from "../api";
import { StringSpan } from "../../word";
import { mapShortTextPreview, mapTextListDto, mapTextPreviewDto, mapTextSpanDto, mapTranslationDto } from "../model/mappers";
import { ShortTextPreview } from "../model/types/shortTextPreview";
import { SharedHooks } from "../../../shared/lib";

const textsKeys = {
  texts: {
    root: 'texts',
    slug: (userId: number) => [textsKeys.texts.root, userId],
  },
  text: {
    root: 'text',
    slug: (textId: number) => [textsKeys.text.root, textId],
  },
  translation: {
    root: 'translation',
    slug: (value: string) => [textsKeys.translation.root, value],
  },
  friendsLastTexts: {
    root: 'friendsLastTexts',
    slug: (userId: number) => [textsKeys.friendsLastTexts.root, userId],
  }
}

// const useTexts = (query)

const useTextPreviewsList = (query: TextPreviewsQuery) => {

  const [textList, setTextList] = useState<TextList>(new TextList([]));

  const { isFetching, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: textsKeys.texts.slug(query.userId),
    queryFn: ({ pageParam = query.offset ?? 0 }) => {
      return TextApi.getAllTextPreviewsByUser({ 
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
      let textPreviews: TextPreview[] = [];
      for (let page of data.pages) {
        const curTextPreviews = page.map(mapTextPreviewDto);
        textPreviews = [...textPreviews, ...curTextPreviews];
      }
      setTextList(new TextList(textPreviews));
    }
  });

  function updateTexts() {
    const textListCopy = textList.getCopy();
    setTextList(textListCopy);
  }

  return {
    textList,
    isFetching,
    isError,
    updateTexts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  }
}

const useFriendsLastTexts = (query: LastFriendsTextsQuery) => {

  const { 
    entities: texts,
    updateState,
    isFetching,
    isError,
  } = SharedHooks.useMyInfineQuery<
    ShortTextPreview,
    LastFriendsTextsQuery,
    ShortTextPreviewDto
  >({
    query,
    apiFunction: TextApi.getFriendsLastTexts,
    mapDto: mapShortTextPreview,
    queryKey: textsKeys.friendsLastTexts.slug(query.userId)
  });

  return {
    texts,
    isFetching,
    isError,
    updateState,
  }
}

const useTextSpan = (textId: number) => {

  const [textSpan, setTextSpan] = useState<TextSpan>(new TextSpan(0, '', [], ''));

  const { isLoading, isError } = useQuery({
    queryKey: textsKeys.text.slug(textId),
    queryFn: () => {
      return TextApi.getTextSpan(textId);
    },
    onSuccess: (data) => {
      setTextSpan(mapTextSpanDto(data));
    }
  });

  return {
    textSpan,
    setTextSpan,
    isLoading,
    isError,
  }
}

const useTranslation = () => {

  const [translation, setTranslation] = useState<Translation>()

  const { isLoading, isError, mutateAsync } = useMutation(({ value } : { value: string }) => {
    return TextApi.getTranslation(value)
  }, {
    onSuccess: (data) => {
      setTranslation(mapTranslationDto(data));
    }
  });

  function updateState() {
    if (!translation) {
      return
    }
    if (translation?.type === 'word') {
      const newTranslation: Translation = {
        type: 'word',
        word: translation.word.getCopy(),
      }
      setTranslation(newTranslation);
    } else {
      const newTranslation: Translation = {
        ...translation,
      }
      setTranslation(newTranslation);
    }
  }

  return {
    translation,
    isLoading,
    isError,
    refetch: mutateAsync,
    updateState,
  }
}

export const TextsLib = {
  useTextPreviewsList,
  useFriendsLastTexts,
  useTextSpan,
  useTranslation,
}