import { FC } from "react";
import { TextSpanClass } from "../../model";
import { WordUi } from "../../../word/ui";
import './styles.scss';
import { StringSpan } from "../../../word";

interface TSProps {
  textSpan: TextSpanClass,
  mapWords: (stringSpan: StringSpan, index: number) => React.ReactNode,
}
export const TextSpan: FC<TSProps> = ({ textSpan, mapWords }) => {

  return (
    <div className="text-span">
      {textSpan.stringSpans.map(mapWords)}
      {/* {textSpan.stringSpans.map((stringSpan, index) => (
        <WordUi.StringSpanUi
          key={index}
          stringSpan={stringSpan}
        />
      ))} */}
    </div>
  )
}