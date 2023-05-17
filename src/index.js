import './index.css';
import React from 'react';
import Nav from './components/Nav';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './routes/public';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthGoogleProvider } from './contexts/authGoogle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthGoogleProvider>
        <div className="h-screen flex flex-col">
          <Nav />
          <AppRoutes />
        </div>
      </AuthGoogleProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
