import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouts } from './routes';
import { AppThemeProvider} from './shared/contexts/themeContext';

export const App = () => {
  return (
      <AppThemeProvider>
          <BrowserRouter>
              <AppRouts></AppRouts>
          </BrowserRouter>
      </AppThemeProvider>
  );
}

/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> 
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://www.dbschenker.com/br-pt"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/