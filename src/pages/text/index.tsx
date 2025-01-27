import { FC } from "react";
import './styles.scss';
import { TextsBox } from "./box";


export const TextPage: FC = () => {

  return (
    <div className="text-page">
      <div className="main-content">
        <h1>Text</h1>
        <p>Here you can read and study a text</p>
        <TextsBox />
      </div>
    </div>
  )
}