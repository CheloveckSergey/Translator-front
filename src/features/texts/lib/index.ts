import { useMutation } from "react-query"
import { TextApi } from "../../../entities/text/api"
import { TextPreviewClass } from "../../../entities/text";

interface CreateTextProps {
  name: string,
  content: string,
}
const useAddText = (addTextPreview?: (textPreview: TextPreviewClass) => void) => {
  return useMutation(
    (dto: CreateTextProps) => {
      return TextApi.create(dto.name, dto.content);
    },
    {
      onSuccess: (data) => {
        if (addTextPreview) {
          addTextPreview(new TextPreviewClass(data.id, data.name, data.content));
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

export const TextFeaturesLib = {
  useAddText,
  useChangeName,
}