import { useMutation } from "react-query"
import { TextApi } from "../../../entities/text/api"
import { CreateTextDto, SaveBlocksDto, TextPreview } from "../../../entities/text";
import { mapTextPreviewDto } from "../../../entities/text/model/mappers";

const useAddText = () => {
  return useMutation(
    (dto: CreateTextDto) => {
      return TextApi.create(dto);
    },
  )
}

const useSaveBlocks = () => {
  return useMutation(
    (dto: SaveBlocksDto) => {
      return TextApi.saveBlocks(dto);
    },
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
  useSaveBlocks,
  useChangeName,
  useCopyText,
  useUncopyText,
  useDeleteText,
}