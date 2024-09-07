import { useState } from "react";
import { TextListClass, TextPreviewClass, TextSpanClass, Translation, TranslationDto } from "../model";
import { useMutation, useQuery } from "react-query";
import { TextApi } from "../api";
import { StringSpan } from "../../word";
import { mapTextSpanDto, mapTranslationDto } from "../model/mappers";
import { useAppSelector } from "../../../app/store";

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
  }
}

const useTextPreviewsList = (userId: number) => {

  const [textList, setTextList] = useState<TextListClass>(new TextListClass([]));

  const { data, isLoading, isError } = useQuery({
    queryKey: textsKeys.texts.slug(userId),
    queryFn: () => {
      return TextApi.getAllByUser();
    },
    onSuccess: (data) => {
      const textPreviews: TextPreviewClass[] = data.map(
        textPreview => new TextPreviewClass(textPreview.id, textPreview.name, textPreview.content)
      );
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
  }
}

const useLastTextPreviews = () => {

  const { user } = useAppSelector(state => state.user);

  const [textList, setTextList] = useState<TextListClass>(new TextListClass([]));

  const { data, isLoading, isError } = useQuery({
    queryKey: textsKeys.texts.slug(user!.id),
    queryFn: () => {
      return TextApi.getLastTextsByUser();
    },
    onSuccess: (data) => {
      const textPreviews: TextPreviewClass[] = data.map(
        textPreview => new TextPreviewClass(textPreview.id, textPreview.name, textPreview.content)
      );
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
  }
}

const useTextSpan = (textId: number) => {

  const [textSpan, setTextSpan] = useState<TextSpanClass>(new TextSpanClass(0, '', [], ''));

  const { data, isLoading, isError } = useQuery({
    queryKey: textsKeys.text.slug(textId),
    queryFn: () => {
      return TextApi.getTextArray(textId);
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
  useLastTextPreviews,
  useTextSpan,
  useTranslation,
}