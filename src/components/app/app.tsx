import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime';

//components
import AppRouter from 'components/app-router';
import NavBar from 'components/nav-bar/nav-bar';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
