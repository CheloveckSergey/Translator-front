import { useMutation } from "@tanstack/react-query";
import { UserApi } from "../../../entities/user"

const useUpdateAvatar = (updateAvatar?: (image: string) => void) => {
  return useMutation({
    mutationFn: ({ file } : { file: File }) => {
      return UserApi.updateAvatar(file)
    },
    onSuccess: (data) => {
      if (updateAvatar) {
        updateAvatar(data.image);
      }
    },
  })
}

export const UserFeaturesLib = {
  useUpdateAvatar,
}