import { FC } from "react";
import { useUrlUserId } from "../../lib";
import { UserWordInfo, WordLib, WordUi } from "../../../../entities/word";
import { useNavigate } from "react-router-dom";
import './styles.scss';

interface WPWProps {
  word: UserWordInfo,
}
const WordPreviewWidget: FC<WPWProps> = ({ word }) => {

  return (
    <WordUi.WordLine
      word={word}
      actions={[]}
    />
  )
}

export const WordsWidget: FC = () => {

  const userId = useUrlUserId();

  const { words, isFetching, isError } = WordLib.useUserWords({
    userId: Number(userId),
    limit: 5,
    order: 'DESC',
  });

  const navigate = useNavigate();

  return (
    <div className="user-words">
      <div className="head">
        <h2>Last words</h2>
        <p 
          className="watch-all"
          onClick={() => navigate('/words/user/' + userId)}
        >
          Watch all
        </p>
      </div>
      <WordUi.WordList
        words={words}
        isLoading={isFetching}
        isError={isError}
        mapWord={(word: UserWordInfo, index: number) => <WordPreviewWidget
          key={index}
          word={word}
        />}
        isNoActions={true}
        className="words-list"
      />
    </div>
  )
}