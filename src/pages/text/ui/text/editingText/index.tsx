import { FC, useEffect, useState } from "react"
import { EditingTextSpan, EditingTextSpanDto, TextQuery, TextSpanDto, mapEditingTextSpan } from "../../../../../entities/text"
import { BlockEditor } from "./editor"
import { BlockWidget } from "./block"
import { SharedButtons } from "../../../../../shared/sharedUi/buttons"
import { TextFeaturesLib } from "../../../../../features/texts"
import './styles.scss'
import { SharedUiHelpers } from "../../../../../shared/sharedUi/helpers"
import { SharedBlocks } from "../../../../../shared/sharedUi/blocks"
import { UseModalWindow } from "../../../../../widgets/modalWindow"
import { Warnings, useEditingText, useWarning } from "../../../lib"
import { WarningWindow } from "./warningWindow"
import { Pagination } from "./pagination"

interface ETWProps {
  dto: EditingTextSpanDto,
  page: number,
  pageTotal: number,
  nextPage: () => void,
  prevPage: () => void,
  setPage: (page: number) => void,
  newPage: () => void,
  refetch: () => void,
  query: TextQuery,
}
export const EditingTextWidget: FC<ETWProps> = ({ dto, page, pageTotal, nextPage, prevPage, setPage, newPage, refetch, query }) => {

  const { text, updateState, setText } = useEditingText(dto, page);
  
  const {
    isWarning,
    operation: warningOperation,
    warnings,
    showWarningIf,
    closeWarning,
  } = useWarning();

  useEffect(() => {
    if (!text.blocks.length) {
      newBlockAtEnd();
    }
  }, [page]);

  const saveMutation = TextFeaturesLib.useSaveBlocks((dto: EditingTextSpanDto) => {
    setText(mapEditingTextSpan(dto));
  });

  function newBlockAtEnd() {
    text.newBlockAtEnd();
    updateState();
  }

  function onNewBlockAtEnd() {
    showWarningIf(
      {
        condition: text.editing,
        text: Warnings.EDITING,
      },
      () => {
        newBlockAtEnd();
      },
    );
  }

  function onNewPage() {
    showWarningIf(
      [
        {
          condition: text.editing,
          text: Warnings.EDITING,
        },
        {
          condition: !!text.getSavedBlocks().length,
          text: Warnings.UNSAVING,
        },
      ],
      () => {
        newPage();
      },
    )
  }

  function onSaveBlocks() {
    saveMutation.mutateAsync({
      textId: text.id,
      blocks: text.getSavedBlocks(),
      query: {
        limit: query.limit,
        page: query.page,
      }
    });
  }

  return (
    <>
      <div className="text-header">

      </div>
      <div className="editing-text-box">
        <div className="box">
          {text.blocks.map(block => (
            text.editingBlockId === block.id ? (
              <BlockEditor
                key={block.id}
                text={text}
                updateState={updateState}
              />
            ) : (
              <BlockWidget
                key={block.id}
                block={block}
                text={text}
                updateState={updateState}
                showWarningIf={showWarningIf}
              />
            )
          ))}
          {(text.editingAtEnd) && (
            <BlockEditor 
              text={text}
              updateState={updateState}
            />
          )}
        </div>
        {!text.editing && (
          <div className="buttons-panel">
            {(text.blocks.length < query.limit) && (page + 1 === pageTotal) && (
              <SharedButtons.SquareButton
                body='New block'
                onClick={onNewBlockAtEnd}
                color="green"
                disabled={page < pageTotal - 1}
              />
            )}
            {(text.blocks.length >= query.limit) && (page + 1 === pageTotal) && (
              <SharedButtons.SquareButton
                body='New page'
                onClick={onNewPage}
                color="green"
                disabled={!!text.getSavedBlocks().length}
              />
            )}
            <SharedButtons.SquareActionButton
              body='Save'
              onClick={onSaveBlocks}
              isLoading={saveMutation.isLoading}
              isError={saveMutation.isError}
              color="green"
              disabled={!text.getSavedBlocks().length}
            />
          </div>
        )}
        <Pagination
          text={text}
          page={page}
          pageTotal={pageTotal}
          nextPage={nextPage}
          prevPage={prevPage}
          setPage={setPage}
          showWarningIf={showWarningIf}
        />
        <UseModalWindow
          condition={isWarning}
          onClose={closeWarning}
        >
          <WarningWindow
            operation={() => {
              warningOperation?.operation();
            }}
            close={closeWarning}
            warnings={warnings}
          />
        </UseModalWindow>
      </div>
    </>
  )
}