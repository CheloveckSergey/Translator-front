import { FC } from "react";
import './styles.scss';

export const Translator: FC = () => {

  return (
    <div className="translator-page">
      <div className="main-content">
        <h1>Translator</h1>
        <p>
          Here you can translate a word or even text. Just write it in box on the left, and you can see
          translation on the right. You can also pick any word in the entered text to learn its translation
          or add it to studying.
        </p>
        <div className="boxes">
          <textarea 
            className="input-text"
          />
          <div className="outlet-text">

          </div>
        </div>
      </div>
    </div>
  )
}