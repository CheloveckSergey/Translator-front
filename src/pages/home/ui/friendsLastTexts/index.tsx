import { FC } from "react";
import './styles.scss';
import { TextUi, TextsLib } from "../../../../entities/text";
import { ShortTextPreview } from "../../../../entities/text/model/types/shortTextPreview";
import { useAppSelector } from "../../../../app/store";

export const FriendsLastTexts: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    texts,
    isFetching,
    isError,
  } = TextsLib.useFriendsLastTexts({
    userId: user!.id,
    limit: 5,
  });

  return (
    <div className="friends-last-texts">
      <h3>Friend's texts</h3>
      <TextUi.ShortTextPreviewsList
        texts={texts}
        isLoading={isFetching}
        isError={isError}
        mapText={(text: ShortTextPreview) => <TextUi.ShortTextPreviewCard key={text.id} text={text} />}
        className="text-list"
      />
    </div>
  )
}