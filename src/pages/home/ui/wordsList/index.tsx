import { FC } from "react";
import { WordUi } from "../../../../entities/word/ui";
import { useAppSelector } from "../../../../app/store";
import { WordLib } from "../../../../entities/word/lib";
import './styles.scss'
import { UserWordInfo } from "../../../../entities/word";


interface WLWProps {
  word: UserWordInfo
}
const WordLineWidget: FC<WLWProps> = ({ word }) => {

  return (
    <WordUi.WordLine
      word={word}
      actions={[

      ]}
    />
  )
}

export const WordsListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    words,
    isFetching,
    isError,
  } = WordLib.useUserWords({ limit: 5, userId: user!.id });

  return (
    <div className="last-words-list-widget">
      <h2>Last words</h2>
      <WordUi.WordList
        words={words}
        isLoading={isFetching}
        isError={isError}
        mapWord={(word: UserWordInfo, index: number) => <WordLineWidget 
          key={index}
          word={word}
        />}
        isNoActions={true}
        className="last-words-list"
      />
    </div>
  )
}