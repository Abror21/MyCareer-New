import React, { useState } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';

import { Button, Input, Spinner } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

export const ResetPasswordForm = () => {
  const intl = useIntl();
  const [message, setMessage] = useState<React.ReactNode | null>(null);
  const navigate = useNavigate();

  const { isLoading, appendData: submitPasswordReset } = useQueryApiClient({
    request: {
      url: `/api/auth/password`,
      method: 'PATCH',
    },
    onSuccess: (response) => {
      setMessage(<p>{intl.messages.passwordResetSuccess && intl.formatMessage({ id: 'passwordResetSuccess' })}&nbsp;</p>);
    },
  });

  const onFinish = (values: FormValues) => {
    submitPasswordReset(values);
  };

  const passwordValidator = async (rule: any, value: string, cb: (msg?: string) => void) => {
    if ((value && value.length < 8) || (value && value.length > 30)) {
      return Promise.reject(new Error(`${intl.messages['error.passwordLength'] && intl.formatMessage({ id: 'error.passwordLength' })}`));
    }
    if (
      (value && !/[a-z]/.test(value)) ||
      (value && !/[A-Z]/.test(value)) ||
      (value && !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value))
    ) {
      return Promise.reject(new Error(`${intl.messages['error.passwordCharacters'] && intl.formatMessage({ id: 'error.passwordCharacters' })}`));
    }
    return Promise.resolve();
  };

  return (
    <div className="form">
      <h2 className="title">{intl.messages.passwordReset && intl.formatMessage({ id: 'passwordReset' })}</h2>
      {!message && <div className="subtitle">{intl.messages.createNewPassword && intl.formatMessage({ id: 'createNewPassword' })}&nbsp;</div>}

      <div className="h-100">
        <Form onFinish={onFinish} layout="vertical">
          <div className="flex">
            {message && (
              <>
                <div className="verify-email-msg">
                  <Spinner spinning={isLoading}>{!isLoading && message}</Spinner>
                </div>

                <div className="form-footer">
                  <Button
                    label={intl.messages.continue && intl.formatMessage({ id: 'continue' })}
                    type="primary"
                    className="btn submit-btn primary-btn"
                    onClick={() => navigate('/')}
                  />
                </div>
              </>
            )}

            {!message && (
              <>
                <Input
                  type="password"
                  name="newPassword"
                  validateTrigger="onBlur"
                  label={intl.messages.newPassword && intl.formatMessage({ id: 'newPassword' })}
                  rules={[
                    {
                      required: true,
                      message: intl.messages['error.enterPassword'] && intl.formatMessage({ id: 'error.enterPassword' }),
                    },
                    {
                      validator: passwordValidator,
                    },
                  ]}
                  hasFeedback
                  size="large"
                  className="input"
                />

                <Input
                  type="password"
                  label={intl.messages.confirmPassword && intl.formatMessage({ id: 'confirmPassword' })}
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: true,
                      message: intl.messages['error.confirmPassword'] && intl.formatMessage({ id: 'error.confirmPassword' }),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(`${intl.messages['error.passwordsDontMatch'] && intl.formatMessage({ id: 'error.passwordsDontMatch' })}`));
                      },
                    }),
                  ]}
                  hasFeedback
                  size="large"
                  className="input"
                />

                <div className="form-footer">
                  <Button
                    label={intl.messages.send && intl.formatMessage({ id: 'send' })}
                    type="primary"
                    htmlType="submit"
                    className="btn submit-btn primary-btn"
                  />
                </div>
              </>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
