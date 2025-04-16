import { FC } from "react"
import { SharedButtons } from "../../../shared/sharedUi/buttons"
import { MdDelete } from "react-icons/md";
import { TextFeaturesLib } from "../lib";
import { FaCopy } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { GTextPreviewsQuery, TextPreviewsQuery } from "../../../entities/text";

interface CBProps {
  textId: number,
  query: GTextPreviewsQuery,
  color?: 'light' | 'dark',
  size?: number,
}
const CopyButton: FC<CBProps> = ({ textId, query, color = 'light', size = 25 }) => {

  const { mutateAsync, isPending, isError } = TextFeaturesLib.useCopyText(textId, query);

  return (
    <SharedButtons.TextActionButton
      body={<FaCopy size={size} />}
      isLoading={isPending}
      isError={isError}
      color={color}
      onClick={mutateAsync}
      className=""
    />
  )
}

interface UBProps {
  textId: number,
  query: GTextPreviewsQuery,
  color?: 'light' | 'dark',
  size?: number,
}
const UncopyButton: FC<UBProps> = ({ textId, query, color = 'light', size = 25 }) => {

  const { mutateAsync, isPending, isError } = TextFeaturesLib.useUncopyText(textId, query);

  return (
    <SharedButtons.TextActionButton
      body={<FaDeleteLeft size={size} />}
      isLoading={isPending}
      isError={isError}
      color={color}
      onClick={mutateAsync}
      className=""
    />
  )
}

interface DBProps {
  textId: number,
  query: GTextPreviewsQuery,
  color?: 'light' | 'dark',
  size?: number,
}
const DeleteButton: FC<DBProps> = ({ textId, query, color = 'light', size = 25 }) => {

  const { mutateAsync, isPending, isError } = TextFeaturesLib.useDeleteText(textId, query);

  return (
    <SharedButtons.TextActionButton
      body={<MdDelete size={size} />}
      isLoading={isPending}
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