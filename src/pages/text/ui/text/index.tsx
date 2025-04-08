import { FC, useState } from "react";
import { EditingTextSpan, EditingTextSpanDto, TextQuery, TextSpan, TextsLib, mapEditingTextSpan } from "../../../../entities/text";
import { useUrlTextId } from "../../../editingText";
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
      isLoading,
      isFetching,
      isError,
      refetch,
    },
    pagesTotal,
    nextPage,
    prevPage,
    setPage,
    newPage,
    page,
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
              page={page}
              pageTotal={pagesTotal}
            />
          ) : (
            <EditingTextWidget
              dto={text}
              page={page}
              pageTotal={pagesTotal}
              nextPage={nextPage}
              prevPage={prevPage}
              setPage={setPage}
              newPage={newPage}
              refetch={refetch}
              query={{
                ...query,
                page,
              }}
            />
          )
        )}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}