import { FC, useEffect, useState } from "react"
import { EditingBlock, EditingTextSpan, EditingTextSpanDto, TextPagination, TextQuery, TextSpanDto, TextUi, mapEditingTextSpan } from "../../../../../entities/text"
import { SharedButtons } from "../../../../../shared/sharedUi/buttons"
import { TextFeaturesLib } from "../../../../../features/texts"
import { UseModalWindow } from "../../../../../widgets/modalWindow"
import { Warnings, useEditingText } from "../../../lib"
import { FaCaretSquareDown, FaCaretSquareUp, FaRegEdit, FaShippingFast, FaTrashAlt } from "react-icons/fa"
import { ShowWarningIf } from "../../../../../shared/types"
import { SharedHooks } from "../../../../../shared/lib"
import { WarningWindow } from "../../../../../widgets/warningWindow"
import './styles.scss';

interface BWProps {
  block: EditingBlock,
  text: EditingTextSpan,
  updateState: () => void,
  showWarningIf: ShowWarningIf,
  saveBlock: (original: string, translation: string) => void,
  closeEditor: () => void,
}
const BlockWidget: FC<BWProps> = ({ block, text, updateState, showWarningIf, saveBlock, closeEditor }) => {

  const fastDeleteMutation = TextFeaturesLib.useFastDeleteBlock(fastDelete);

  function fastDelete() {
    text.fastDelete(block.id);
    updateState();
  }

  function onFastDelete() {
    fastDeleteMutation.mutate({ blockId: block.id });
  }

  function onEdit() {
    showWarningIf(
      {
        condition: text.editing,
        text: Warnings.EDITING,
      },
      () => {
        text.editBlock(block.id);
        updateState();
      },
    );
  }

  function onNewBlockBelow() {
    showWarningIf(
      {
        condition: text.editing,
        text: Warnings.EDITING,
      },
      () => {
        text.newBlockBelow(block.id);
        updateState();
      },
    );
  }

  function onNewBlockAbove() {
    showWarningIf(
      {
        condition: text.editing,
        text: Warnings.EDITING,
      },
      () => {
        text.newBlockAbove(block.id);
        updateState();
      },
    );
  }

  function onDelete() {
    block.setDeleted(true);
    updateState();
  }

  function undelete() {
    block.setDeleted(false);
    updateState();
  }

  return (
    <>
      {text.editingAboveBlockId && text.editingAboveBlockId === block.id && (
        <TextUi.TextBoxUi.Editor
          saveBlock={saveBlock}
          close={closeEditor}
        />
      )}
      <TextUi.TextBoxUi.Block
        original={block.original}
        translation={block.translation}
        leftActions={[]}
        rightActions={[
          (<SharedButtons.TextButton
            body={<FaCaretSquareUp size={15} />}
            onClick={onNewBlockAbove}
            color="dark"
            disabled={block.isNew}
          />),
          (<SharedButtons.TextButton
            body={<FaCaretSquareDown size={15} />}
            onClick={onNewBlockBelow}
            color="dark"
            disabled={block.isNew}
          />),
          (<SharedButtons.TextButton
            body={<FaRegEdit size={15} />}
            onClick={onEdit}
            color="dark"
          />),
          (<SharedButtons.TextButton
            body={<FaTrashAlt size={15} />}
            onClick={onDelete}
            color="dark"
          />),
          (<SharedButtons.TextActionButton
            body={<FaShippingFast size={15} />}
            onClick={onFastDelete}
            isLoading={fastDeleteMutation.isLoading}
            isError={fastDeleteMutation.isError}
            color="dark"
            title="Fast delete block"
          />)
        ]}
        undelete={undelete}
        changed={block.changed}
        isNew={block.isNew}
        deleted={block.deleted}
      />
      {text.editingBelowBlockId && text.editingBelowBlockId === block.id && (
        <TextUi.TextBoxUi.Editor
          saveBlock={saveBlock}
          close={closeEditor}
        />
      )}
    </>
  )
} 

interface ETWProps {
  dto: EditingTextSpanDto,
  pagination: TextPagination,
  newPage: () => void,
  query: TextQuery,
}
export const EditingTextWidget: FC<ETWProps> = ({ dto, pagination, newPage, query }) => {

  const { text, updateState, setText } = useEditingText(dto, pagination.page);
  
  const {
    isWarning,
    operation: warningOperation,
    warnings,
    showWarningIf,
    closeWarning,
  } = SharedHooks.useWarning();

  useEffect(() => {
    if (!text.blocks.length) {
      newBlockAtEnd();
    }
  }, [pagination.page]);

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

  function pageTransition(operation: () => void) {
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
        operation();
      },
    )
  }

  function onNextPage() {
    pageTransition(pagination.nextPage);
  }

  function onPrevPage() {
    pageTransition(pagination.prevPage);
  }

  function onSetPage(page: number) {
    pageTransition(() => pagination.setPage(page));
  }

  const newPagination: TextPagination = {
    ...pagination,
    nextPage: onNextPage,
    prevPage: onPrevPage,
    setPage: onSetPage,
  }

  function saveBlock(original: string, translation: string) {
    if (text.editingBlockId) {
      text.changeBlock(original, translation);
    } else {
      text.addBlock(original, translation);
    }
    updateState();
  }

  function closeEditor() {
    text.closeEdit();
    updateState();
  }

  const buttonsAtTheEnd: React.ReactNode[] = [
    <SharedButtons.SquareActionButton
      body='Save'
      onClick={onSaveBlocks}
      isLoading={saveMutation.isLoading}
      isError={saveMutation.isError}
      color="green"
      disabled={!text.getSavedBlocks().length}
    />
  ];

  if ((text.blocks.length < query.limit) && (pagination.page + 1 === pagination.pageTotal)) {
    buttonsAtTheEnd.push(
      <SharedButtons.SquareButton
        body='New block'
        onClick={onNewBlockAtEnd}
        color="green"
        disabled={pagination.page < pagination.pageTotal - 1}
      />
    );
  }

  return (
    <>
      <TextUi.TextBoxUi.TextBox
        blocks={text.blocks.map((block, index) => (
          text.editingBlockId === block.id ? (
            <TextUi.TextBoxUi.Editor
              saveBlock={saveBlock}
              close={closeEditor}
              original={text.getEditedBlock()?.original}
              translation={text.getEditedBlock()?.translation}
            />
          ) : (
            <BlockWidget
              key={index}
              block={block}
              text={text}
              updateState={updateState}
              showWarningIf={showWarningIf}
              saveBlock={saveBlock}
              closeEditor={closeEditor}
            />
          )
        ))}
        editorAtTheEnd={text.editingAtEnd && (
          <TextUi.TextBoxUi.Editor
            saveBlock={saveBlock}
            close={closeEditor}
          />
        )}
        buttonsPanel={!text.editing && (
          <TextUi.TextBoxUi.ButtonsPanel
            actions={buttonsAtTheEnd}
          />
        )}
        pagination={newPagination}
        className='editing-text-box'
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
    </>
  )
}