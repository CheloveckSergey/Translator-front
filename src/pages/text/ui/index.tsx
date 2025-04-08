import { FC } from "react";
import { SharedBlocks } from "../../../shared/sharedUi/blocks";
import { Header } from "./header";
import { TextWidget } from "./text";
import { TextQuery, TextsLib } from "../../../entities/text";
import { useUrlTextId } from "../../editingText/lib";

export const TextPage: FC = () => {

  const textId = useUrlTextId();

  const query: Omit<TextQuery, 'page'> = {
    textId,
    limit: 5,
  }

  const textData = TextsLib.useTextSpan(query);

  return (
    <SharedBlocks.RegularLayout
      center={(
        <>
          <Header 
            refetchTextData={textData.result.refetch}
          />
          <TextWidget
            textData={textData}
            query={query}
          />
        </>
      )}
      className="text-page"
    />
  )
}