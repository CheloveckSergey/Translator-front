import { useEffect, useState } from "react";
import { ShortTextPreviewDto, TextList, TextPreview, TextSchema, TextSpan, TextsInfo, Translation } from "../model";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { LastFriendsTextsQuery, TextApi, TextPreviewsQuery, TextQuery, TextsInfoQuery, TextsQuery } from "../api";
import { StringSpan } from "../../word";
import { mapEditingTextSpan, mapShortTextPreview, mapTextListDto, mapTextPreviewDto, mapTextSpanDto, mapTextsInfo, mapTranslationDto } from "../model/mappers";
import { ShortTextPreview } from "../model/types/shortTextPreview";
import { SharedHooks } from "../../../shared/lib";
import { EditingTextSpan } from "../model/types/editingTextSpan";

const textsKeys = {
  texts: {
    root: 'texts',
    slug: (userId: number) => [textsKeys.texts.root, userId],
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

// function getTexts<K extends keyof TextSchema>(query: TextsQuery<K>) {
//   {

//   } = SharedHooks.useMyInfineQuery<

//   >
// }

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
// const useEditingTextSpan = (query: TextQuery) => {

//   const [textSpan, setTextSpan] = useState<EditingTextSpan>(new EditingTextSpan(0, '', []));

//   const { isFetching, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
//     queryKey: textsKeys.editingText.slug(query.textId),
//     queryFn: ({ pageParam = query.offset ?? 0 }) => {
//       return TextApi.getEditingTextSpan({ 
//         textId: query.textId,
//         offset: pageParam, 
//         limit: query.limit,
//       });
//     },
//     getNextPageParam: (lastPage, pages) => {
//       if (!query.limit) {
//         return null
//       }
//       if (lastPage.blocks.length < query.limit) return null;
//       const nextPageParam = lastPage.blocks.length ? pages.length * query.limit : null;
//       return nextPageParam;
//     },
//     onSuccess: (data) => {
//       const curDto = data.pages.at(-1);
//       if (curDto) {
//         const curTextSpan = mapEditingTextSpan(curDto);
//         setTextSpan(curTextSpan);
//       }
//     }
//   });

//   return {
//     textSpan,
//     setTextSpan,
//     isFetching,
//     isError,
//     fetchNextPage, 
//     hasNextPage, 
//     isFetchingNextPage,
//   }
// }

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
  useFriendsLastTexts,
  useTextSpan,
  useEditingTextSpan,
  useTranslation,
  useTextsInfo,
}