import { FC } from "react";
import { WholeWord } from "../../../../entities/word/model/wholeWord";
import { WordUi } from "../../../../entities/word/ui";
import { useAppSelector } from "../../../../app/store";
import { WordLib } from "../../../../entities/word/lib";
import './styles.scss'


interface WLWProps {
  word: WholeWord
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
    isLoading,
    isError,
  } = WordLib.useWholeWords({ limit: 5, userId: user!.id });

  return (
    <div className="last-words-list-widget">
      <h2>Last words</h2>
      <WordUi.WordList
        words={words}
        isLoading={isLoading}
        isError={isError}
        mapWord={(word: WholeWord, index: number) => <WordLineWidget 
          key={index}
          word={word}
        />}
        className="last-words-list"
      />
    </div>
  )
}