import { FC } from "react";
import { useAppSelector } from "../../../../app/store";
import { useUrlUserId } from "../../lib";
import { TextPreviewClass, TextUi, TextsLib } from "../../../../entities/text";
import { TextFeaturesLib, TextFeaturesUi } from "../../../../features/texts";

interface TPWProps {
  text: TextPreviewClass,
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

  const isCurUserTexts = urlUserId === user?.id;

  const actions: React.ReactNode[] = [];

  if (isCurUserTexts) {
    if (user?.id === text.author.id) {
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
    if (text.author.id !== user?.id) {
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

  return (
    <TextUi.TextPreviewUi
      textPreview={text}
      showAnotherAuthor={text.author.id !== urlUserId}
      actionObjects={{
        ...(urlUserId === user?.id && text.author.id === user?.id && {changeName: {
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
    isLoading,
    isError,
    updateTexts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = TextsLib.useTextPreviewsList({ limit: 3, order: 'DESC', userId});

  const addTextMutation = TextFeaturesLib.useAddText(addText);

  function addText(textPreview: TextPreviewClass) {
    textList.addText(textPreview);
    updateTexts();
  }

  return (
    <TextUi.TextListUi 
      textList={textList}
      isLoading={isLoading}
      isError={isError}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      actionObjects={{
        ...(userId === user!.id && {addText: {
          mutate: addTextMutation.mutateAsync,
          isLoading: addTextMutation.isLoading,
          isError: addTextMutation.isError,
        }})
      }}
      mapTexts={(text: TextPreviewClass, index: number) => <TextPreviewWidget 
        key={index}
        text={text}
        updateTexts={updateTexts}
      />}
    />
  )
}