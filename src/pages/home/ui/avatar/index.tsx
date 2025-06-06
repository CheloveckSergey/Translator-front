import { FC } from "react";
import { AvatarUser, User } from "../../../../entities/user";
import { UserUi } from "../../../../entities/user/ui";
import { UserFeaturesLib } from "../../../../features/user";

interface AWProps {
  user: AvatarUser | undefined,
  isLoading: boolean,
  isError: boolean,
  updateState: () => void,
}
export const AvatarWidget: FC<AWProps> = ({ user, isLoading, isError, updateState }) => {

  const { mutateAsync, isPending: updateLoading, isError: updateError } = UserFeaturesLib.useUpdateAvatar(updateAvatar);

  function updateAvatar(image: string) {
    user?.setAvatar(image);
    updateState();
  }

  async function mutate(image: File,) {
    return mutateAsync({ file: image });
  }

  return (
    <UserUi.UserAvatar
      user={user}
      isLoading={isLoading}
      isError={isError}
      updateAvatarObject={{
        mutate,
        isLoading: updateLoading,
        isError: updateError,
      }}
      actions={[]}
    />
  )
}