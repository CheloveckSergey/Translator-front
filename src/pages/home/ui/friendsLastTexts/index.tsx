import { FC } from "react";
import './styles.scss';
import { TextUi, TextsLib } from "../../../../entities/text";
import { ShortTextPreview } from "../../../../entities/text/model/shortTextPreview";

export const FriendsLastTexts: FC = () => {

  const {
    texts,
    isLoading,
    isError,
  } = TextsLib.useFriendsLastTexts();

  return (
    <div className="friends-last-texts">
      <h3>Friend's texts</h3>
      <TextUi.ShortTextPreviewsList
        texts={texts}
        isLoading={isLoading}
        isError={isError}
        mapText={(text: ShortTextPreview) => <TextUi.ShortTextPreviewCard key={text.id} text={text} />}
        className="text-list"
      />
    </div>
  )
}