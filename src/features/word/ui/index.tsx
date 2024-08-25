import { FC } from "react";
import { SharedButtons } from "../../../shared/sharedUi/buttons";
import { WordFeaturesLib } from "../lib";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareCheck } from "react-icons/ci";

interface ATPBProps {
  value: string,
  addToProcess: () => void,
  size?: number,
}
const AddToProcessButton: FC<ATPBProps> = ({ value, addToProcess, size=60 }) => {

  const { mutateAsync, isLoading, isError } = WordFeaturesLib.useAddToProcess(value, addToProcess);

  return (
    <SharedButtons.TextActionButton 
      body={<CiSquarePlus size={size} />}
      isLoading={isLoading}
      isError={isError}
      color="dark"
      className=""
      onClick={() => mutateAsync()}
    />
  )
}

interface DTSBProps {
  value: string,
  deleteToStudied: () => void,
  size?: number,
}
const DeleteToStudiedButton: FC<DTSBProps> = ({ value, deleteToStudied, size=60 }) => {

  const { mutateAsync, isLoading, isError } = WordFeaturesLib.useDeleteToStudied(value, deleteToStudied);

  return (
    <SharedButtons.TextActionButton 
      body={<CiSquareCheck size={size} />}
      isLoading={isLoading}
      isError={isError}
      color="dark"
      className=""
      onClick={() => mutateAsync()}
    />
  )
}

export const WordFeaturesUi = {
  AddToProcessButton,
  DeleteToStudiedButton,
}