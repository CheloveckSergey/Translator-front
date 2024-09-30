import { FC } from "react"
import './styles.scss';
import { TextPreviewClass, TextUi, TextsLib } from "../../entities/text";
import { WordUi } from "../../entities/word/ui";
import { WordLib } from "../../entities/word/lib";
import { WholeWord } from "../../entities/word/model/wholeWord";
import { useAppSelector } from "../../app/store";

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

const WordsListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    words,
    isLoading,
    isError,
  } = WordLib.useWholeWords({ limit: 5 });

  return (
    <WordUi.WordList
      words={words}
      isLoading={isLoading}
      isError={isError}
      mapWord={(word: WholeWord, index: number) => <WordLineWidget 
        key={index}
        word={word}
      />}
    />
  )
}

interface TPWInterface {
  textPreview: TextPreviewClass,
}
const TextPreviewWidget: FC<TPWInterface> = ({ textPreview }) => {

  return (
    <TextUi.TextPreviewUi 
      textPreview={textPreview}
      actionObjects={{

      }}
    />
  )
}

const LastTextsListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    textList,
    isLoading,
    isError
  } = TextsLib.useTextPreviewsList({ order: 'DESC', limit: 3, userId: user?.id });

  return (
    <TextUi.TextListUi 
      textList={textList}
      isLoading={isLoading}
      isError={isError}
      mapTexts={(text: TextPreviewClass, index: number) => <TextPreviewWidget
        key={index}
        textPreview={text}
      />}
      actionObjects={{

      }}
    />
  )
}

export const HomePage: FC = () => {

  return (
    <div className="home-page">
      <div className="main-content">
        <h1>Home</h1>
        <p>Here you can fast reach your last texts and added words</p>
        <h2>Last texts</h2>
        <LastTextsListWidget />
        <h2>Last words</h2>
        <WordsListWidget />
      </div>
    </div>
  )
}