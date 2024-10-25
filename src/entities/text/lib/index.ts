import { useState } from "react";
import { TextListClass, TextPreviewClass, TextSpanClass, Translation, TranslationDto } from "../model";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { TextApi, TextPreviewsQuery } from "../api";
import { StringSpan } from "../../word";
import { mapShortTextPreview, mapTextListDto, mapTextPreview, mapTextSpanDto, mapTranslationDto } from "../model/mappers";
import { useAppSelector } from "../../../app/store";
import { ShortTextPreview } from "../model/shortTextPreview";

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

const useTextPreviewsList = (query: TextPreviewsQuery) => {

  const [textList, setTextList] = useState<TextListClass>(new TextListClass([]));

  const { isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
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
      let textPreviews: TextPreviewClass[] = [];
      for (let page of data.pages) {
        const curTextPreviews = page.map(mapTextPreview);
        textPreviews = [...textPreviews, ...curTextPreviews];
      }
      setTextList(new TextListClass(textPreviews));
    }
  });

  function updateTexts() {
    const textListCopy = textList.getCopy();
    setTextList(textListCopy);
  }

  return {
    textList,
    setTextList,
    isLoading,
    isError,
    updateTexts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  }
}

const useFriendsLastTexts = () => {
  const { user } = useAppSelector(state => state.user);

  const [texts, setTexts] = useState<ShortTextPreview[]>([]);

  const { isLoading, isError } = useQuery({
    queryKey: textsKeys.friendsLastTexts.slug(user!.id),
    queryFn: () => {
      return TextApi.getFriendsLastTexts();
    },
    onSuccess: (data) => {
      setTexts(data.map(mapShortTextPreview));
    }
  });

  function updateTexts() {
    const textCopies = texts.map(text => text.getCopy());
    setTexts(textCopies);
  }

  return {
    texts,
    setTexts,
    isLoading,
    isError,
    updateTexts,
  }
}

const useTextSpan = (textId: number) => {

  const [textSpan, setTextSpan] = useState<TextSpanClass>(new TextSpanClass(0, '', [], ''));

  const { data, isLoading, isError } = useQuery({
    queryKey: textsKeys.text.slug(textId),
    queryFn: () => {
      return TextApi.getTextSpan(textId);
    },
    onSuccess: (data) => {
      console.log(data);
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