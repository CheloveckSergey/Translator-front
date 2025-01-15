import { FC } from "react";
import { useAppSelector } from "../../../../app/store";
import { useUrlUserId } from "../../lib";
import { TextPreview, TextUi, TextsLib } from "../../../../entities/text";
import { TextFeaturesLib, TextFeaturesUi } from "../../../../features/texts";
import './styles.scss';

interface TPWProps {
  text: TextPreview,
  updateTexts: () => void,
}
const TextPreviewWidget: FC<TPWProps> = ({ text, updateTexts }) => {

  const { user } = useAppSelector(state => state.user);

  const urlUserId = useUrlUserId();

  const changeNameMutation = TextFeaturesLib.useChangeName(changeName);

  function changeName(name: string) {
    text.changeName(name);
    updateTexts();
  }

  function deleteText() {
    text.setIsDeleted(true);
    updateTexts();
  }

  function copyText() {
    text.setIsCopied(true);
    updateTexts();
  }

  function uncopyText() {
    text.setIsCopied(false);
    updateTexts();
  }

  const isCurUserTextsPage = user && urlUserId === user.id;
  const isCurUserText = user && user.id === text.author.id;

  const actions: React.ReactNode[] = [];

  if (user) {
    if (isCurUserTextsPage) {
      if (isCurUserText) {
        actions.push(
          <TextFeaturesUi.DeleteButton
            textId={text.id}
            deleteText={deleteText}
          />, 
        )
      } else {
        actions.push(
          <TextFeaturesUi.UncopyButton
            textId={text.id}
            uncopyText={uncopyText}
          />
        )
      }
    } else {
      if (isCurUserText) {
        if (text.isCopied) {
          actions.push(
            <TextFeaturesUi.UncopyButton
              textId={text.id}
              uncopyText={uncopyText}
            />
          )
        } else {
          actions.push(
            <TextFeaturesUi.CopyButton 
              textId={text.id}
              copyText={copyText}
              size={20}
            />
          ) 
        }
      }
    }
  }

  return (
    <TextUi.TextPreviewUi
      textPreview={text}
      showAnotherAuthor={text.author.id !== urlUserId}
      actionObjects={{
        ...(isCurUserTextsPage && isCurUserText && {changeName: {
          mutate: changeNameMutation.mutateAsync,
          isLoading: changeNameMutation.isLoading,
          isError: changeNameMutation.isError
        }})
      }}
      actions={actions}
    />
  )
}

export const TextListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const userId = useUrlUserId();

  const {
    textList,
    isFetching,
    isError,
    updateTexts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = TextsLib.useTextPreviewsList({ 
    limit: 3, 
    order: 'DESC', 
    userId
  });

  const addTextMutation = TextFeaturesLib.useAddText(addText);

  function addText(textPreview: TextPreview) {
    textList.addText(textPreview);
    updateTexts();
  }

  return (
    <TextUi.TextListUi 
      textList={textList}
      isLoading={isFetching}
      isError={isError}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      actionObjects={{
        ...(user && userId === user?.id && {addText: {
          mutate: addTextMutation.mutateAsync,
          isLoading: addTextMutation.isLoading,
          isError: addTextMutation.isError,
        }})
      }}
      mapTexts={(text: TextPreview, index: number) => <TextPreviewWidget 
        key={index}
        text={text}
        updateTexts={updateTexts}
      />}
      className="text-list"
    />
  )
}