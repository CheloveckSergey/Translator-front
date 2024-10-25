import { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { TextPreviewClass } from "../../model";
import { SharedIcons } from "../../../../shared/sharedUi/icons";
import { MdEdit } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { useAppSelector } from "../../../../app/store";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { useNavigate } from "react-router-dom";
import { SharedLib } from "../../../../shared/lib";

interface TPUProps {
  textPreview: TextPreviewClass,
  showAnotherAuthor?: boolean, 
  actionObjects: {
    changeName?: {
      mutate: (
        { name, textId } : { name: string, textId: number }
      ) => Promise<any>,
      isLoading: boolean,
      isError: boolean,
    }
  },
  actions?: React.ReactNode[],
}
export const TextPreviewUi: FC<TPUProps> = ({ textPreview, showAnotherAuthor = false, actionObjects, actions }) => {

  const { user } = useAppSelector(state => state.user);

  const [editName, setEditName] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const navigate = useNavigate();

  function closeNameEditing() {
    setName('');
    setEditName(false);
  }

  //Без этого почему-то ругается
  let changeName = actionObjects.changeName;

  if (textPreview.isDeleted) {
    return (
      <div className="text-preview deleted">
        <p>You've deleted this text</p>
      </div>
    )
  }

  return (
    <div className="text-preview">
      <div className="header">
        {(editName && changeName) ? (
          <div className="name-editor">
            <input 
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            {changeName && <SharedButtons.TextActionButton
              body={<IoSend size={25} />}
              onClick={() => {
                if (changeName) {
                  changeName.mutate({ 
                    name, 
                    textId: textPreview.id 
                  }).then(() => closeNameEditing())
                }
              }}
              isLoading={changeName.isLoading}
              isError={changeName.isError}
              color="light"
              className=""
            />}
            <SharedButtons.TextButton
              body='Cancel'
              onClick={() => closeNameEditing()}
              className=""
              color="light"
            />
          </div>
        ) : (
          <div className="basic">
            <div className="name-author">
              <h4 
                className="name"
                onClick={() => {
                  navigate('/texts/' + textPreview.id);
                  console.log('lol');
                }}
              >
                {textPreview.name}
              </h4>
              {showAnotherAuthor && (
                <p className="author extra">
                  By {textPreview.author.login}
                </p>
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
        <p className="date">
          {SharedLib.getComfortableDate(textPreview.createDate)}
        </p>
      </div>
    </div>
  )
}