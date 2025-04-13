import { useEffect, useState } from "react";
import { EditingTextSpan, EditingTextSpanDto, mapEditingTextSpan } from "../../../entities/text";
import { SharedLib } from "../../../shared/lib";

export const getUrlTextId = SharedLib.useUrlTextId;

export function useEditingText(dto: EditingTextSpanDto, page: number) {
  const [text, setText] = useState<EditingTextSpan>(mapEditingTextSpan(dto));
  const [oldDto, setOldDto] = useState<EditingTextSpanDto>(dto);
  const [oldPage, setOldPage] = useState<number>()

  // if (dto !== oldDto) {
  //   setOldDto(dto);
  //   setText(mapEditingTextSpan(dto));
  // }

  useEffect(() => {
    if (!text || (page !== oldPage)) {
      setText(mapEditingTextSpan(dto));
      setOldPage(page);
    }
  }, [dto]);

  function updateState() {
    const newText = text.getCopy();
    setText(newText);
  }

  return {
    text,
    updateState,
    setText,
  }
}

export enum Warnings {
  EDITING = "You're editting the text at the moment. Continue?",
  UNSAVING = "You have unsaved blocks yet. Continue?",
}