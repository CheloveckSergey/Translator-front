import { ChangeEvent, FC, useState } from "react";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { UseModalWindow } from "../../../../widgets/modalWindow";
import { SharedLib } from "../../../../shared/lib";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import './styles.scss';
import { TextsNumberableOptional, User, WordsNumberableOptional } from "../../model";
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";
import { FeatureBlock } from "./types";

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
  user?: User & WordsNumberableOptional & TextsNumberableOptional,
  isLoading: boolean,
  isError: boolean,
  updateAvatarObject?: {
    mutate: (file: File) => Promise<any>,
    isLoading: boolean,
    isError: boolean,
  },
  featureBlocks: FeatureBlock[],
  // actions: React.ReactNode[],
  className?: string,
}
export const UserAvatar: FC<UAProps> = ({ user, isLoading, isError, updateAvatarObject, featureBlocks, className }) => {

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
            {featureBlocks.map((block, index) => (
              <>
                {block.description && <span>{block.description}</span>}
                {block.type === 'action' && (
                  <SharedButtons.SquareActionButton
                    body={block.body}
                    isLoading={block.isLoading}
                    isError={block.isError}
                    onClick={() => block.mutate()}
                    color="green"
                  />)
                }
              </>
            ))}
          </div>
          <div className="info">
            <SharedBlocks.InfoLine 
              left="Name"
              right={user.login}
            />
            {user.wordsNumber !== undefined && (
              <SharedBlocks.InfoLine
                left="Studied words"
                right={String(user.wordsNumber)}
              />
            )}
            {user.textsNumber !== undefined && (
              <SharedBlocks.InfoLine
                left="Loaded texts"
                right={String(user.textsNumber)}
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