import { ChangeEvent, FC, useState } from "react";
import { TextsLib } from "../../../entities/text";
import { SharedButtons } from "../../../shared/sharedUi/buttons";
import { SharedUiHelpers } from "../../../shared/sharedUi/helpers";
import { WordFeaturesUi } from "../../../features/word/ui";
import './styles.scss';

export const Boxes: FC = () => {

  const [input, setInput] = useState<string>('');

  const { translation, isLoading, isError, refetch, updateState } = TextsLib.useTranslation();

  const translationValue = (translation?.type === 'word') ? translation.word.translation : translation?.translation;

  function addToProcess() {
    if (translation?.type === 'word') {
      translation.word.addToProcess();
      updateState();
    }
  }

  function deleteToStudied() {
    if (translation?.type === 'word') {
      translation.word.deleteToStudied();
      updateState();
    }
  }

  return (
    <div className="boxes">
      <div className="left">
        <textarea 
          className="input-text"
          value={input}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
        />
        <SharedButtons.SquareActionButton
          body='Translate'
          isLoading={isLoading}
          isError={isError}
          onClick={() => {
            if (input) {
              refetch({ value: input })
            }
          }}
          className="translate"
          color="green"
        />
      </div>
      <div className="right">
        <div className="outlet-text">
          <SharedUiHelpers.ErrorLoader
            isLoading={isLoading}
            isError={isError}
            className="outlet-empty"
            iconSize={50}
          >
            {translation ? (
              translationValue
            ) : (
              <p>No translation</p>
            )}
          </SharedUiHelpers.ErrorLoader>
        </div>
        {translation?.type === 'word' && !(isLoading || isError) && (
          <div className="right-extra">
            <div className="word-status">
              <h5>Status: {translation.word.status}</h5>
              <div className="actions">
                {(translation.word.status === 'never') || (translation.word.status === 'studied') ? (
                  <WordFeaturesUi.AddToProcessButton
                    value={translation.word.value}
                    addToProcess={addToProcess}
                    size={40}
                  />
                ) : (
                  <WordFeaturesUi.DeleteToStudiedButton
                    value={translation.word.value}
                    deleteToStudied={deleteToStudied}
                    size={40}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}