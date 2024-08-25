import { ChangeEvent, FC, useState } from "react";
import { TextPreviewUi } from "../textPreview";
import { TextListClass, TextPreviewClass } from "../../model";
import './styles.scss';
import { FaRegPlusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";


interface TAProps {
  mutate: (
    { name, content } : { name: string, content: string }
  ) => Promise<any>,
  isLoading: boolean,
  isError: boolean,
}
const TextAdder: FC<TAProps> = ({ mutate, isLoading, isError }) => {

  const [editing, setEditing] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');

  function closeEditing() {
    setName('');
    setContent('');
    setEditing(false);
  }

  return (
    <div 
      className="text-adder"
    >
      {editing ? (
        <div className="editor">
          <p>Name</p>
          <input
            type="text"
            className="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <p>Content</p>
          <textarea 
            className="content"
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          />
          <div className="buttons">
            <SharedButtons.GreenButton 
              body='Submit'
              isLoading={isLoading}
              isError={isError}
              onClick={() => {
                mutate({
                  name,
                  content,
                }).then(() => {
                  closeEditing();
                });
              }}
              className="submit"
            />
            <SharedButtons.TextButton
              onClick={() => closeEditing()}
              color="green"
              body="Cancel"
              className=""
            />
          </div>
        </div>
      ) : (
        <button 
          className="editButton"
          onClick={() => setEditing(true)}
        >
          <CiSquarePlus size={70} />
        </button>
      )}
    </div>
  )
}

interface TLUProps {
  textList: TextListClass,
  isLoading: boolean,
  isError: boolean,
  mapTexts: (text: TextPreviewClass, index: number) => React.ReactNode | React.ReactNode[],
  actionObjects: {
    addText: {
      mutate: (
        { name, content } : { name: string, content: string }
      ) => Promise<any>,
      isLoading: boolean,
      isError: boolean,
    }
  },
}
export const TextListUi: FC<TLUProps> = ({ textList, isLoading, isError, actionObjects, mapTexts }) => {

  return (
    <div className="text-list">
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
      >
        <TextAdder 
          mutate={actionObjects.addText.mutate}
          isLoading={actionObjects.addText.isLoading}
          isError={actionObjects.addText.isError}
        />
        {textList.texts.map(mapTexts)}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}