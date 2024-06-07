import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles/global';
import { ThemeProvider } from 'styled-components';
import { Routes } from './routes';
import theme from './styles/theme';

import { MyContext } from "./MyContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ThemeProvider theme={theme}>

      <GlobalStyles/>
      
      <MyContext.Provider value = {{ name : "diogo"}}>

        <Routes />

      </MyContext.Provider>

    </ThemeProvider>

  </React.StrictMode>,
)
