import { FC } from "react";
import { TextPreviewClass, TextUi, TextsLib } from "../../../entities/text";
import { useNavigate, useParams } from "react-router-dom";
import './styles.scss'

interface TPWProps {
  text: TextPreviewClass,
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

interface TWProps {
  
}
export const TextsWidget: FC<TWProps> = ({  }) => {

  const { userId } = useParams();

  const { textList, isLoading, isError } = TextsLib.useTextPreviewsList({
    userId: Number(userId),
    limit: 3,
    order: 'DESC',
  });

  const navigate = useNavigate();

  return (
    <div className="user-texts">
      <div className="head">
        <h3>Last texts</h3>
        <p 
          className="watch-all"
          onClick={() => navigate('/texts/user/' + userId)}
        >
          Watch all
        </p>
      </div>
      <TextUi.TextListUi
        textList={textList}
        isLoading={isLoading}
        isError={isError}
        actionObjects={{
  
        }}
        mapTexts={(text: TextPreviewClass, index: number) => <TextPreviewWidget
          key={index}
          text={text}
        />}
      />
    </div>
  )
}