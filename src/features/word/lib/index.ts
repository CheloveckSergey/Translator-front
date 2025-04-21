import { useMutation, useQueryClient } from "@tanstack/react-query"
import { WordApi } from "../../../entities/word/api"
import { UserWordInfo, UserWordInfoDto } from "../../../entities/word";

// const useAddToProcess = (value: string, key: string[]) => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: () => {
//       return WordApi.addToProcess(value)
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(
//         key, 
//         5
//         // (old: UserWordInfoDto[]) => {
//         //   return old.map(dto => {
//         //     if (dto.value === value) {
//         //       return {
//         //         ...dto,
//         //         status: 'process',
//         //       }
//         //     } else {
//         //       return dto
//         //     }
//         //   })
//         // }
//       );
//     },
//   })
// }

// const useDeleteToStudied = (value: string, key: string[]) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => {
//       return WordApi.deleteToStudied(value)
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(
//         key, 
//         (old: UserWordInfoDto[]) => {
//           return old.map(dto => {
//             if (dto.value === value) {
//               return {
//                 ...dto,
//                 status: 'studied'
//               }
//             } else {
//               return dto
//             }
//           })
//         }
//       );
//     },
//   })
// }
const useAddToProcess = (value: string, addToStudied?: () => void) => {
  return useMutation({
    mutationFn: () => {
      return WordApi.addToProcess(value)
    },
    onSuccess: () => {
      if (addToStudied) {
        addToStudied()
      }
    },
  })
}

const useDeleteToStudied = (value: string, deleteToStudied?: () => void) => {
  return useMutation({
    mutationFn: () => {
      return WordApi.deleteToStudied(value)
    },
    onSuccess: () => {
      if (deleteToStudied) {
        deleteToStudied()
      }
    },
  })
}

const useSuccessfullTry = () => {
  return useMutation({
    mutationFn: ({ value } : { value: string }) => {
      return WordApi.successfullTry(value)
    },
    
  })
}

const useUnsuccessfullTry = () => {
  return useMutation({
    mutationFn: ({ value } : { value: string }) => {
      return WordApi.unsuccessfullTry(value)
    },
  })
}

export const WordFeaturesLib = {
  useAddToProcess,
  useDeleteToStudied,
  useSuccessfullTry,
  useUnsuccessfullTry,
}