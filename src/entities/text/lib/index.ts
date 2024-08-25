import { useState } from "react";
import { TextListClass, TextPreviewClass, TextSpanClass } from "../model";
import { useQuery } from "react-query";
import { TextApi } from "../api";
import { StringSpan } from "../../word";
import { mapTextSpanDto } from "../model/mappers";

const textsKeys = {
  texts: {
    root: 'texts',
    slug: (userId: number) => [textsKeys.texts.root, userId],
  },
  text: {
    root: 'text',
    slug: (textId: number) => [textsKeys.text.root, textId],
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

  return {
    textList,
    setTextList,
    isLoading,
    isError,
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

export const TextsLib = {
  useTextPreviewsList,
  useTextSpan,
}