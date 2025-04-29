import { FC, useState } from "react";
import { useAppSelector } from "../../../../app/store";
import { TextsLimits, getLimitsFilter, getOrdersFilter, useUrlUserId } from "../../lib";
import { CreateTextDto, CreateTextResponse, TextPreview, TextPreviewsQuery, TextUi, TextUiTypes, TextsLib } from "../../../../entities/text";
import { TextFeaturesLib, TextFeaturesUi } from "../../../../features/texts";
import './styles.scss';
import { SharedInputs } from "../../../../shared/sharedUi/inputs";
import { SharedTypes } from "../../../../shared/types";
import { SharedUiTypes } from "../../../../shared/sharedUi/types";

interface TPWProps {
  text: TextPreview,
  textsQuery: TextPreviewsQuery,
  updateData: () => void,
}
const TextPreviewWidget: FC<TPWProps> = ({ text, textsQuery, updateData }) => {

  const { user } = useAppSelector(state => state.user);

  const urlUserId = useUrlUserId();

  const changeNameMutation = TextFeaturesLib.useChangeName(text.id, textsQuery, changeName);

  function changeName(name: string) {
    text.changeName(name);
    updateData();
  }

  const isCurUserTextsPage = user && urlUserId === user.id;
  const isCurUserText = user && user.id === text.author.id;

  const actions: React.ReactNode[] = [];

  if (user) {
    if (isCurUserTextsPage) {
      if (isCurUserText) {
        actions.push(
          <TextFeaturesUi.DeleteButton
            key={0}
            textId={text.id}
            query={textsQuery}
          />, 
        )
      } else {
        actions.push(
          <TextFeaturesUi.UncopyButton
            key={0}
            textId={text.id}
            query={textsQuery}
          />
        )
      }
    } else {
      if (!isCurUserText) {
        if (text.isCopied) {
          actions.push(
            <TextFeaturesUi.UncopyButton
              key={1}
              textId={text.id}
              query={textsQuery}
            />
          )
        } else {
          actions.push(
            <TextFeaturesUi.CopyButton 
              key={1}
              textId={text.id}
              query={textsQuery}
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
          isLoading: changeNameMutation.isPending,
          isError: changeNameMutation.isError
        }})
      }}
      actions={actions}
    />
  )
}

type Order = SharedTypes.QueryTypes.Order

export const TextListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const [order, setOrder] = useState<Order>('DESC');
  const [limit, setLimit] = useState<TextsLimits>(5);

  const userId = useUrlUserId();

  const textsQuery: TextPreviewsQuery = {
    limit, 
    order, 
    userId,
  }

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    updateData,
  } = TextsLib.useTextPreviewsList2(textsQuery);

  const addTextMutation = TextFeaturesLib.useAddText(textsQuery);

  const actionsObjects: TextUiTypes.TLActionObjects = {}

  if (user && userId === user.id) {
    actionsObjects.addText = {
      mutate: addTextMutation.mutateAsync,
      isLoading: addTextMutation.isPending,
      isError: addTextMutation.isError,
    }
  }

  return (
    <div className="texts-widget">
      <div className="filters">
        <SharedInputs.SelectLine<Order>
          name='Order'
          options={getOrdersFilter()}
          value={order}
          setValue={setOrder}
        />
        <SharedInputs.SelectLine<TextsLimits>
          name='Limit'
          options={getLimitsFilter()}
          value={limit}
          setValue={setLimit}
        />
      </div>
      <TextUi.TextList2
        texts={data}
        isLoading={isLoading}
        isError={isError}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        actionObjects={actionsObjects}
        mapTexts={(text: TextPreview, index: number) => <TextPreviewWidget 
          key={index}
          text={text}
          textsQuery={textsQuery}
          updateData={updateData}
        />}
        className="text-list"
      />
    </div>
  )
}