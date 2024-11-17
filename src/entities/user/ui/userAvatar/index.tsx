import { ChangeEvent, FC, useState } from "react";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { UseModalWindow } from "../../../../widgets/modalWindow";
import { SharedLib } from "../../../../shared/lib";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import './styles.scss';

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
      {updateAvatarObject && image && <SharedButtons.GreenButton 
        body='Update'
        onClick={() => {
          if (!image) {
            return;
          }
          updateAvatarObject.mutate(image).then(() => close());
        }}
        isLoading={updateAvatarObject.isLoading}
        isError={updateAvatarObject.isError}
        className="submit-avatar-button"
      />}
    </div>
  )
}

interface UAProps {
  avatar?: string,
  isLoading: boolean,
  isError: boolean,
  updateAvatarObject?: {
    mutate: (file: File) => Promise<any>,
    isLoading: boolean,
    isError: boolean,
  }
}
export const UserAvatar: FC<UAProps> = ({ avatar, isLoading, isError, updateAvatarObject }) => {

  const [showUAWindow, setShowUAWindow] = useState<boolean>(false);

  return (
    <div className="user-avatar">
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
      >
        {avatar && <>
          <img src={avatar} alt="IMG" />
          <SharedButtons.GreenButton 
            body={'Change'}
            isLoading={false}
            isError={false}
            onClick={() => setShowUAWindow(true)}
            className="change-avatar-button"
          />
          <UseModalWindow 
            onClose={() => setShowUAWindow(false)}
            condition={showUAWindow}
          >
            <UpdateAvatarWindow
              updateAvatarObject={updateAvatarObject}
              close={() => setShowUAWindow(false)}
            />
          </UseModalWindow>
        </>}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}