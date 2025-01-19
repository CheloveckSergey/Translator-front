import { FC } from 'react';
import { UserWordInfo, WordLib, WordUi } from '../../../../entities/word';
import './styles.scss';
import { WordFeaturesUi } from '../../../../features/word';
import { useAppSelector } from '../../../../app/store';
import { useUrlUserId } from '../../lib';

interface WLWProps {
  word: UserWordInfo,
  updateState: () => void,
}
const WordLineWidget: FC<WLWProps> = ({ word, updateState }) => {

  const { user } = useAppSelector(state => state.user);

  const userId = useUrlUserId();

  const isCurUserWords = user?.id === userId;

  function deleteToStudied() {
    word.deleteToStudied();
    updateState();
  }

  function addToProcess() {
    word.addToProcess();
    updateState();
  }

  const actions: React.ReactNode[] = [];

  if (isCurUserWords) {
    if (word.status === 'process') {
      actions.push(
        <WordFeaturesUi.DeleteToStudiedButton 
          value={word.value}
          deleteToStudied={deleteToStudied}
          size={30}
        />
      );
    } else {
      actions.push(
        <WordFeaturesUi.AddToProcessButton
          value={word.value}
          addToProcess={addToProcess}
          size={30}
        />
      )
    }
  }

  return (
    <WordUi.WordLine 
      word={word}
      actions={actions}
    />
  )
}

export const WordListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const _userId = useUrlUserId();
  const userId = Number(_userId);

  const isCurUserWords = user?.id === userId;

  const { 
    words, 
    updateState, 
    isFetching, 
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = WordLib.useUserWords({ limit: 10, userId });

  return (
    <WordUi.WordList 
      words={words}
      isLoading={isFetching}
      isError={isError}
      mapWord={(word: UserWordInfo, index: number) => <WordLineWidget 
        key={index}
        word={word}
        updateState={updateState}
      />}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      isNoActions={!isCurUserWords}
      className='word-list'
    />
  )
}