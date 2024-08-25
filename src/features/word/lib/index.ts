import { useMutation } from "react-query"
import { WordApi } from "../../../entities/word/api"

const useAddToProcess = (value: string, addToStudied?: () => void) => {
  return useMutation(
    () => {
      return WordApi.addToProcess(value)
    },
    {
      onSuccess: () => {
        if (addToStudied) {
          addToStudied()
        }
      }
    }
  )
}

const useDeleteToStudied = (value: string, deleteToStudied?: () => void) => {
  return useMutation(
    () => {
      return WordApi.deleteToStudied(value)
    },
    {
      onSuccess: () => {
        if (deleteToStudied) {
          deleteToStudied()
        }
      }
    }
  )
}

const useSuccessfullTry = () => {
  return useMutation(
    ({ value } : { value: string }) => {
      return WordApi.successfullTry(value)
    },
    {
      // onSuccess: () => {
      //   if (deleteToStudied) {
      //     deleteToStudied()
      //   }
      // }
    }
  )
}

const useUnsuccessfullTry = () => {
  return useMutation(
    ({ value } : { value: string }) => {
      return WordApi.unsuccessfullTry(value)
    },
    {
      // onSuccess: () => {
      //   if (deleteToStudied) {
      //     deleteToStudied()
      //   }
      // }
    }
  )
}

export const WordFeaturesLib = {
  useAddToProcess,
  useDeleteToStudied,
  useSuccessfullTry,
  useUnsuccessfullTry,
}