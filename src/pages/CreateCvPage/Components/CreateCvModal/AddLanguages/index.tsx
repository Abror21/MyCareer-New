import { StyledAddLanguages } from './style';
import { AddLanguagesListItem } from './AddLanguagesListItem';
import { UserLanguageInterface, useLanguageContext } from 'contexts/CreateCvContext/UserLanguageContext';
import { useIntl } from 'react-intl';
import SvgSelector from 'assets/icons/SvgSelector';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Spinner } from 'ui';
import { useEffect, useState } from 'react';
import { useFreelancerDataContext } from 'contexts/CreateCvContext/FreelancerData';
import { useSearchParams } from 'react-router-dom';

interface Props {
  languageValidation: any;
  setLanguageValidation: React.Dispatch<React.SetStateAction<boolean | null>>
}
export const AddLanguages = ({ languageValidation, setLanguageValidation }: Props) => {
  const intl = useIntl();
  const [searchparams, setSearchparams] = useSearchParams();
  const addUser = searchparams.get('add-user') ? searchparams.get('add-user') : null;
  const { state, dispatch } = useLanguageContext();
  const { state: freelancerDataState } = useFreelancerDataContext();
  const [language, setLanguage] = useState<UserLanguageInterface | undefined>();
  const initialUserLang = { id: new Date().getMilliseconds(), languageId: 0 };
  const { data: apiLanguage, isLoading } = useQueryApiClient({
    request: { url: '/api/language', method: 'GET' },
  });

  const isLastLanguageValid = () => {
    if (state.userlanguage.length === 0) {
      return true;
    }
    const lastLanguage = state.userlanguage[state.userlanguage.length - 1];
    setLanguage(lastLanguage);
    return lastLanguage && lastLanguage.languageId && lastLanguage.level;
  };
  const handleAddUserLanguage = () => {
    if (!isLastLanguageValid()) {
      return;
    }
    setLanguageValidation(true);
    dispatch({
      type: 'ADD_LANGUAGE',
      payload: initialUserLang,
    });
  };

  useEffect(() => {
    if (freelancerDataState.data?.languages) {
      const userLangauges = freelancerDataState.data?.languages.map((item) => ({
        level: item.level,
        languageId: item?.language?.id,
        id: item.id,
      }));
      if (addUser != 'mount') {
        dispatch({ type: 'SET_LANGUAGE', payload: userLangauges });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freelancerDataState.data]);

  useEffect(() => {
    if (!languageValidation) {
      isLastLanguageValid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageValidation]);

  const handleEditLanguage = (selectedLanguage: any) => {
    dispatch({ type: 'UPDATE_LANGUAGE', payload: selectedLanguage });
  };

  const handleDeleteLanguage = (item: any) => {
    dispatch({ type: 'DELETE_LANGUAGE', payload: item.id });
    if (state?.userlanguage.length <= 1) {
      dispatch({
        type: 'ADD_LANGUAGE',
        payload: initialUserLang,
      });
    }
  };

  if (isLoading) {
    return <Spinner children="loading..." spinning={true} />;
  }
  return (
    <StyledAddLanguages>
      <div className="title">
        <h2>
          <span>*</span>
          {intl.messages.language && intl.formatMessage({ id: 'language' })}
        </h2>
        <h2>
          <span>*</span>
          {intl.messages.level && intl.formatMessage({ id: 'level' })}
        </h2>
      </div>
      <div className="selected-language-list">
        {state?.userlanguage?.map((item) => {
          return (
            <div key={item.id}>
              <AddLanguagesListItem
                apiLanguage={apiLanguage}
                item={item}
                handleEditLanguage={handleEditLanguage}
                handleDeleteLanguage={handleDeleteLanguage}
                lastLanguage={language}
              />
            </div>
          );
        })}
      </div>
      {state.userlanguage.length !== 4 && (
        <div className="add-language-btn" onClick={handleAddUserLanguage}>
          <SvgSelector id="plus-svg" />
          <span>{intl.messages.addLanguageBtn && intl.formatMessage({ id: 'addLanguageBtn' })}</span>
        </div>
      )}
    </StyledAddLanguages>
  );
};
