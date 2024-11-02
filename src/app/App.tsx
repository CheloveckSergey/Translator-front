import { FC, useEffect } from 'react';
import { AppRouter } from './router';
import './styles/styles.scss';

const App: FC = () => {

  return (
    <div className="App" id='App'>
      <AppRouter />
    </div>
  )
}

export default App;
