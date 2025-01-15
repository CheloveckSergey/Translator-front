import { useMutation } from "react-query"
import { TextApi } from "../../../entities/text/api"
import { TextPreview } from "../../../entities/text";
import { mapTextPreviewDto } from "../../../entities/text/model/mappers";

interface CreateTextProps {
  name: string,
  content: string,
}
const useAddText = (addTextPreview?: (textPreview: TextPreview) => void) => {
  return useMutation(
    (dto: CreateTextProps) => {
      return TextApi.create(dto.name, dto.content);
    },
    {
      onSuccess: (data) => {
        if (addTextPreview) {
          addTextPreview(mapTextPreviewDto(data));
        }
      }
    }
  )
}

interface ChangeNameProps {
  name: string,
  textId: number,
}
const useChangeName = (changeName?: (name: string) => void) => {
  return useMutation(
    (dto: ChangeNameProps) => {
      return TextApi.changeName(dto.name, dto.textId);
    },
    {
      onSuccess: (data) => {
        if (changeName) {
          changeName(data.name);
        }
      }
    }
  )
}

const useCopyText = (textId: number, copyText?: () => void) => {
  return useMutation(
    () => {
      return TextApi.copyText(textId);
    },
    {
      onSuccess: (data) => {
        if (copyText) {
          copyText();
        }
      }
    }
  )
}

const useUncopyText = (textId: number, uncopyText?: () => void) => {
  return useMutation(
    () => {
      return TextApi.uncopyText(textId);
    },
    {
      onSuccess: (data) => {
        if (uncopyText) {
          uncopyText();
        }
      }
    }
  )
}

const useDeleteText = (textId: number, deleteText?: () => void) => {
  return useMutation(
    () => {
      return TextApi.delete(textId);
    },
    {
      onSuccess: (data) => {
        if (deleteText) {
          deleteText();
        }
      }
    }
  )
}

export const TextFeaturesLib = {
  useAddText,
  useChangeName,
  useCopyText,
  useUncopyText,
  useDeleteText,
}