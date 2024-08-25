import { FC, useEffect, useState } from "react";
import { Connection, StringSpan } from "../../model";
import { WordSpanClass } from "../../model/wordSpan";
import './styles.scss';
import { UseModalWindow } from "../../../../widgets/modalWindow";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";

interface WWProps {
  wordSpan: WordSpanClass,
  loadTranslationObject: {
    // data: string | undefined,
    isLoading: boolean,
    isError: boolean,
    load: () => void,
  },
  actions: React.ReactNode[],
}
const WordWindow: FC<WWProps> = ({ wordSpan, loadTranslationObject, actions }) => {

  useEffect(() => {
    if (wordSpan.translation) {
      return
    }

    loadTranslationObject.load();
  }, []);

  return (
    <div className="word-window">
      <SharedUiHelpers.ErrorLoader
        isLoading={loadTranslationObject.isLoading}
        isError={loadTranslationObject.isError || !wordSpan.translation}
        className="word-window-loader"
        iconSize={50}
      >
        <div className="word-window-desc">
          <p className="value">{wordSpan.value}</p>
          <p className="translation">
            {wordSpan.translation}
          </p>
        </div>
        <div className="word-window-buttons">
          {actions}
        </div>
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}

interface WSProps {
  wordSpan: WordSpanClass,
  loadTranslationObject: {
    // data: string | undefined,
    isLoading: boolean,
    isError: boolean,
    load: () => void,
  },
  actions: React.ReactNode[],
}
export const WordSpanUi: FC<WSProps> = ({ wordSpan, loadTranslationObject, actions }) => {

  const [window, setWindow] = useState<boolean>(false);

  return (
    <>
      <span 
        className={["word-span", wordSpan.status].join(' ')}
        onClick={() => setWindow(true)}
      >
        {wordSpan.value}
      </span>
      <UseModalWindow 
        onClose={() => setWindow(false)}
        condition={window}
      >
        <WordWindow 
          wordSpan={wordSpan}
          loadTranslationObject={loadTranslationObject}
          actions={actions}
        />
      </UseModalWindow>
    </>
  )
}

interface CSProps {
  connection: Connection,
}
export const ConnectionSpanUi: FC<CSProps> = ({ connection }) => {

  return (
    <span 
      className="connection-span"
    >
      {connection.value}
    </span>
  )
}

interface SSProps {
  stringSpan: StringSpan
  loadTranslationObject: {
    // data: string | undefined,
    isLoading: boolean,
    isError: boolean,
    load: () => void,
  },
  actions: React.ReactNode[],
}
export const StringSpanUi: FC<SSProps> = ({ stringSpan, loadTranslationObject, actions }) => {

  if (stringSpan instanceof WordSpanClass) {
    return (
      <WordSpanUi
        wordSpan={stringSpan}
        loadTranslationObject={loadTranslationObject}
        actions={actions}
      />
    )
  }

  return (
    <span 
      className="connection-span"
    >
      {stringSpan.value}
    </span>
  )
}