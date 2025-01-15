import { FC } from "react";
import { ShortTextPreview } from "../../model/types/shortTextPreview";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import './styles.scss'
import { useNavigate } from "react-router-dom";

interface STPCProps {
  text: ShortTextPreview,
}
export const ShortTextPreviewCard: FC<STPCProps> = ({ text }) => {

  const navigate = useNavigate();

  return (
    <div className="short-text-preview">
      <h5 className="login">{text.author.login}</h5>
      <p 
        className="text-name"
        onClick={() => navigate('/texts/' + text.id)}
      >
        {text.name}
      </p>
    </div>
  )
}

const Sceleton: FC = () => {

  return (
    <div className="sceleton">
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  )
}

interface STPLProps {
  texts: ShortTextPreview[],
  isLoading: boolean,
  isError: boolean,
  mapText: (text: ShortTextPreview, key: number) => React.ReactNode,
  className?: string,
}
export const ShortTextPreviewsList: FC<STPLProps> = ({ texts, isLoading, isError, mapText, className }) => {

  return (
    <div className={["short-text-previews-list", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
        loadingSceleton={<Sceleton />}
        isEmpty={!texts.length}
        emptyHolder='No texts last time'
      >
        <div className="content">
          {texts.map(mapText)}
        </div>
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}