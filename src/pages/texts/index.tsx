import { FC, useState } from "react";
import './styles.scss';
import { TextUi } from "../../entities/text/ui";
import { TextFeaturesLib } from "../../features/texts";
import { TextListClass, TextPreviewClass, TextsLib } from "../../entities/text";
import { useAppSelector } from "../../app/store";

interface TPWProps {
  text: TextPreviewClass,
  updateTexts: () => void,
}
const TextPreviewWidget: FC<TPWProps> = ({ text, updateTexts }) => {

  const changeNameMutation = TextFeaturesLib.useChangeName(changeName);

  function changeName(name: string) {
    text.changeName(name);
    updateTexts();
  }

  return (
    <TextUi.TextPreviewUi
      textPreview={text}
      actionObjects={{
        changeName: {
          mutate: changeNameMutation.mutateAsync,
          isLoading: changeNameMutation.isLoading,
          isError: changeNameMutation.isError
        }
      }}
    />
  )
}

const TextListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    textList,
    setTextList,
    isLoading,
    isError,
    updateTexts
  } = TextsLib.useTextPreviewsList(user!.id)

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
      actionObjects={{
        addText: {
          mutate: addTextMutation.mutateAsync,
          isLoading: addTextMutation.isLoading,
          isError: addTextMutation.isError,
        }
      }}
      mapTexts={(text: TextPreviewClass, index: number) => <TextPreviewWidget 
        key={index}
        text={text}
        updateTexts={updateTexts}
      />}
    />
  )
}

export const TextsPage: FC = () => {

  return (
    <div className="texts-page">
      <div className="main-content">
        <h1>Texts</h1>
        <p>Here you can check your texts. You can add or delete any text.</p>
        <TextListWidget />
      </div>
    </div>
  )
}