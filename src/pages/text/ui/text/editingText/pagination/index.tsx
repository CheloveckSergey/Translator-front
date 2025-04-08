import { FC } from "react";
import { EditingTextSpan } from "../../../../../../entities/text";
import { ShowWarningIf, Warnings } from "../../../../lib";
import { SharedButtons } from "../../../../../../shared/sharedUi/buttons";

interface PProps {
  text: EditingTextSpan,
  page: number,
  pageTotal: number,
  nextPage: () => void,
  prevPage: () => void,
  setPage: (page: number) => void,
  showWarningIf: ShowWarningIf,
}
export const Pagination: FC<PProps> = ({ text, page, pageTotal, nextPage, prevPage, setPage, showWarningIf }) => {

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
    pageTransition(nextPage);
  }

  function onPrevPage() {
    pageTransition(prevPage);
  }

  function onSetPage(page: number) {
    pageTransition(() => setPage(page));
  }

  return (
    <div className="pagination">
      <SharedButtons.TextButton
        body='<'
        onClick={onPrevPage}
        color="green"
        disabled={page === 0}
        className="prev"
      />
      <div className="pages">
        {new Array(pageTotal).fill(0).map((_, index) => (
          <SharedButtons.TextButton
            key={index}
            body={index + 1}
            onClick={() => {
              onSetPage(index)
            }}
            color="green"
            className={page === index ? 'current' : ''}
          />
        ))}
      </div>
      <SharedButtons.TextButton
        body='>'
        onClick={onNextPage}
        color="green"
        disabled={(page + 1) >= pageTotal}
        className="next"
      />
    </div>
  )
}