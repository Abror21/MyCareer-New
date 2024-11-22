import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { decodeToken } from 'react-jwt';

import { Spinner } from 'ui';
import { StyledResetVerificationEmailPage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import useJwt from 'utils/useJwt';
import { getUserAllowedPages, getUserProfile } from '../../utils/globalFunctions';
import { useUserDispatch } from '../../contexts/UserContext';
import { Page } from '../../types/Page';

export const ResetVerificationEmailPage = () => {
  const intl = useIntl();
  const { set } = useJwt();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<React.ReactNode | null>(null);
  const { dispatch: userDispatch } = useUserDispatch();

  const { appendData: getLoginVerification } = useQueryApiClient({
    request: {
      url: `/api/auth/login-verification-code`,
      method: 'POST',
    },
    onSuccess: async (response) => {
      if (response.data) {
        set(response.data, 86400);
        // @ts-ignore
        const role = decodeToken(response.data)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        userDispatch({
          type: 'SET_USER_DATA',
          payload: { role },
        });

        const userProfile = await getUserProfile(response.data);
        const userAllowedPages = await getUserAllowedPages(response.data);

        if (userAllowedPages) {
          let allowedPages = userAllowedPages.map((page: Page) => page.page.key);

          userDispatch({
            type: 'SET_USER_DATA',
            payload: { allowedPages },
          });
        }

        if (userProfile?.freelancer) {
          userDispatch({
            type: 'SET_USER_DATA',
            payload: {
              id: userProfile.id,
              email: userProfile.email,
              image: userProfile.freelancer?.image?.resizedPath200 || userProfile.freelancer?.image?.path || '',
            },
          });
        }
        navigate('/reset-password');
      }
    },
    onError: (response) => {
      if (response.error === 'confirmation_time_has_expired') {
        setMessage(<p className="expired">{intl.messages['error.confirmation_time_has_expired'] && intl.formatMessage({ id: 'error.confirmation_time_has_expired' })}</p>);
      }
      if (response.error === 'invalid_email_or_code') {
        setMessage(<p className="expired">{intl.messages['error.linkIsNotValid'] && intl.formatMessage({ id: 'error.linkIsNotValid' })}</p>);
      }
    },
  });

  useEffect(() => {
    getLoginVerification({ code: searchParams.get('code'), email: searchParams.get('email') });
  }, []);

  return (
    <StyledResetVerificationEmailPage>
      {message ? message : <Spinner spinning={isLoading}></Spinner>}
    </StyledResetVerificationEmailPage>
  );
};
