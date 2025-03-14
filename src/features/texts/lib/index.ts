import { InfiniteData, useMutation, useQueryClient } from "react-query"
import { GTextPreviewsQuery, TextApi, TextPreviewsQuery } from "../../../entities/text/api"
import { CreateTextDto, SaveBlocksDto, TextList, TextPreview, TextPreviewDto, textsKeys } from "../../../entities/text";
import { mapTextPreviewDto } from "../../../entities/text/model/mappers";

const useAddText = (query: GTextPreviewsQuery) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateTextDto) => {
      return TextApi.create(dto);
    },
    onSuccess(data) {
      queryClient.setQueryData(textsKeys.texts.slug(query), (old: InfiniteData<TextPreview[]> | undefined) => {
        if (!old) {
          return {
            pages: [],
            pageParams: 0,
          } as unknown as InfiniteData<TextPreview[]>
        }

        const newText = mapTextPreviewDto(data);
        
        return {
          ...old,
          pages: old.pages.map((page, index) => {
            if (index === 0) {
              return [newText, ...page]
            } else {
              return page
            }
          })
        } as InfiniteData<TextPreview[]>
      });
    },
  });
}

//Отредачить страницу текстов и сами тексты. Ошибка при добавлении нового текста.

interface ChangeNameProps {
  name: string,
}
const useChangeName = (textId: number, query: GTextPreviewsQuery) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: ChangeNameProps) => {
      return TextApi.changeName(dto.name, textId);
    },
    onSuccess(_, variables) {
      queryClient.setQueryData(textsKeys.texts.slug(query), (old: InfiniteData<TextPreview[]> | undefined) => {
        if (!old) {
          return {
            pages: [],
            pageParams: 0,
          } as unknown as InfiniteData<TextPreview[]>
        }
        
        return {
          ...old,
          pages: old.pages.map((page) => {
            return page.filter(text => {
              if (text.id === textId) {
                text.changeName(variables.name);
                return text
              } else {
                return text
              }
            });
          })
        } as InfiniteData<TextPreview[]>
      }) 
    },
  });
}

const useCopyText = (textId: number, query: GTextPreviewsQuery) => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return TextApi.copyText(textId);
    },
    {
      onSuccess: (data) => {
        
      }
    }
  )
}

const useUncopyText = (textId: number, query: GTextPreviewsQuery) => {
  return useMutation(
    () => {
      return TextApi.uncopyText(textId);
    },
    {
      onSuccess: (data) => {
        
      }
    }
  )
}

const useDeleteText = (textId: number, query: GTextPreviewsQuery) => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return TextApi.delete(textId);
    },
    {
      onSuccess: () => {
        queryClient.setQueryData(textsKeys.texts.slug(query), (old: InfiniteData<TextPreview[]> | undefined) => {
          if (!old) {
            return {
              pages: [],
              pageParams: 0,
            } as unknown as InfiniteData<TextPreview[]>
          }
          
          return {
            ...old,
            pages: old.pages.map((page) => {
              return page.filter(text => {
                if (text.id === textId) {
                  text.setIsDeleted(true);
                  return text
                } else {
                  return text
                }
              });
            })
          } as InfiniteData<TextPreview[]>
        });
      }
    }
  )
}

const useSaveBlocks = () => {
  return useMutation(
    (dto: SaveBlocksDto) => {
      return TextApi.saveBlocks(dto);
    },
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