import { FC } from "react";
import { TextPreview, TextUi, TextsLib } from "../../../../entities/text";
import { useNavigate } from "react-router-dom";
import './styles.scss'
import { useUrlUserId } from "../../lib";

interface TPWProps {
  text: TextPreview,
}
const TextPreviewWidget: FC<TPWProps> = ({ text }) => {

  return (
    <TextUi.TextPreviewUi
      textPreview={text}
      actionObjects={{}}
      actions={[]}
    />
  )
}

export const TextsWidget: FC = () => {

  const userId = useUrlUserId();

  const { textList, isFetching, isError } = TextsLib.useTextPreviewsList({
    userId: Number(userId),
    limit: 3,
    order: 'DESC',
  });

  const navigate = useNavigate();

  return (
    <div className="user-texts">
      <div className="head">
        <h2>Last texts</h2>
        <p 
          className="watch-all"
          onClick={() => navigate('/texts/user/' + userId)}
        >
          Watch all
        </p>
      </div>
      <TextUi.TextListUi
        textList={textList}
        isLoading={isFetching}
        isError={isError}
        actionObjects={{}}
        mapTexts={(text: TextPreview, index: number) => <TextPreviewWidget
          key={index}
          text={text}
        />}
      />
    </div>
  )
}