
import './App.css';
import './shared/forms/TraducaoYup'
import { AppRouts } from './routes';
import { AppThemeProvider } from './shared/contexts/themeContext';
import { Login, MenuLateral } from './shared/components'
import { AuthProvider, DrawerProvider } from './shared/contexts';
import { IconeProvider } from './shared/contexts/IconeContexts';
import { setupIonicReact } from '@ionic/react';


setupIonicReact();
export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>

        <Login>

          <DrawerProvider>
            <IconeProvider>

              <MenuLateral>
                  <AppRouts></AppRouts>
              </MenuLateral>
            </IconeProvider>
          </DrawerProvider>

        </Login>
        
      </AppThemeProvider>
    </AuthProvider>
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