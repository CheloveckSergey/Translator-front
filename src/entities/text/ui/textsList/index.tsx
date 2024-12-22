import { ChangeEvent, FC, FormEvent, useState } from "react";
import { TextListClass, TextPreviewClass } from "../../model";
import './styles.scss';
import { CiSquarePlus } from "react-icons/ci";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import { SharedInputs } from "../../../../shared/sharedUi/inputs";
import { SharedIcons } from "../../../../shared/sharedUi/icons";
import { SceletonTextPreview } from "../textPreview";


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

  function submit() {
    mutate({
      name,
      content,
    }).then(() => {
      closeEditing();
    });
  }

  return (
    <div 
      className="text-adder"
    >
      {editing ? (
        <div className="editor">
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              submit();
            }}
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="name light"
            />
            <label htmlFor="content">Content</label>
            <textarea 
              name="content"
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              className="content light"
            />
            <div className="buttons">
              <SharedInputs.CustomSubmit
                body="Submit"
                color="green"
              />
              <SharedButtons.TextButton
                body="Cancel"
                onClick={() => closeEditing()}
                color="green"
              />
            </div>
          </form>
          {isLoading && (
            <div className="loader">
              <SharedIcons.Spinner size={50} />
            </div>
          )}
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
    addText?: {
      mutate: (
        { name, content } : { name: string, content: string }
      ) => Promise<any>,
      isLoading: boolean,
      isError: boolean,
    }
  },
  fetchNextPage?: () => void,
  hasNextPage?: boolean,
  isFetchingNextPage?: boolean,
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

  if (isLoading) {
    return (
      <div className={["text-list", className].join(' ')}>
        <div className="text-list-content">
          {[1,2,3].map((_, index) => <SceletonTextPreview key={index} />)}
        </div>
      </div>
    )
  }

  return (
    <div className={["text-list", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
      >
        <div className="text-list-content">
          {actionObjects.addText && (
            <TextAdder 
              mutate={actionObjects.addText.mutate}
              isLoading={actionObjects.addText.isLoading}
              isError={actionObjects.addText.isError}
            />
          )}
          {/* {[1,2,3].map((_, index) => <SceletonTextPreview key={index} />)} */}
          {textList.texts.map(mapTexts)}
        </div>
        {fetchNextPage && hasNextPage && (
          <div className="more-button-wrapper">
            <SharedButtons.GreenButton
              body='Load more'
              onClick={() => fetchNextPage()}
              isLoading={Boolean(isFetchingNextPage)}
              isError={isError}
              disabled={isFetchingNextPage}
              className="load-more"
            />
          </div>
        )}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}