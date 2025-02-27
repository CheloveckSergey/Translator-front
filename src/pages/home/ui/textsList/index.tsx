import { FC } from "react";
import { TextPreview, TextPreviewsQuery, TextUi, TextsLib } from "../../../../entities/text";
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

  const query: TextPreviewsQuery = {
    userId: user!.id,
    limit: 3,
    order: 'DESC',
  }

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = TextsLib.useTextPreviewsList2(query);

  return (
    <div className="last-texts-list-widget">
      <h2>Last texts</h2>
      <TextUi.TextList2
        texts={data}
        isLoading={isLoading}
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