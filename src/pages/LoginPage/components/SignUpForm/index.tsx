import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { SignUpEmailStep } from './SignUpEmailStep';
import { SignUpPasswordStep } from './SignUpPasswordStep';

import useQueryApiClient from 'utils/useQueryApiClient';
import useJwt from 'utils/useJwt';
import { useUserDispatch } from 'contexts/UserContext';
import { Button } from 'ui';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SignInForm } from '../SignInForm';
import { getUserAllowedPages, getUserProfile } from 'utils/globalFunctions';
import { decodeToken } from 'react-jwt';
import { Page } from 'types/Page';
import { message } from 'antd';

type SignUpFormProps = {
  setCurrentForm: (value: number) => void;
};

type dataType = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  username?: string;
};

export const SignUpForm = ({ setCurrentForm }: SignUpFormProps) => {
  const intl = useIntl();
  const [searchparams, setSearchparams] = useSearchParams();
  const jobIdUrl = searchparams.get('job-id') ? Number(searchparams.get('job-id')) : null;
  const { dispatch: userDispatch } = useUserDispatch();
  const location = useLocation();
  const { set } = useJwt();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<dataType>({});
  const [messageInp, setMessage] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    userDispatch({
      type: 'SET_USER_DATA',
      payload: {
        email: '',
        id: 0,
      },
    });
  }, []);
  
  const onEmailStepFinish = async (values: any) => {
    if(jobIdUrl || (jobIdUrl === 0)){
      setSearchparams((params) => {
        params.delete('job-id'); 
        return params;
      });
    }
    
    setUserData((prevState) => ({
      ...prevState,
      email: values.email,
    }));

    userDispatch({
      type: 'SET_USER_DATA',
      payload: {
        email: values.email,
        id: 0,
      },
    });
    submitRegister(values);
  };

  const { isLoading, appendData: submitRegister } = useQueryApiClient({
    request: {
      url: 'api/auth/register',
      method: 'POST',
    },
    onSuccess: (response) => {
      if (response) {
        setMessage(
          <p>
            {intl.messages.verifyEmailMessageBefore && intl.formatMessage({ id: 'verifyEmailMessageBefore' })}&nbsp;
            <span className="user-email">{userData.email}</span>.&nbsp;
            {intl.messages.verifyEmailMessageAfter && intl.formatMessage({ id: 'verifyEmailMessageAfter' })}&nbsp;
          </p>
        );
      }
    },
    onError(error) {
      message.error(intl.messages[`${error.errors[0]}`] && intl.formatMessage({ id: error.errors[0] }));
    },
  });

  const { appendData: onPasswordStepFinish, isLoading: passwordIsLoading } = useQueryApiClient({
    request: {
      url: '/api/auth/complate/register',
      method: 'POST',
    },
    async onSuccess(response) {
      Cookies.remove('email');
      setCurrentForm(0);
    },
  });

  const steps = [
    <SignUpEmailStep onFinish={onEmailStepFinish} />,
    <SignUpPasswordStep
      onFinish={onPasswordStepFinish}
      isLoading={passwordIsLoading}
      setCurrentStep={setCurrentStep}
    />,
    <SignInForm setCurrentForm={setCurrentForm} />,
  ];

  useEffect(() => {
    const email = Cookies.get('email');
    if (email && email.length > 0) {
      setCurrentStep(1);
    }
  }, []);

  return (
    <div className="form">
      {!messageInp ? (
        <>
          {location.pathname === '/login/practice' ? (
            <h3 className="title-practice">
              {intl.messages.signUpTitlePractice && intl.formatMessage({ id: 'signUpTitlePractice' })}
            </h3>
          ) : location.pathname === '/login/trainings' ? (
            <h3 className="title-practice">
              {intl.messages.signUpTitleTrainings && intl.formatMessage({ id: 'signUpTitleTrainings' })}
            </h3>
          ) : location.pathname === '/login/create-cv' ? (
            <h3 className="title-practice">
              {intl.messages.singUpTitleCreateCv && intl.formatMessage({ id: 'singUpTitleCreateCv' })}
            </h3>
          ) : (
            <h2 className="title">{intl.messages.signUpTitle && intl.formatMessage({ id: 'signUpTitle' })}</h2>
          )}
        </>
      ) : (
        <h2 className="title-small">
          {intl.messages.emailVerification && intl.formatMessage({ id: 'emailVerification' })}
        </h2>
      )}

      {!messageInp && (
        <div className="subtitle">
          {intl.messages.haveAccount && intl.formatMessage({ id: 'haveAccount' })}&nbsp;
          <span className="link" onClick={() => setCurrentForm(0)}>
            {intl.messages.signIn && intl.formatMessage({ id: 'signIn' })}
          </span>
        </div>
      )}

      <div className="h-100">
        {!messageInp ? (
          steps[currentStep]
        ) : (
          <div className="flex">
            <div className="verify-email-msg">
              <p>
                {intl.messages.verifyEmailMessageBefore && intl.formatMessage({ id: 'verifyEmailMessageBefore' })}&nbsp;
                <span className="user-email">{userData.email}</span>.&nbsp;
                {intl.messages.verifyEmailMessageAfter && intl.formatMessage({ id: 'verifyEmailMessageAfter' })}&nbsp;
              </p>
            </div>

            <div className="form-footer">
              <div className="additionalInfo">
                {intl.messages.didntReceiveEmail && intl.formatMessage({ id: 'didntReceiveEmail' })}&nbsp;
                <span className="link" onClick={() => setCurrentForm(2)}>
                  {intl.messages.resend && intl.formatMessage({ id: 'resend' })}
                </span>
              </div>
              <Button
                label={intl.messages.continue && intl.formatMessage({ id: 'continue' })}
                type="primary"
                htmlType="submit"
                className="btn submit-btn primary-btn"
                onClick={() => setCurrentForm(0)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
