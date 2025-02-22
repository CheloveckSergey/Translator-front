import { InfiniteData, useMutation, useQueryClient } from "react-query"
import { TextApi, TextPreviewsQuery } from "../../../entities/text/api"
import { CreateTextDto, SaveBlocksDto, TextList, TextPreview, TextPreviewDto, textsKeys } from "../../../entities/text";
import { mapTextPreviewDto } from "../../../entities/text/model/mappers";
import { queryClient } from "../../../shared/lib";

const useAddText = (query: TextPreviewsQuery, addText?: (text: TextPreview) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (dto: CreateTextDto) => {
        return TextApi.create(dto);
      },
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: textsKeys.texts.slug(query) });
      },
      onSuccess(data) {
        const queries = queryClient.getQueryCache().findAll();
        console.log(queries);
        const key = textsKeys.texts.root;
        console.log(key);
        // queryClient.invalidateQueries(key);
        queryClient.setQueryData(textsKeys.texts.slug(query), (old: InfiniteData<TextPreviewDto[]> | undefined) => {
          console.log('setQueryData');
          // console.log(old);
          if (!old) {
            return {
              pages: [],
              pageParams: 0,
            } as unknown as InfiniteData<TextPreviewDto[]>
          }
          
          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                return [data, ...page]
              } else {
                return page
              }
            })
          } as InfiniteData<TextPreviewDto[]>
        }) 

        if (addText) {
          addText(mapTextPreviewDto(data));
        }
      },
    });
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