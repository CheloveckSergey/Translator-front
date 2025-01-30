import { useParams } from "react-router-dom";

export function useUrlTextId(): number {
  const { textId: _textId } = useParams();

  if (!_textId) {
    throw Error('В URL нет ID текста')
  }

  const textId = Number(_textId);
  return textId
}