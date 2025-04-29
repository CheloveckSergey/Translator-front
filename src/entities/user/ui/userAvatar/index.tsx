import { ChangeEvent, FC, useState } from "react";
import { ButtonColor, SharedButtons } from "../../../../shared/sharedUi/buttons";
import { UseModalWindow } from "../../../../widgets/modalWindow";
import { SharedLib } from "../../../../shared/lib";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import './styles.scss';
import { AvatarUser, User } from "../../model";
import { useAppSelector } from "../../../../app/store";
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";

interface UAWProps {
  updateAvatarObject?: {
    mutate: (file: File) => Promise<any>,
    isLoading: boolean,
    isError: boolean,
  },
  close: () => void,
}
const UpdateAvatarWindow: FC<UAWProps> = ({ updateAvatarObject, close }) => {

  const [image, setImage] = useState<File>();
  
  return (
    <div className="update-avatar-window">
      {image ? (
        <img 
          src={SharedLib.getImageUrlFromFile(image)}
          alt="IMG"
          className="image"
        />
      ) : (
        <p>Загрузите изображение</p>
      )}
      <label>
        <input
          type="file"
          name='img'
          style={{ display: 'none' }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) {
              return;
            }
            setImage(e.target.files[0]);
          }}
        />
        <span className="load-span" >Load</span>
      </label>
      {updateAvatarObject && image && <SharedButtons.SquareActionButton 
        body='Update'
        onClick={() => {
          if (!image) {
            return;
          }
          updateAvatarObject.mutate(image).then(() => close());
        }}
        isLoading={updateAvatarObject.isLoading}
        isError={updateAvatarObject.isError}
        color="green"
        className="submit-avatar-button"
      />}
    </div>
  )
}

const AvatarSceleton: FC = () => {

  return (
    <div className="avatar-sceleton">
      <div className="image-sceleton"></div>
      <div className="line-sceleton"></div>
    </div>
  )
}

interface UAProps {
  user?: AvatarUser,
  isLoading: boolean,
  isError: boolean,
  updateAvatarObject?: {
    mutate: (file: File) => Promise<any>,
    isLoading: boolean,
    isError: boolean,
  },
  actions: React.ReactNode[],
  className?: string,
}
export const UserAvatar: FC<UAProps> = ({ user, isLoading, isError, updateAvatarObject, actions, className }) => {

  const [showUAWindow, setShowUAWindow] = useState<boolean>(false);

  return (
    <div className={["user-avatar", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
        loadingSceleton={<AvatarSceleton />}
      >
        {user && <>
          <div className="avatar">
            <img 
              src={user.avatar} 
              alt="IMG" 
            />
            {updateAvatarObject && (
              <SharedButtons.SquareButton 
                body={'Change avatar'}
                onClick={() => setShowUAWindow(true)}
                color='green'
                className="change-avatar-button"
              />
            )}
            {actions}
          </div>
          <div className="info">
            <SharedBlocks.InfoLine 
              left="Name"
              right={user.login}
            />
            {user.wordsNumber && (
              <SharedBlocks.InfoLine
                left="Studied words"
                right={String(user.wordsNumber)}
              />
            )}
          </div>
        </>}
      </SharedUiHelpers.ErrorLoader>
      <UseModalWindow 
        onClose={() => setShowUAWindow(false)}
        condition={showUAWindow}
      >
        <UpdateAvatarWindow
          updateAvatarObject={updateAvatarObject}
          close={() => setShowUAWindow(false)}
        />
      </UseModalWindow>
    </div>
  )
}