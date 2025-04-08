import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
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
import { TextUiTypes } from "../uiTypes";

interface CreateTextObject {
  mutate: (
    dto: CreateTextDto,
  ) => Promise<CreateTextResponse>,
  isLoading: boolean,
  isError: boolean,
}

interface TEProps {
  createTextObject: CreateTextObject,
  setEditing: (editing: boolean) => void,
}
const TextEditor: FC<TEProps> = ({ createTextObject, setEditing }) => {

  const { user } = useAppSelector(state => state.user);

  const [name, setName] = useState<string>('');

  function closeEditing() {
    setName('');
    setEditing(false);
  }
  
  function submit() {
    if (!user) {
      return
    }

    createTextObject.mutate({
      name,
      userId: user.id,
    }).then((data) => {
      closeEditing();
      // navigate('/texts/' + data.id)
    });
  }

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(1);
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div className="editor">
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          submit();
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          ref={ref}
          type="text"
          name="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          autoComplete="cc-number"
          className="name light"
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
      {createTextObject.isLoading && (
        <div className="loader">
          <SharedIcons.Spinner size={50} />
        </div>
      )}
    </div>
  )
}


interface TAProps {
  createTextObject: CreateTextObject,
}
const TextAdder: FC<TAProps> = ({ createTextObject }) => {

  const [editing, setEditing] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div 
      className="text-adder"
    >
      {editing ? (
        <TextEditor 
          createTextObject={createTextObject}
          setEditing={setEditing}
        />
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
  texts: TextPreview[],
  isLoading: boolean,
  isError: boolean,
  mapTexts: (text: TextPreview, index: number) => React.ReactNode | React.ReactNode[],
  actionObjects: TextUiTypes.TLActionObjects,
  fetchNextPage?: () => void,
  hasNextPage?: boolean,
  isFetchingNextPage?: boolean,
  className?: string,
}
export const TextListUi2: FC<TLUProps> = ({ 
  texts, 
  isLoading, 
  isError, 
  fetchNextPage, 
  hasNextPage, 
  isFetchingNextPage, 
  actionObjects, 
  mapTexts,
  className,
}) => {

  const { user } = useAppSelector(state => state.user);

  return (
    <div className={["text-list", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
        loadingSceleton={<LoadingSceleton />}
      >
        <div className="text-list-content">
          {user && actionObjects.addText && (
            <TextAdder 
              createTextObject={actionObjects.addText}
            />
          )}
          {texts.map(mapTexts)}
        </div>
        <SharedButtons.LoadMoreButton
          fetchNextPage={fetchNextPage as () => void}
          isFetchingNextPage={!!isFetchingNextPage}
          hasNextPage={!!hasNextPage}
          isError={isError}
        />
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}