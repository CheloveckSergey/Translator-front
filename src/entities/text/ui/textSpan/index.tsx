import { FC } from "react";
import './styles.scss';
import { StringSpan } from "../../../word";
import { TextSpan } from "../../model";

interface TSProps {
  textSpan: TextSpan,
  mapWords: (stringSpan: StringSpan, index: number) => React.ReactNode,
}
export const TextSpanUi: FC<TSProps> = ({ textSpan, mapWords }) => {

  return (
    <div className="text-span">
      {textSpan.stringSpans.map(mapWords)}
    </div>
  )
}