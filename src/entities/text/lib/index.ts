import { useEffect, useState } from "react";
import { ShortTextPreviewDto, TextList, TextPreview, TextPreviewDto, TextSchema, TextSpan, TextsInfo, Translation } from "../model";
import { InfiniteData, useInfiniteQuery, useMutation, useQuery } from "react-query";
import { LastFriendsTextsQuery, TextApi, TextPreviewsQuery, TextQuery, TextsInfoQuery } from "../api";
import { mapEditingTextSpan, mapShortTextPreview, mapTextListDto, mapTextPreviewDto, mapTextSpanDto, mapTextsInfo, mapTranslationDto } from "../model/mappers";
import { ShortTextPreview } from "../model/types/shortTextPreview";
import { SharedHooks } from "../../../shared/lib";
import { EditingTextSpan } from "../model/types/editingTextSpan";

export const textsKeys = {
  texts: {
    root: 'texts',
    slug: (query: TextPreviewsQuery) => [textsKeys.texts.root, query.userId, query.limit, query.offset, query.order],
  },
  text: {
    root: 'text',
    slug: (textId: number) => [textsKeys.text.root, textId],
  },
  editingText: {
    root: 'editingText',
    slug: (textId: number, page: number) => [textsKeys.editingText.root, textId, page],
  },
  translation: {
    root: 'translation',
    slug: (value: string) => [textsKeys.translation.root, value],
  },
  friendsLastTexts: {
    root: 'friendsLastTexts',
    slug: (userId: number) => [textsKeys.friendsLastTexts.root, userId],
  },
  textsInfo: {
    root: 'textsInfo',
    slug: (userId: number) => [textsKeys.textsInfo.root, userId],
  }
}

const useTextPreviewsList = (query: TextPreviewsQuery) => {

  const [textList, setTextList] = useState<TextList>(new TextList([]));

  const { isLoading, isFetching, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: textsKeys.texts.slug(query),
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
    select(data) {
      const newTextList = new TextList([]);
      for (let page of data.pages) {
        for (let textDto of page) {
          newTextList.pushText(mapTextPreviewDto(textDto));
        }
      }
      if (!newTextList.equal(textList)) {
        setTextList(newTextList);
      }
      return data
    },
    // refetchOnMount: false,
  });

  function updateTexts() {
    const textListCopy = textList.getCopy();
    setTextList(textListCopy);
  }

  return {
    textList,
    isLoading,
    isFetching,
    isError,
    updateTexts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  }
}

const useTextPreviewsList2 = (query: TextPreviewsQuery) => {

  const queryData = useInfiniteQuery({
    queryKey: textsKeys.texts.slug(query),
    queryFn: async ({ pageParam = query.offset ?? 0 }) => {
      const data = await TextApi.getAllTextPreviewsByUser({ 
        offset: pageParam, 
        limit: query.limit, 
        order: query.order, 
        userId: query.userId,
      });
      return data.map(mapTextPreviewDto)
    },
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    },
    cacheTime: 60 * 1000,
  });

  function mapData(data: InfiniteData<TextPreview[]> | undefined): TextPreview[] {
    if (!data) {
      return []
    }

    const texts: TextPreview[] = data.pages.flat();
    return texts
  }

  return {
    ...queryData,
    data: mapData(queryData.data)
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

  const [textSpan, setTextSpan] = useState<TextSpan>(new TextSpan(0, '', [], false));

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

const useEditingTextSpan = (textId: number) => {

  const [text, setText] = useState<EditingTextSpan>(new EditingTextSpan(0, '', []));
  const [page, setPage] = useState<number>(() => {
    const page = localStorage.getItem(`TEXT_${textId}_PAGE`);
    if (page) {
      return Number(page)
    } else {
      return 0
    }
  });
  const [pagesTotal, setPagesTotal] = useState<number>(0);

  const { isFetching, isError, refetch } = useQuery({
    queryKey: textsKeys.editingText.slug(textId, page),
    queryFn: () => {
      return TextApi.getEditingTextSpan({ 
        textId: textId,
        page,
      });
    },
    onSuccess: (data) => {
      setText(mapEditingTextSpan(data));
      setPagesTotal(data.pagesTotal);
    }
  });

  useEffect(() => {
    localStorage.setItem(`TEXT_${textId}_PAGE`, String(page));
  }, [page]);

  function updateState() {
    const newTextSpan = text.getCopy();
    setText(newTextSpan);
  }

  function nextPage() {
    if (pagesTotal <= (page + 1)) {
      return
    }
    setPage(prev => prev + 1);
  }

  function prevPage() {
    if (page === 0) {
      return
    }
    setPage(prev => prev - 1);
  }

  return {
    text,
    page,
    pagesTotal,
    isFetching,
    isError,
    updateState,
    nextPage,
    prevPage,
    setPage,
    refetch,
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

const useTextsInfo = (query: TextsInfoQuery) => {

  const [info, setInfo] = useState<TextsInfo>(new TextsInfo(0, 0, 0));

  const { isFetching, isError } = useQuery({
    queryKey: textsKeys.textsInfo.slug(query.userId),
    queryFn: () => {
      return TextApi.getTextsInfo(query);
    },
    onSuccess(data) {
      setInfo(mapTextsInfo(data));
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

export const TextsLib = {
  useTextPreviewsList,
  useTextPreviewsList2,
  useFriendsLastTexts,
  useTextSpan,
  useEditingTextSpan,
  useTranslation,
  useTextsInfo,
}