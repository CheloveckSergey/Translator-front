import { FC } from "react";
import { useAppSelector } from "../../../../app/store";
import { useUrlUserId } from "../../lib";
import { CreateTextDto, CreateTextResponse, TextPreview, TextPreviewsQuery, TextUi, TextsLib } from "../../../../entities/text";
import { TextFeaturesLib, TextFeaturesUi } from "../../../../features/texts";
import './styles.scss';

interface TPWProps {
  text: TextPreview,
}
const TextPreviewWidget: FC<TPWProps> = ({ text }) => {

  const { user } = useAppSelector(state => state.user);

  const urlUserId = useUrlUserId();

  const changeNameMutation = TextFeaturesLib.useChangeName();

  // function changeName(name: string) {
  //   text.changeName(name);
  //   updateTexts();
  // }

  // function deleteText() {
  //   text.setIsDeleted(true);
  //   updateTexts();
  // }

  // function copyText() {
  //   text.setIsCopied(true);
  //   updateTexts();
  // }

  // function uncopyText() {
  //   text.setIsCopied(false);
  //   updateTexts();
  // }

  const isCurUserTextsPage = user && urlUserId === user.id;
  const isCurUserText = user && user.id === text.author.id;

  const actions: React.ReactNode[] = [];

  if (user) {
    if (isCurUserTextsPage) {
      if (isCurUserText) {
        actions.push(
          <TextFeaturesUi.DeleteButton
            textId={text.id}
          />, 
        )
      } else {
        actions.push(
          <TextFeaturesUi.UncopyButton
            textId={text.id}
          />
        )
      }
    } else {
      if (isCurUserText) {
        if (text.isCopied) {
          actions.push(
            <TextFeaturesUi.UncopyButton
              textId={text.id}
            />
          )
        } else {
          actions.push(
            <TextFeaturesUi.CopyButton 
              textId={text.id}
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

  const textsQuery: TextPreviewsQuery = {
    limit: 4, 
    order: 'DESC', 
    userId,
  }

  const {
    textList,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = TextsLib.useTextPreviewsList2(textsQuery);

  const addTextMutation = TextFeaturesLib.useAddText(textsQuery);

  const actionsObjects: {
    addText?: {
      mutate: (dto: CreateTextDto) => Promise<CreateTextResponse>;
      isLoading: boolean;
      isError: boolean;
    } | undefined;
  } = {}

  // function addText(text: TextPreview) {
  //   textList.addText(text);
  //   updateTexts();
  // }

  if (user && userId === user?.id) {
    actionsObjects.addText = {
      mutate: addTextMutation.mutateAsync,
      isLoading: addTextMutation.isLoading,
      isError: addTextMutation.isError,
    }
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
        ...(user && userId === user?.id && {addText: {
          mutate: addTextMutation.mutateAsync,
          isLoading: addTextMutation.isLoading,
          isError: addTextMutation.isError,
        }})
      }}
      mapTexts={(text: TextPreview, index: number) => <TextPreviewWidget 
        key={index}
        text={text}
      />}
      className="text-list"
    />
  )
}