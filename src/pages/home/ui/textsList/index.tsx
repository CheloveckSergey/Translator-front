import { FC } from "react";
import { TextPreview, TextUi, TextsLib } from "../../../../entities/text";
import { useAppSelector } from "../../../../app/store";
import './styles.scss'

interface TPWInterface {
  textPreview: TextPreview,
}
const TextPreviewWidget: FC<TPWInterface> = ({ textPreview }) => {

  return (
    <TextUi.TextPreviewUi 
      textPreview={textPreview}
      actionObjects={{}}
      actions={[]}
    />
  )
}

export const LastTextsListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    textList,
    isFetching,
    isError
  } = TextsLib.useTextPreviewsList2({ 
    userId: user!.id,
    order: 'DESC', 
    limit: 3,
  });

  return (
    <div className="last-texts-list-widget">
      <h2>Last texts</h2>
      <TextUi.TextListUi 
        textList={textList}
        isLoading={isFetching}
        isError={isError}
        mapTexts={(text: TextPreview, index: number) => (
          <TextPreviewWidget
            key={index}
            textPreview={text}
          />
        )}
        actionObjects={{}}
        className="last-texts-list"
      />
    </div>
  )
}