import { InfiniteData, useMutation, useQueryClient } from "react-query"
import { GTextPreviewsQuery, TextApi, TextPreviewsQuery, TextQuery } from "../../../entities/text/api"
import { CreateTextDto, EditingTextSpanDto, SaveBlocksDto, TextList, TextMetaDto, TextPreview, TextPreviewDto, TextSpanDto, textsKeys } from "../../../entities/text";
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

const useSaveBlocks = (updateText: (dto: EditingTextSpanDto) => void) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (dto: SaveBlocksDto) => {
      return TextApi.saveBlocks(dto);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        textsKeys.text.slug({ ...variables.query, textId: variables.textId }), 
        (old: TextSpanDto | undefined) => {
          if (!data.premiere) {
            updateText(data);
          }
          return data
        }
      );
    }
  })
}

const useFastDeleteBlock = (deleteBlock: () => void) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ blockId } : { blockId: number }) => {
      return TextApi.fastDeleteBlock(blockId);
    },
    onSuccess: (data, variables) => {
      // queryClient.setQueryData(
      //   textsKeys.text.slug(query), 
      //   (old: EditingTextSpanDto | undefined) => {
      //     if (!old) {
      //       return {
      //         id: 0,
      //         premiere: false,
      //         blocks: [],
      //         pagesTotal: 0
      //       }
      //     }

      //     const newDto: TextSpanDto = {
      //       ...old,
      //       blocks: old.blocks.filter(block => block.id !== variables.blockId)
      //     }
      //     return newDto
      //   }
      // );
      deleteBlock()
    }
  })
}

const useSetPremiere = (textId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ premiere } : { premiere: boolean }) => {
      return TextApi.setPremiere(premiere, textId)
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        textsKeys.textMeta.slug(textId), 
        (old: TextMetaDto | undefined) => {
          if (!old) {
            return {
              id: 0,
              name: '',
              premiere: false,
              author: {
                id: 0,
                login: '',
              },
              createDate: '',
              updateDate: '',
            }
          }

          const newDto: TextMetaDto = {
            ...old,
            premiere: variables.premiere,
          }
          return newDto
        }
      );
    }
  })
}

export const TextFeaturesLib = {
  useAddText,
  useSaveBlocks,
  useChangeName,
  useCopyText,
  useUncopyText,
  useFastDeleteBlock,
  useDeleteText,
  useSetPremiere,
}