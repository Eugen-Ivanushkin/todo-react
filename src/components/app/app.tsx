import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'regenerator-runtime/runtime';

//components
import AppRouter from 'components/app-router';

//stylea
//@ts-ignore
import style from './style.module.css';

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
