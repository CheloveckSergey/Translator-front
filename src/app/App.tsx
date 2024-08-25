import { FC, useEffect } from 'react';
import { AppRouter } from './router';
import './styles/styles.scss';
import axios from 'axios';
import { TranslatorResponse } from '../entities/word';

const App: FC = () => {

  // useEffect(() => {
  //   const options = {
  //     method: 'POST',
  //     url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
  //     params: {
  //       to: 'ru',
  //       'api-version': '3.0',
  //       profanityAction: 'NoAction',
  //       textType: 'plain'
  //     },
  //     headers: {
  //       'x-rapidapi-key': 'cd2dfebd2cmsh0163ccffc61b51ep10bf7bjsnbe47d2776186',
  //       'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
  //       'Content-Type': 'application/json'
  //     },
  //     data: [
  //       {
  //         Text: 'get',
  //       }
  //     ]
  //   };
    
  //   try {
  //     axios.request<TranslatorResponse>(options).then((response) => console.log(response));
  //     // return response.data[0].translations[0].text;
  //   } catch (error) {
  //     throw new Error('ХУЙНЯ В ТРАНСЛАТОРЕ')
  //   }
  // }, []);

  useEffect(() => {
    console.log(new Date(Date.now()))
  }, []);

  return (
    <div className="App" id='App'>
      <AppRouter />
    </div>
  )
}

export default App;
