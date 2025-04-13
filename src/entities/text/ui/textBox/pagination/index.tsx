import { FC } from "react";
import { SharedButtons } from "../../../../../shared/sharedUi/buttons";
import { TextPagination } from "../../../model";
import './styles.scss'

interface PProps {
  pagination: TextPagination,
}
export const Pagination: FC<PProps> = ({ pagination }) => {

  const {
    page,
    pageTotal,
    nextPage,
    prevPage,
    setPage,
  } = pagination;

  function onNextPage() {
    nextPage();
  }

  function onPrevPage() {
    prevPage();
  }

  function onSetPage(page: number) {
    setPage(page);
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