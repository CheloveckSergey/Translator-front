import { FC } from "react"
import { getUrlTextId } from "../../lib"
import { TextsLib } from "../../../../entities/text";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import './styles.scss';
import { TextFeaturesLib } from "../../../../features/texts";

interface HProps {
  refetchTextData: () => void,
}
export const Header: FC<HProps> = ({ refetchTextData }) => {

  const textId = getUrlTextId();

  const { data: meta, isLoading, isError } = TextsLib.useTextMeta(textId);

  const setPremiereMutation = TextFeaturesLib.useSetPremiere(textId);

  function onSetPremiere() {
    if (!meta) {
      return
    }
    setPremiereMutation.mutateAsync({ premiere: meta.premiere ? false : true })
    .then(() => {
      refetchTextData();
    })
  }

  return (
    <div className="text-header">
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
      >
        {meta && (
          <>
            <h1>{meta.name}</h1>
            <div className="chage-premiere-block">
              <span>
                {meta.premiere ? (
                  'This text has been publicated'
                ) : (
                  'This text has being edited'
                )}
              </span>
              <SharedButtons.SquareActionButton
                body={meta.premiere ? 'Edit' : 'Publicate'}
                onClick={onSetPremiere}
                isLoading={setPremiereMutation.isLoading}
                isError={setPremiereMutation.isError}
                color="green"
              />
            </div>
          </>
        )}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}