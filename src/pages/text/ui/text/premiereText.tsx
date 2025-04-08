import { FC, useState } from "react";
import { PremiereTextSpanDto, TextSpan, mapPremiereTextSpan } from "../../../../entities/text";

function usePremiereText(dto: PremiereTextSpanDto) {
  const [text, setText] = useState<TextSpan>(mapPremiereTextSpan(dto));
  const [oldDto, setOldDto] = useState<PremiereTextSpanDto>(dto);

  if (dto !== oldDto) {
    setOldDto(dto);
    setText(mapPremiereTextSpan(dto));
  }

  function updateState() {
    const newText = text.getCopy();
    setText(newText);
  }

  return {
    text,
    updateState,
  }
}

interface PTWProps {
  dto: PremiereTextSpanDto,
  page: number,
  pageTotal: number,
}
export const PremiereTextWidget: FC<PTWProps> = ({ dto, page, pageTotal }) => {

  return (
    <div className="premiere-text-widget">
      Premiere text
    </div>
  )
}