import { FC } from "react";
import { AllTextPreviewsQuery, TextPreview, TextUi, TextsLib } from "../../../../entities/text";
import { useAppSelector } from "../../../../app/store";
import { TextFeaturesUi } from "../../../../features/texts";
import './styles.scss';

interface TWProps {
  text: TextPreview,
  query: AllTextPreviewsQuery,
}
const TextWidget: FC<TWProps> = ({ text, query }) => {

  const { user } = useAppSelector(state => state.user);

  const actions: React.ReactNode[] = [];

  if (user && text.author.id !== user.id) {
    if (text.isCopied) {
      actions.push(
        <TextFeaturesUi.UncopyButton
          textId={text.id}
          query={query}
        />
      )
    } else {
      actions.push(
        <TextFeaturesUi.CopyButton
          textId={text.id}
          query={query}
        />
      )
    }
  }

  return (
    <TextUi.TextPreviewUi
      textPreview={text}
      actionObjects={{}}
      actions={actions}
      showAnotherAuthor={true}
    />
  )
}

export const TextsListWidget: FC = () => {

  const query: AllTextPreviewsQuery = {
    limit: 5,
    order: 'DESC',
  }

  const {
    data: texts,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = TextsLib.useAllTextPreviewsList(query);

  return (
    <div className="texts-list-widget">
      <TextUi.TextList2
        texts={texts}
        isLoading={isLoading}
        isError={isError}
        mapTexts={(text: TextPreview, index: number) => (
          <TextWidget
            key={index}
            text={text}
            query={query}
          />
        )}
        actionObjects={{}}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  )
}