import { ChangeEvent, FC, FormEvent, useState } from "react";
import './styles.scss';
import { ChangeUserSettingReqDto, PrivacySettings } from "../../../../entities/settings";
import { SharedLib } from "../../../../shared/lib";
import { SharedInputs } from "../../../../shared/sharedUi/inputs";
import { UserSettingsFeatures } from "../../../../features/userSettings/lib";
import { useAppSelector } from "../../../../app/store";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";

interface LSProps {
  name: string,
  formName: string,
  newPrivacy: PrivacySettings,
  setNewPrivacy: (settings: PrivacySettings) => void,
}
const LineSelect: FC<LSProps> = ({ name, formName, newPrivacy, setNewPrivacy }) => {

  return (
    <div className="line-select">
      <label htmlFor={formName} >{name}</label>
      <div className="submit-select">
        <select 
          name={formName}
          value={newPrivacy}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewPrivacy(e.target.value as PrivacySettings)}
        >
          {Object.values(PrivacySettings).map((value, index) => (
            <option 
              value={value} 
              key={index}
            >
              {SharedLib.capitalizeFirstLetter(value)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

const PrivacySceleton: FC = () => {

  return (
    <div className="privacy-sceleton">

    </div>
  )
}

interface PProps {
  textsPrivacy: PrivacySettings,
  wordsPrivacy: PrivacySettings,
  pagePrivacy: PrivacySettings,
  changeTextsPrivacy: (privacy: PrivacySettings) => void,
  changeWordsPrivacy: (privacy: PrivacySettings) => void,
  changePagePrivacy: (privacy: PrivacySettings) => void,
  isLoading: boolean,
  isError: boolean,
}
export const Privacy: FC<PProps> = ({ 
  textsPrivacy, 
  wordsPrivacy, 
  pagePrivacy,
  changeTextsPrivacy,
  changeWordsPrivacy,
  changePagePrivacy,
  isLoading,
  isError,
}) => {

  const { user } = useAppSelector(state => state.user);

  const [newTextsPrivacy, setNewTextsPrivacy] = useState<PrivacySettings>(textsPrivacy);
  const [newWordsPrivacy, setNewWordsPrivacy] = useState<PrivacySettings>(wordsPrivacy);
  const [newPagePrivacy, setNewPagePrivacy] = useState<PrivacySettings>(pagePrivacy);

  const [prevTextsPrivacy, setPrevTextsPrivacy] = useState<PrivacySettings>(textsPrivacy);
  const [prevWordsPrivacy, setPrevWordsPrivacy] = useState<PrivacySettings>(wordsPrivacy);
  const [prevPagePrivacy, setPrevPagePrivacy] = useState<PrivacySettings>(pagePrivacy);

  if (prevTextsPrivacy !== textsPrivacy) {
    setNewTextsPrivacy(textsPrivacy);
    setPrevTextsPrivacy(textsPrivacy);
  }
  if (prevWordsPrivacy !== wordsPrivacy) {
    setNewWordsPrivacy(wordsPrivacy);
    setPrevWordsPrivacy(wordsPrivacy);
  }
  if (prevPagePrivacy !== pagePrivacy) {
    setNewPagePrivacy(pagePrivacy);
    setPrevPagePrivacy(pagePrivacy);
  }

  const mutateObject = UserSettingsFeatures.useChangeSettings(
    changeTextsPrivacy,
    changeWordsPrivacy,
    changePagePrivacy,
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const props: ChangeUserSettingReqDto = {
      userId: user!.id,
    }
    if (textsPrivacy !== newTextsPrivacy) {
      props.textsPrivacy = newTextsPrivacy;
    }
    if (wordsPrivacy !== newWordsPrivacy) {
      props.wordsPrivacy = newWordsPrivacy;
    }
    if (pagePrivacy !== newPagePrivacy) {
      props.pagePrivacy = newPagePrivacy;
    }

    mutateObject.mutateAsync(props);
  }

  const isChange: boolean = textsPrivacy !== newTextsPrivacy
  || wordsPrivacy !== newWordsPrivacy
  || pagePrivacy !== newPagePrivacy;

  return (
    <SharedUiHelpers.ErrorLoader
      isLoading={isLoading}
      isError={isError}
      loadingSceleton={<PrivacySceleton />}
    >
      <div className="privacy">
        <h2>Privacy</h2>
        <form
          onSubmit={onSubmit}
        >
          <LineSelect 
            name="Просмотр текстов" 
            formName="text-privacy"
            newPrivacy={newTextsPrivacy}
            setNewPrivacy={setNewTextsPrivacy}
          />
          <LineSelect 
            name="Просмотр слов" 
            formName="words-privacy"
            newPrivacy={newWordsPrivacy}
            setNewPrivacy={setNewWordsPrivacy} 
          />
          <LineSelect 
            name="Просмотр домашней страницы" 
            formName="page-privacy"
            newPrivacy={newPagePrivacy}
            setNewPrivacy={setNewPagePrivacy}
          />
          {isChange && (
            <div className="submit-container">
              <SharedInputs.CustomSubmit 
                body="Submit"
                color="green"
              />
            </div>
          )}
        </form>
        <SharedBlocks.BlackoutLoader
          isLoading={mutateObject.isLoading}
          iconSize={50}
        />
      </div>
    </SharedUiHelpers.ErrorLoader>
  )
}