import { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { TextPreviewClass } from "../../model";
import { SharedIcons } from "../../../../shared/sharedUi/icons";
import { MdEdit } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { useAppSelector } from "../../../../app/store";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { useNavigate } from "react-router-dom";

interface TPUProps {
  textPreview: TextPreviewClass,
  actionObjects: {
    changeName: {
      mutate: (
        { name, textId } : { name: string, textId: number }
      ) => Promise<any>,
      isLoading: boolean,
      isError: boolean,
    }
  }
}
export const TextPreviewUi: FC<TPUProps> = ({ textPreview, actionObjects }) => {

  const [editName, setEditName] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const navigate = useNavigate();

  function closeNameEditing() {
    setName('');
    setEditName(false);
  }

  return (
    <div className="text-preview">
      <div className="header">
        {!editName ? (
          <div className="basic">
            <h3 
              className="name"
              onClick={() => {
                navigate('/texts/' + textPreview.id);
                console.log('lol');
              }}
            >
              {textPreview.name}
            </h3>
            <div className="buttons">
              <SharedButtons.TextButton
                body={<MdEdit size={25} />}
                color="light"
                className="change-name"
                onClick={() => { 
                  setEditName(true); 
                }}
              />
            </div>
          </div>
        ) : (
          <div className="name-editor">
            <input 
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <SharedButtons.TextActionButton
              body={<IoSend size={25} />}
              onClick={() => actionObjects.changeName.mutate({ 
                name, 
                textId: textPreview.id 
              }).then(() => closeNameEditing())}
              isLoading={actionObjects.changeName.isLoading}
              isError={actionObjects.changeName.isError}
              color="light"
              className=""
            />
            <SharedButtons.TextButton
              body='Cancel'
              onClick={() => closeNameEditing()}
              className=""
              color="light"
            />
          </div>
        )}
      </div>
      <div className="content">
        <p>
          {textPreview.content}
        </p>
      </div>
    </div>
  )
}