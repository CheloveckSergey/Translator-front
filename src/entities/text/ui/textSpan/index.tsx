import { FC } from "react";
import './styles.scss';
import { StringSpan } from "../../../word";

interface TSProps {
  stringSpans: StringSpan[],
  mapWords: (stringSpan: StringSpan, index: number) => React.ReactNode,
}
export const TextSpanUi: FC<TSProps> = ({ stringSpans, mapWords }) => {

  return (
    <div className="text-span">
      {stringSpans.map(mapWords)}
    </div>
  )
}