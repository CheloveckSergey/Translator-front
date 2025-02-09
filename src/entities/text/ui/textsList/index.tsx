import { ChangeEvent, FC, FormEvent, useState } from "react";
import { CreateTextDto, CreateTextResponse, TextList, TextPreview } from "../../model";
import './styles.scss';
import { CiSquarePlus } from "react-icons/ci";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import { SharedInputs } from "../../../../shared/sharedUi/inputs";
import { SharedIcons } from "../../../../shared/sharedUi/icons";
import { SceletonTextPreview } from "../textPreview";
import { useAppSelector } from "../../../../app/store";
import { useNavigate } from "react-router-dom";


interface TAProps {
  mutate: (
    dto: CreateTextDto,
  ) => Promise<CreateTextResponse>,
  isLoading: boolean,
  isError: boolean,
}
const TextAdder: FC<TAProps> = ({ mutate, isLoading, isError }) => {

  const { user } = useAppSelector(state => state.user);

  const [editing, setEditing] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const navigate = useNavigate();

  function closeEditing() {
    setName('');
    setContent('');
    setEditing(false);
  }

  function submit() {
    mutate({
      name,
      userId: user!.id,
    }).then((data) => {
      closeEditing();
      navigate('/texts/' + data.id)
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
            {/* <label htmlFor="content">Content</label>
            <textarea 
              name="content"
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              className="content light"
            /> */}
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

const LoadingSceleton: FC = () => {

  return (
    <div className="text-list-content">
      {[1,2,3].map((_, index) => <SceletonTextPreview key={index} />)}
    </div>
  )
}

interface TLUProps {
  textList: TextList,
  isLoading: boolean,
  isError: boolean,
  mapTexts: (text: TextPreview, index: number) => React.ReactNode | React.ReactNode[],
  actionObjects: {
    addText?: {
      mutate: (
        dto: CreateTextDto,
      ) => Promise<CreateTextResponse>,
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

  const [fetching, setFetching] = useState<boolean>(false);

  function fetch() {
    setFetching(true);
  }

  return (
    <div className={["text-list", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
        loadingSceleton={<LoadingSceleton />}
      >
        <div className="text-list-content">
          {actionObjects.addText && (
            <TextAdder 
              mutate={actionObjects.addText.mutate}
              isLoading={actionObjects.addText.isLoading}
              isError={actionObjects.addText.isError}
            />
          )}
          {textList.texts.map(mapTexts)}
        </div>
        <SharedButtons.LoadMoreButton
          // fetchNextPage={() => fetch()}
          // isFetchingNextPage={!!fetching}
          fetchNextPage={fetchNextPage as () => void}
          isFetchingNextPage={!!isFetchingNextPage}
          hasNextPage={!!hasNextPage}
          isError={isError}
        />
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}