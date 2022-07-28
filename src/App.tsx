
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import store from './app/store';
import theme from './app/theme';
import { Tournament } from './features/Tournament/Tournament';
import { PageRenderer } from './pages/PageRenderer';
import { ThemeProvider } from '@mui/material/styles';
import { PrintablePairings } from './features/Tournament/Printables/PrintablePairings';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistor = persistStore(store);

export const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AppContainer />}>
              <Route index element={<div>home</div>} />
              <Route
                path='about'
                element={<PageRenderer path='./About.md' />}
              />
              <Route path='tournament' element={<Tournament />} />
            </Route>
            <Route
                path='pairings'
                element={<PrintablePairings />}
              />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);