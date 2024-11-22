import React from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';
import { useLanguage } from '../contexts/LanguageContext';
import useSessionStorage from './useSessionStorage';
import { Spinner } from '../ui';

interface IntlProviderWrapperProps {
  children: React.ReactNode;
}

type Translations = Record<string, string> | Record<string, MessageFormatElement[]> | undefined;

const IntlProviderWrapper = ({ children }: IntlProviderWrapperProps) => {
  const { language } = useLanguage();
  const { value: translations } = useSessionStorage('translations'); // from api

  return (
    <>
      {translations ? (
        <IntlProvider locale={language} messages={translations as Translations}>
          {children}
        </IntlProvider>
      ) : (
        <div className="page-preloader">
          <Spinner spinning={true} />
        </div>
      )}
    </>
  );
};

export default IntlProviderWrapper;
