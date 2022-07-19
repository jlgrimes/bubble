import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store';
import { Tournament } from './features/Tournament/Tournament';
import { PageRenderer } from './pages/PageRenderer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div>home</div>} />
          <Route path="about" element={<PageRenderer path='./About.md' />} />
          <Route path="tournament" element={<Tournament />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
