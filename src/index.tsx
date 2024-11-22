import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { UserProvider } from 'contexts/UserContext';
import { ThemeSwitchProvider } from 'contexts/ThemeSwitchContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { FreelancerDataProvider } from 'contexts/CreateCvContext/FreelancerData';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeSwitchProvider>
    <UserProvider>
      <LanguageProvider>
        <FreelancerDataProvider>
          <App />
        </FreelancerDataProvider>
      </LanguageProvider>
    </UserProvider>
  </ThemeSwitchProvider>
);
