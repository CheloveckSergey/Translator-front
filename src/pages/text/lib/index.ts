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

export interface WarningOperation {
  operation: () => void,
}

export enum Warnings {
  EDITING = "You're editting the text at the moment. Continue?",
  UNSAVING = "You have unsaved blocks yet. Continue?",
}

export type ShowWarningIf = (conditionText: {
  condition: boolean;
  text: Warnings;
} | {
  condition: boolean;
  text: Warnings;
}[], operation: () => void) => void

export function useWarning() {
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [operation, setOperation] = useState<WarningOperation>();
  const [warnings, setWarnings] = useState<Warnings[]>([]);

  function showWarning(operation: () => void, texts: Warnings[]) {
    setOperation({
      operation,
    });
    setWarnings(texts);
    setIsWarning(true);
  }

  const showWarningIf: ShowWarningIf = (
    conditionText: {
      condition: boolean,
      text: Warnings,
    } | {
      condition: boolean,
      text: Warnings,
    }[],
    operation: () => void, 
  ) => {
    if (Array.isArray(conditionText)) {
      const texts: Warnings[] = [];
      for (let condition of conditionText) {
        if (condition.condition) {
          texts.push(condition.text);
        }
      }
      if (texts.length) {
        showWarning(operation, texts);
      } else {
        operation();
      }
    } else {
      if (conditionText.condition) {
        showWarning(operation, [conditionText.text]);
      } else {
        operation();
      }
    }
  }
  
  function closeWarning() {
    setIsWarning(false);
    setOperation(undefined);
    setWarnings([]);
  }

  return {
    isWarning,
    operation,
    warnings,
    showWarning,
    showWarningIf,
    closeWarning,
  }
}