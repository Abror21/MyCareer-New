import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { Button, Input, Spinner } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useForm } from 'antd/lib/form/Form';
import { useUserDispatch, useUserState } from 'contexts/UserContext';
import { routes } from 'config/config';
import { Form } from 'antd';
import axios from 'axios';

type SendResetPasswordEmailProps = {
  setCurrentForm: (value: number) => void;
};

export const SendResetPasswordEmailForm = ({ setCurrentForm }: SendResetPasswordEmailProps) => {
  const intl = useIntl();
  const dispatch = useUserDispatch();
  const [form] = useForm();
  const userState = useUserState();
  const [message, setMessage] = useState<React.ReactNode | null>(null);
  const [isVerified, setIsVerified] = useState(true);

  const { isLoading, appendData: sendLoginVerificationEmail } = useQueryApiClient({
    request: {
      url: 'api/auth/send-login-verification-email',
      method: 'POST',
      multipart: true,
    },
    onSuccess: (response) => {
      if (response) {
        setMessage(
          <div className="recover-message">
            <p>{intl.messages.recoveryEmailSentMessagePart1 && intl.formatMessage({ id: 'recoveryEmailSentMessagePart1' })}</p>
            <p>{intl.messages.recoveryEmailSentMessagePart2 && intl.formatMessage({ id: 'recoveryEmailSentMessagePart2' })}</p>
          </div>
        );
      }
    },
  });

  const checkEmail = async (email: string) => {
    try {
      const response = await fetch(`${routes.api.baseUrl}/api/auth/CheckEmail?email=${email}`);
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  const isEmailVerified = async (email: string) => {
    try {
      const response = await axios.get(`${routes.api.baseUrl}/api/auth/check-email-verification/${email}`);
      return response.data.data === true;
    } catch (err) {
      console.log('err', err);
    }
  };

  const onFinish = async (values: any) => {
    if (await checkEmail(values.email)) {
      if (await isEmailVerified(values.email)) {
        setIsVerified(true);

        const data = new FormData();
        data.append('email', values.email);
        sendLoginVerificationEmail(data);
        return;
      } else {
        setIsVerified(false);
        form.setFields([
          {
            name: 'email',
            errors: [intl.messages['error.emailIsNotVerified'] && intl.formatMessage({ id: 'error.emailIsNotVerified' })],
          },
        ]);
        return;
      }
    }

    form.setFields([
      {
        name: 'email',
        errors: [intl.messages['error.accountDoesntExist'] && intl.formatMessage({ id: 'error.accountDoesntExist' })],
      },
    ]);
  };

  return (
    <div className="form">
      <h2 className="title-small">{intl.messages.passwordReset && intl.formatMessage({ id: 'passwordReset' })}</h2>
      {!message && <div className="subtitle">{intl.messages.resetPasswordMessage && intl.formatMessage({ id: 'resetPasswordMessage' })}&nbsp;</div>}

      <div className="h-100">
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <div className="flex">
            {message && (
              <>
                <div className="verify-email-msg">
                  <Spinner spinning={isLoading}>{!isLoading && message}</Spinner>
                </div>

                <div className="form-footer">
                  <div className="additionalInfo">
                    {intl.messages.didntReceiveEmail && intl.formatMessage({ id: 'didntReceiveEmail' })}&nbsp;
                    <span className="link" onClick={() => setMessage(null)}>
                      {intl.messages.resend && intl.formatMessage({ id: 'resend' })}
                    </span>
                  </div>
                </div>
              </>
            )}

            {!message && (
              <>
                <Input
                  label={intl.messages.email && intl.formatMessage({ id: 'email' })}
                  name="email"
                  size="large"
                  className="input"
                  placeholder={intl.messages.email && intl.formatMessage({ id: 'email' })}
                  validateTrigger="onBlur"
                  rules={[
                    {
                      type: 'email',
                      message: intl.messages['error.emailIsNotValid'] && intl.formatMessage({ id: 'error.emailIsNotValid' }),
                    },
                    {
                      required: true,
                      message: intl.messages['error.enterEmail'] && intl.formatMessage({ id: 'error.enterEmail' }),
                    },
                  ]}
                />

                <div className="form-footer">
                  {!isVerified && (
                    <div className="additionalInfo">
                      {intl.messages.didntReceiveEmail && intl.formatMessage({ id: 'didntReceiveEmail' })}&nbsp;
                      <span className="link" onClick={() => setCurrentForm(2)}>
                        {intl.messages.resend && intl.formatMessage({ id: 'resend' })}
                      </span>
                    </div>
                  )}

                  <div className="buttons">
                    <Button
                      label={intl.messages.back && intl.formatMessage({ id: 'back' })}
                      type="default"
                      className="back-btn"
                      onClick={() => setCurrentForm(0)}
                    />

                    <Button
                      label={intl.messages.recover && intl.formatMessage({ id: 'recover' })}
                      type="primary"
                      htmlType="submit"
                      className="btn submit-btn primary-btn"
                      loading={isLoading}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
