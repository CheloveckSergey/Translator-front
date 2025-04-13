import { FC } from "react";
import { TextPagination } from "../../model";
import { BlockEditor } from "./editor";
import { Block } from "./block";
import { Pagination } from "./pagination";
import { ButtonsPanel } from "./buttonsPanel";
import './styles.scss'

type TBProps = {
  blocks: React.ReactNode,
  editorAtTheEnd?: React.ReactNode | React.ReactNode[],
  buttonsPanel?: React.ReactNode | React.ReactNode[],
  pagination: TextPagination,
  className?: string,
}
const TextBox: FC<TBProps> = ({ blocks, editorAtTheEnd, buttonsPanel, pagination, className }) => {

  return (
    <div className={["text-box", className].join(' ')}>
      <div className="box">
        {blocks}
        {editorAtTheEnd}
      </div>
      {buttonsPanel}
      <Pagination
        pagination={pagination}
      />
    </div>
  )
}

export const TextBoxUi = {
  TextBox,
  Block,
  Editor: BlockEditor,
  ButtonsPanel,
}