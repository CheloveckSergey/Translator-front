import { useMutation } from "react-query"
import { UserApi } from "../../../entities/user"

const useUpdateAvatar = (updateAvatar?: (image: string) => void) => {
  return useMutation(({ file } : { file: File }) => {
    return UserApi.updateAvatar(file)
  }, {
    onSuccess: (data) => {
      if (updateAvatar) {
        updateAvatar(data.image);
      }
    }
  })
}

export const UserFeaturesLib = {
  useUpdateAvatar,
}