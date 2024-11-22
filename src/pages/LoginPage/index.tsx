import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { StyledLoginPage } from './style';
import { BackButton, Button, Modal } from 'ui';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { ResendVerificationForm } from './components/ResendVerificationEmailForm';
import { SendResetPasswordEmailForm } from './components/SendResetPasswordEmailForm';
import { smoothScroll } from 'utils/globalFunctions';
import { TermsOfUseContent } from './components/TermsOfUseContent';
import Cookies from 'js-cookie';

export const LoginPage = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const [scrollBottom, setScrollBottom] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (
      location.pathname === '/login/practice' ||
      location.pathname === '/login/trainings' ||
      location.pathname === '/login/create-cv'
    ) {
      setCurrentForm(1);
      smoothScroll('top', 0);
    }
  }, []);

  const forms = [
    <SignInForm setCurrentForm={setCurrentForm} />,
    <SignUpForm setCurrentForm={setCurrentForm} />,
    <ResendVerificationForm setCurrentForm={setCurrentForm} />,
    <SendResetPasswordEmailForm setCurrentForm={setCurrentForm} />,
  ];

  const handleAccept = () => {
    if (!scrollBottom) {
      return;
    }
    setIsShow(false);
    setIsTermsChecked(true);
    setCurrentForm(1);
  };

  useEffect(() => {
    const email = Cookies.get('email');
    if (email && email.length > 0) {
      setUserId(email);
      setIsShow(true);
      setCurrentForm(1);
    }
  }, []);

  return (
    <StyledLoginPage>
      <div className="form-wrapper">
        <div className="home-link">
          <Modal
            title={intl.messages.termsOfUse && intl.formatMessage({ id: 'termsOfUse' })}
            open={isShow}
            onOk={handleAccept}
            footer={[
              <Button
                disabled={!scrollBottom}
                key="ok"
                onClick={handleAccept}
                label={intl.messages.accept && intl.formatMessage({ id: 'accept' })}
                type="primary"
                className="submit-btn btn submit-btn primary-btn"
              />,
            ]}
            zIndex={3000}
            closable={false}
          >
            <TermsOfUseContent setScrollBottom={setScrollBottom} />
          </Modal>
          <BackButton
            label={intl.messages.home && intl.formatMessage({ id: 'home' })}
            color="green"
            onClick={() => navigate('/')}
          />
        </div>
        {forms[currentForm]}
      </div>
    </StyledLoginPage>
  );
};
