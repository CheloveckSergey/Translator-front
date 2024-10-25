import { ChangeEvent, FC, useState } from "react";
import { TextPreviewUi } from "../textPreview";
import { TextListClass, TextPreviewClass } from "../../model";
import './styles.scss';
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
  fetchNextPage?: () => void,
  hasNextPage?: boolean | undefined,
  isFetchingNextPage?: boolean,
  mapTexts: (text: TextPreviewClass, index: number) => React.ReactNode | React.ReactNode[],
  actionObjects: {
    addText?: {
      mutate: (
        { name, content } : { name: string, content: string }
      ) => Promise<any>,
      isLoading: boolean,
      isError: boolean,
    }
  },
  className?: string,
}
export const TextListUi: FC<TLUProps> = ({ 
  textList, 
  isLoading, 
  isError, 
  fetchNextPage, 
  hasNextPage, 
  isFetchingNextPage, 
  actionObjects, 
  mapTexts,
  className,
}) => {

  return (
    <div className={["text-list", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
      >
        <div className="text-list-content">
          {actionObjects.addText && <TextAdder 
            mutate={actionObjects.addText.mutate}
            isLoading={actionObjects.addText.isLoading}
            isError={actionObjects.addText.isError}
          />}
          {textList.texts.map(mapTexts)}
        </div>
        {fetchNextPage && hasNextPage &&  <div className="more-button-wrapper">
          <SharedButtons.GreenButton
            body='Load more'
            isLoading={Boolean(isFetchingNextPage)}
            isError={false}
            className="load-more"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage && isFetchingNextPage}
          />
        </div>}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}