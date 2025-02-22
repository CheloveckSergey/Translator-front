import { FC } from "react"
import { SharedButtons } from "../../../shared/sharedUi/buttons"
import { MdDelete } from "react-icons/md";
import { TextFeaturesLib } from "../lib";
import { FaCopy } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

interface CBProps {
  textId: number,
  color?: 'light' | 'dark',
  size?: number,
}
const CopyButton: FC<CBProps> = ({ textId, color = 'light', size = 25 }) => {

  const { mutateAsync, isLoading, isError } = TextFeaturesLib.useCopyText(textId);

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
  color?: 'light' | 'dark',
  size?: number,
}
const UncopyButton: FC<UBProps> = ({ textId, color = 'light', size = 25 }) => {

  const { mutateAsync, isLoading, isError } = TextFeaturesLib.useUncopyText(textId);

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
  color?: 'light' | 'dark',
  size?: number,
}
const DeleteButton: FC<DBProps> = ({ textId, color = 'light', size = 25 }) => {

  const { mutateAsync, isLoading, isError } = TextFeaturesLib.useDeleteText(textId);

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