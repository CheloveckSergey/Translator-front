import { FC, useState } from "react";
import { TextQuery, TextsLib } from "../../../../entities/text";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import { PremiereTextWidget } from "./premiereText";
import { EditingTextWidget } from "./editingText";

interface TWProps {
  textData: ReturnType<typeof TextsLib.useTextSpan>,
  query: Omit<TextQuery, 'page'>,
}
export const TextWidget: FC<TWProps> = ({ textData, query }) => {

  const {
    result: {
      data: text,
      isFetching,
      isError,
    },
    pagination,    
    newPage,
  } = textData;

  return (
    <div className="text-widget">
      <SharedUiHelpers.ErrorLoader
        isLoading={isFetching}
        isError={isError}
      >
        {text && (
          text.premiere ? (
            <PremiereTextWidget
              dto={text}
              pagination={pagination}
            />
          ) : (
            <EditingTextWidget
              dto={text}
              pagination={pagination}
              newPage={newPage}
              query={{
                ...query,
                page: pagination.page,
              }}
            />
          )
        )}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}