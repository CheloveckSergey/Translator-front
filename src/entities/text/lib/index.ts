import { useEffect, useState } from "react";
import { ShortTextPreviewDto, TextList, TextMetaDto, TextPagination, TextPreview, TextSpanDto, TextsInfo, Translation } from "../model";
import { AllTextPreviewsQuery, GTextPreviewsQuery, LastFriendsTextsQuery, TextApi, TextPreviewsQuery, TextQuery, TextsInfoQuery } from "../api";
import { mapShortTextPreview, mapTextMeta, mapTextPreviewDto, mapTextsInfo, mapTranslationDto, mapPremiereTextSpan } from "../model/mappers";
import { ShortTextPreview } from "../model/types/shortTextPreview";
import { SharedHooks } from "../../../shared/lib";
import { InfiniteData, useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const textsKeys = {
  texts: {
    root: 'texts',
    slug: (query: GTextPreviewsQuery) => {
      const keys: (string | number)[] = [textsKeys.texts.root];
      Object.values(query).forEach(value => {
        keys.push(String(value));
      });
      return keys
    },
  },
  text: {
    root: 'text',
    slug: (query: TextQuery) => [textsKeys.text.root, query.textId, query.page, query.limit],
  },
  textMeta: {
    root: 'textMeta',
    slug: (textId: number) => [textsKeys.textMeta.root, textId],
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
    initialPageParam: 0,
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
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (!lastPage.length || lastPage.length < query.limit) return null;
      const nextPageParam = pages.flat().filter(text => !text.isDeleted).length;
      return nextPageParam
    },
    gcTime: 60 * 1000,
    // cacheTime: 60 * 1000,
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

const useAllTextPreviewsList = (query: AllTextPreviewsQuery) => {

  const queryData = useInfiniteQuery({
    queryKey: textsKeys.texts.slug(query),
    queryFn: async ({ pageParam = query.offset ?? 0 }) => {
      const data = await TextApi.getAllTextPreviews({ 
        offset: pageParam, 
        limit: query.limit, 
        order: query.order, 
      });
      return data.map(mapTextPreviewDto)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!query.limit) {
        return null
      }
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    },
    gcTime: 60 * 1000,
  });

  return {
    ...queryData,
    data: queryData.data?.pages.flat() || [],
  }
}

const useFriendsLastTexts = (query: LastFriendsTextsQuery) => {

  const { 
    data: texts,
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
  }
}

const useTextMeta = (textId: number) => {

  const query = useQuery({
    queryKey: textsKeys.textMeta.slug(textId),
    queryFn: () => {
      return TextApi.getTextMeta(textId)
    },
    select: (dto: TextMetaDto) => {
      return mapTextMeta(dto)
    }
  });

  return query
}

const useTextSpan = (query: Omit<TextQuery, 'page'>) => {

  const [pagesTotal, setPagesTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(() => {
    const _page = localStorage.getItem(`TEXT_${query.textId}_PAGE`);
    const page = Number(_page);
    if (page && page > 0) {
      return page
    } else {
      return 0
    }
  });

  const [isNewPage, setIsNewPage] = useState<boolean>(false);

  //Переделать
  useEffect(() => {
    localStorage.setItem(`TEXT_${query.textId}_PAGE`, String(page));
  }, [page]);

  const result = useQuery({
    queryKey: textsKeys.text.slug({ ...query, page }),
    queryFn: async () => {
      const data = await TextApi.getTextSpan({ ...query, page });

      setPagesTotal(data.pagesTotal || 1);
      
      if ((page > 0) && (page + 1 > data.pagesTotal) && !isNewPage) {
        setPage(data.pagesTotal - 1);
      }

      setIsNewPage(false);

      return data;
    },
  });

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

  function newPage() {
    if ((page + 1) !== pagesTotal) {
      return
    }
    if (result.data && result.data.blocks.length < query.limit) {
      return
    }

    setIsNewPage(true);
    setPage(prev => prev + 1);
  }

  const pagination: TextPagination = {
    page,
    pageTotal: pagesTotal,
    nextPage,
    prevPage,
    setPage,
  }

  return {
    result,
    pagination,
    newPage,
  }
}

const useTranslation = () => {

  const [translation, setTranslation] = useState<Translation>()

  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: ({ value } : { value: string }) => {
      return TextApi.getTranslation(value)
    },
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
    isLoading: isPending,
    isError,
    refetch: mutateAsync,
    updateState,
  }
}

const useTextsInfo = (query: TextsInfoQuery) => {

  const [info, setInfo] = useState<TextsInfo>(new TextsInfo(0, 0, 0));

  const { isFetching, isError } = useQuery({
    queryKey: textsKeys.textsInfo.slug(query.userId),
    queryFn: async () => {
      const data = await TextApi.getTextsInfo(query);
      setInfo(mapTextsInfo(data));
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

export const TextsLib = {
  useTextPreviewsList,
  useTextPreviewsList2,
  useAllTextPreviewsList,
  useFriendsLastTexts,
  useTextSpan,
  // useEditingTextSpan,
  useTranslation,
  useTextsInfo,
  useTextMeta,
}