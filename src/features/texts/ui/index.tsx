import { FC } from "react"
import { SharedButtons } from "../../../shared/sharedUi/buttons"
import { MdDelete } from "react-icons/md";
import { TextFeaturesLib } from "../lib";
import { FaCopy } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

interface CBProps {
  textId: number,
  copyText: () => void,
  color?: 'light' | 'dark',
  size?: number,
}
const CopyButton: FC<CBProps> = ({ textId, copyText, color = 'light', size = 25 }) => {

  const { mutateAsync, isLoading, isError } = TextFeaturesLib.useCopyText(textId, copyText);

  return (
    <SharedButtons.TextActionButton
      body={<FaCopy size={size} />}
      isLoading={isLoading}
      isError={isError}
      color={color}
      onClick={mutateAsync}
      className=""
    />
  )
}

interface UBProps {
  textId: number,
  uncopyText: () => void,
  color?: 'light' | 'dark',
  size?: number,
}
const UncopyButton: FC<UBProps> = ({ textId, uncopyText, color = 'light', size = 25 }) => {

  const { mutateAsync, isLoading, isError } = TextFeaturesLib.useUncopyText(textId, uncopyText);

  return (
    <SharedButtons.TextActionButton
      body={<FaDeleteLeft size={size} />}
      isLoading={isLoading}
      isError={isError}
      color={color}
      onClick={mutateAsync}
      className=""
    />
  )
}

interface DBProps {
  textId: number,
  deleteText: () => void,
  color?: 'light' | 'dark',
  size?: number,
}
const DeleteButton: FC<DBProps> = ({ textId, deleteText, color = 'light', size = 25 }) => {

  const { mutateAsync, isLoading, isError } = TextFeaturesLib.useDeleteText(textId, deleteText);

  return (
    <SharedButtons.TextActionButton
      body={<MdDelete size={size} />}
      isLoading={isLoading}
      isError={isError}
      color={color}
      onClick={mutateAsync}
      className=""
    />
  )
}

export const TextFeaturesUi = {
  CopyButton,
  UncopyButton,
  DeleteButton,
}