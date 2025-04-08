import { FC } from "react";
import { TextsLib } from "../../../../entities/text";
import './styles.scss';
import { TextFeaturesLib } from "../../../../features/texts";
import { BlockEditor } from "./blockEditor";
import { BlockWidget } from "./blockWidget";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { useUrlTextId } from "../../lib";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";

const TextSceleton: FC = () => {

  return (
    <div className="text-sceleton">
      {[1,2,3,4,5].map((item, index) => (
        <div key={index} className="block-sceleton"></div>
      ))}
    </div>
  )
}

export const TextsBox: FC = () => {

  // const textId = useUrlTextId();

  // const {
  //   text,
  //   page,
  //   pagesTotal,
  //   isFetching,
  //   isError,
  //   updateState,
  //   nextPage,
  //   prevPage,
  //   setPage,
  //   refetch,
  // } = TextsLib.useEditingTextSpan(Number(textId));

  // const saveMutation = TextFeaturesLib.useSaveBlocks();

  // function newBlockAtEnd() {
  //   text.newBlockAtEnd();
  //   updateState();
  // }

  // function saveBlocks() {
  //   saveMutation.mutateAsync(text.getSaveBlocksDto())
  //   .then(() => {
  //     refetch();
  //   });
  // }

  return (
    <div className="editing-text-box">
      {/* <SharedUiHelpers.ErrorLoader
        isLoading={isFetching}
        isError={isError}
        loadingSceleton={<TextSceleton />}
      >
        <>
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
                />
              )
            ))}
            {text.editingAtEnd && (
              <BlockEditor 
                text={text}
                updateState={updateState}
              />
            )}
          </div>
          {!text.editing && (
            <div className="buttons-panel">
              <SharedButtons.SquareButton
                body='New block'
                onClick={newBlockAtEnd}
                color="green"
              />
              <SharedButtons.SquareActionButton
                body='Save'
                onClick={saveBlocks}
                isLoading={saveMutation.isLoading}
                isError={saveMutation.isError}
                color="green"
                disabled={!text.blocks.length}
              />
            </div>
          )}
          <div className="pagination">
            <SharedButtons.TextButton
              body='<'
              onClick={prevPage}
              color="green"
              disabled={page === 0}
              className="prev"
            />
            <div className="pages">
              {new Array(pagesTotal).fill(0).map((_, index) => (
                <SharedButtons.TextButton
                  key={index}
                  body={index + 1}
                  onClick={() => setPage(index)}
                  color="green"
                  className={page === index ? 'current' : ''}
                />
              ))}
            </div>
            <SharedButtons.TextButton
              body='>'
              onClick={nextPage}
              color="green"
              disabled={(page + 1) >= pagesTotal}
              className="next"
            />
          </div>
        </>
      </SharedUiHelpers.ErrorLoader> */}
    </div>
  )
}