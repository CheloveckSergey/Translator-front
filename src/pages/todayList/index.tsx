import { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { WordLib } from "../../entities/word/lib";
import { TranslationWordDto } from "../../entities/word";
import { SharedUiHelpers } from "../../shared/sharedUi/helpers";
import { TodayList } from "../../entities/word/model/todayList";
import { SharedButtons } from "../../shared/sharedUi/buttons";
import { WordFeaturesLib } from "../../features/word/lib";

type IsSuccess = 'right' | 'wrong' | 'none';

interface TLWProps {
  todayList: TodayList,
  isLoading: boolean,
  isError: boolean,
  updateState: () => void,
}
const TodayListWidget: FC<TLWProps> = ({ todayList, isLoading, isError, updateState }) => {

  const [input, setInput] = useState<string>('');
  const [allowNext, setAllowNext] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<IsSuccess>('none');

  const successMutation = WordFeaturesLib.useSuccessfullTry();
  const unsuccessMutation = WordFeaturesLib.useUnsuccessfullTry();

  function tryTranslation() {
    console.log(input);
    console.log(todayList.curWord.translation);
    if (input === todayList.curWord.translation) {
      successMutation.mutateAsync({ value: todayList.curWord.value })
      .then(() => {
        setAllowNext(true);
        setIsSuccess('right')
      });
    } else {
      unsuccessMutation.mutateAsync({ value: todayList.curWord.value })
      .then(() => {
        setAllowNext(true);
        setIsSuccess('wrong');
      });
    }
  }

  function next() {
    setInput('');
    setAllowNext(false);
    setIsSuccess('none');
    todayList.next();
    updateState();
  }

  return (
    <div className="today-list-window">
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
        className="today-list-window-error-loader"
        iconSize={50}
      >
        {!todayList.words.length ? (
          <div className="no-words">
            <p>Нет слов на сегодня</p>
          </div>
        ) : (
          <>
            <p className="value">{todayList.curWord.value}</p>
            <p className="desc">Enter translation:</p>
            <input 
              type="text"
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            />
            <SharedButtons.GreenButton 
              body='Try'
              isLoading={successMutation.isLoading || unsuccessMutation.isLoading}
              isError={successMutation.isError || unsuccessMutation.isError}
              onClick={tryTranslation}
              className="try"
            />
            {(isSuccess === 'right') && <p className="right-wrong">Right</p>}
            {(isSuccess === 'wrong') && <p className="right-wrong">Wrong</p>}
            {allowNext && <SharedButtons.TextButton 
              body='Next'
              onClick={next}
              color="green"
              className="next"
            />}
          </>
        )}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}

export const TodayListPage: FC = () => {

  const { todayList, isLoading, isError, setTodayList } = WordLib.useTodayList({ enabled: true });

  function updateState() {
    const copy = todayList.getCopy();
    setTodayList(copy);
  }

  return (
    <div className="today-list-page">
      <div className="main-content">
        <h1>Today List</h1>
        <p>Here you can study added words.</p>
        <div className="today-list-wrapper">
          <TodayListWidget 
            todayList={todayList}
            isLoading={isLoading}
            isError={isError}
            updateState={updateState}
          />
        </div>
      </div>
    </div>
  )
}