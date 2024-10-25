import { FC, useEffect } from 'react';
import { AppRouter } from './router';
import './styles/styles.scss';
import axios from 'axios';

const App: FC = () => {

  // useEffect(() => {
  //   const options = {
  //     method: 'POST',
  //     url: 'https://ai-translate.p.rapidapi.com/translate',
  //     headers: {
  //       'x-rapidapi-key': 'cd2dfebd2cmsh0163ccffc61b51ep10bf7bjsnbe47d2776186',
  //       'x-rapidapi-host': 'ai-translate.p.rapidapi.com',
  //       'Content-Type': 'application/json'
  //     },
  //     data: {
  //       texts: [
  //         'table',
  //       ],
  //       tl: 'ru',
  //       sl: 'en'
  //     }
  //   };

  //   console.log('go');
  //   const response = axios.request(options).then(console.log);
  // }, []);

  return (
    <div className="App" id='App'>
      <AppRouter />
    </div>
  )
}

export default App;
