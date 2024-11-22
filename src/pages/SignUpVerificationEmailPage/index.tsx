import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { Spinner } from 'ui';
import { StyledSignUpVerificationEmailPage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import Cookies from 'js-cookie';
import { routes } from 'config/config';

export const SignUpVerificationEmailPage = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<React.ReactNode | null>(null);

  const { appendData: getSignUpVerification } = useQueryApiClient({
    request: {
      url: `/api/auth/verify-email`,
      method: 'POST',
    },
    onSuccess: (response) => {
      const email = response?.data?.split('=')[1];
      if (response?.data?.split('&')[0] === 'email_is_already_confirmed') {
        Cookies.remove('email', email);
        navigate('/login');
      } else {
        Cookies.set('email', email);
        navigate('/login');
      }
    },
    onError: (response) => {
      if (response.error === 'verification_is_invalid') {
        setMessage(
          <p className="expired">
            {intl.messages['error.verification_is_invalid'] &&
              intl.formatMessage({ id: 'error.verification_is_invalid' })}
          </p>
        );
      }
      if (response.error === 'confirmation_time_has_expired') {
        setMessage(
          <p className="expired">
            {intl.messages['error.confirmation_time_has_expired'] &&
              intl.formatMessage({ id: 'error.confirmation_time_has_expired' })}
          </p>
        );
      }
      if (response.error === 'email_is_not_confirmed') {
        setMessage(
          <p className="expired">
            {intl.messages['error.linkIsNotValid'] && intl.formatMessage({ id: 'error.linkIsNotValid' })}
          </p>
        );
      }
    },
  });

  useEffect(() => {
    getSignUpVerification({ code: searchParams.get('code'), email: searchParams.get('email') });
  }, []);

  return (
    <StyledSignUpVerificationEmailPage>
      {message ? message : <Spinner spinning={isLoading}></Spinner>}
    </StyledSignUpVerificationEmailPage>
  );
};
