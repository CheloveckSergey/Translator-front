import { useMutation } from "@tanstack/react-query"
import { WordApi } from "../../../entities/word/api"

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