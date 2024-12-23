import { ChangeEvent, FC, FormEvent, useState } from "react";
import './styles.scss';
import { TextPreviewClass } from "../../model";
import { SharedIcons } from "../../../../shared/sharedUi/icons";
import { MdEdit } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { useAppSelector } from "../../../../app/store";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { useNavigate } from "react-router-dom";
import { SharedLib } from "../../../../shared/lib";
import { SharedInputs } from "../../../../shared/sharedUi/inputs";
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";

interface NEProps {
  textPreview: TextPreviewClass,
  changeName: {
    mutate: (
      { name, textId } : { name: string, textId: number }
    ) => Promise<any>,
    isLoading: boolean,
    isError: boolean,
  },
  close: () => void,
}
const NameEditor: FC<NEProps> = ({ textPreview, changeName, close }) => {

  const [name, setName] = useState<string>('');

  function submit(e: FormEvent) {
    e.preventDefault();
    changeName.mutate({ 
      name, 
      textId: textPreview.id 
    }).then(() => close());
  }

  return (
    <div className="name-editor">
      <form
        onSubmit={submit}
      >
        <input 
          type="text"
          name="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className="name light"
        />
        <SharedInputs.TextSubmit
          body="Submit"
          color="light"
        />
        <SharedButtons.TextButton
          body='Cancel'
          onClick={() => close()}
          className=""
          color="light"
        />
      </form>
      <SharedBlocks.BlackoutLoader
        isLoading={changeName.isLoading}
      />
    </div>
  )
}

interface TPUProps {
  textPreview: TextPreviewClass,
  actionObjects: {
    changeName?: {
      mutate: (
        { name, textId } : { name: string, textId: number }
      ) => Promise<any>,
      isLoading: boolean,
      isError: boolean,
    }
  },
  actions: React.ReactNode[],
  showAnotherAuthor?: boolean,
}
export const TextPreviewUi: FC<TPUProps> = ({ 
  textPreview, 
  actionObjects, 
  actions,
  showAnotherAuthor,
}) => {

  const [editName, setEditName] = useState<boolean>(false);

  const navigate = useNavigate();

  function closeNameEditing() {
    setEditName(false);
  }

  if (textPreview.isDeleted) {
    return (
      <div className="text-preview deleted">
        <p>You've deleted this text</p>
      </div>
    )
  }

  return (
    <div className="text-preview">
      <div className="text-preview-header">
        {(actionObjects.changeName && editName) ? (
          <NameEditor
            textPreview={textPreview}
            changeName={actionObjects.changeName}
            close={closeNameEditing}
          />
        ) : (
          <div className="basic">
            <div className="name-author">
              <h4 
                className="name"
                onClick={() => navigate('/texts/' + textPreview.id)}
              >
                {textPreview.name}
              </h4>
              {showAnotherAuthor && (
                <span className="author extra">
                  By {textPreview.author.login}
                </span>
              )}
            </div>
            <div className="buttons">
              {actionObjects.changeName && <SharedButtons.TextButton
                body={<MdEdit size={25} />}
                color="light"
                className="change-name"
                onClick={() => { 
                  setEditName(true); 
                }}
              />}
              {actions}
            </div>
          </div>
        )}
      </div>
      <div className="content">
        <p className="text">
          {textPreview.content}
        </p>
        <span className="date extra">
          {SharedLib.getComfortableDate(textPreview.createDate)}
        </span>
      </div>
    </div>
  )
}

export const SceletonTextPreview: FC = () => {

  return (
    <div className="sceleton-text-preview">
      <div className="header"></div>
      <div className="content"></div>
    </div>
  )
}