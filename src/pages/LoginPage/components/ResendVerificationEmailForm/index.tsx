import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Form } from 'antd';

import { Button, Input, Spinner } from 'ui';
import { useUserDispatch, useUserState } from 'contexts/UserContext';
import useQueryApiClient from 'utils/useQueryApiClient';
import { routes } from 'config/config';
import { useForm } from 'antd/lib/form/Form';

type ResendVerificationFormProps = {
  setCurrentForm: (value: number) => void;
};

export const ResendVerificationForm = ({ setCurrentForm }: ResendVerificationFormProps) => {
  const intl = useIntl();
  const { email } = useUserState();
  const dispatch = useUserDispatch();
  const [form] = useForm();
  const [userEmail, setUserEmail] = useState<React.ReactNode | null>(null);
  const [message, setMessage] = useState<React.ReactNode | null>(null);

  const { isLoading, appendData: resendVerificationEmail } = useQueryApiClient({
    request: {
      url: `api/auth/resend-verification`,
      method: 'POST',
      multipart: true,
    },
    onSuccess: (response) => {
      setMessage(
        <p>
          {intl.messages.resendVerifyEmailMessageBefore && intl.formatMessage({ id: 'resendVerifyEmailMessageBefore' })}&nbsp;
          <span className="user-email">{email}.</span>&nbsp;
          {intl.messages.verifyEmailMessageAfter && intl.formatMessage({ id: 'verifyEmailMessageAfter' })}&nbsp;
        </p>
      );
    },
    onError: (error) => {
      setMessage(
        <p>
          {intl.messages.emailIsVerifiedBefore && intl.formatMessage({ id: 'emailIsVerifiedBefore' })}&nbsp;
          <span className="user-email">{email}.</span>&nbsp;
          {intl.messages.emailIsVerifiedAfter && intl.formatMessage({ id: 'emailIsVerifiedAfter' })}&nbsp;
          <span className="link" onClick={() => setCurrentForm(0)}>
            {intl.messages.signIn && intl.formatMessage({ id: 'signIn' })}
          </span>
        </p>
      );
    },
  });

  const checkEmail = async (email: string) => {
    try {
      const response = await fetch(`${routes.api.baseUrl}/api/auth/CheckEmail?email=${email}`);
      return response.status === 200;
    } catch (err) {
      console.log('err', err);
    }
  };

  const onFinish = (values: any) => {
    setUserEmail(values.email);

    const data = new FormData();
    data.append('email', values.email);
    resendVerificationEmail(data);
  };

  const checkEmailValidator = async (rule: any, value: string, cb: (msg?: string) => void) => {
    const isEmailExist = await checkEmail(form.getFieldValue('email'));
    if (value && !isEmailExist) {
      return Promise.reject(new Error(`${intl.formatMessage({ id: 'error.accountDoesntExist' })}`));
    }
    return Promise.resolve();
  };

  return (
    <div className="form">
      <h2 className="title-small">{intl.messages.emailVerification && intl.formatMessage({ id: 'emailVerification' })}</h2>
      {!message && <div className="subtitle">{intl.messages.enterYourEmailtoSendVerification && intl.formatMessage({ id: 'enterYourEmailtoSendVerification' })}</div>}

      <div className="h-100">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="flex">
            {message && (
              <div className="verify-email-msg">
                <Spinner spinning={isLoading}>{!isLoading && message}</Spinner>
              </div>
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
                  hasFeedback
                  rules={[
                    {
                      type: 'email',
                      message: intl.formatMessage({ id: 'error.emailIsNotValid' }),
                    },
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'error.enterEmail' }),
                    },
                    {
                      validator: checkEmailValidator,
                    },
                  ]}
                />

                <div className="form-footer">
                  <div className="buttons">
                    <Button
                      label={intl.messages.back && intl.formatMessage({ id: 'back' })}
                      type="default"
                      className="back-btn"
                      onClick={() => setCurrentForm(0)}
                    />

                    <Button
                      label={intl.messages.resend && intl.formatMessage({ id: 'resend' })}
                      type="primary"
                      htmlType="submit"
                      className="btn submit-btn primary-btn"
                      loading={isLoading}
                    />
                  </div>
                </div>
              </>
            )}

            {message && (
              <div className="form-footer">
                <div className="additionalInfo">
                  {intl.messages.didntReceiveEmail && intl.formatMessage({ id: 'didntReceiveEmail' })}&nbsp;
                  <span className="link" onClick={() => setMessage(null)}>
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
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
