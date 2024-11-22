import React, { useState } from 'react';
import { Form, Modal } from 'antd';
import { useIntl } from 'react-intl';

import { Button, Input } from 'ui';
import { TermsOfUseContent } from '../../TermsOfUseContent';
import Cookies from 'js-cookie';

type FormValues = {
  password: string;
  confirmPassword: string;
  email: string;
};

type SignUpPasswordStepProps = {
  onFinish: (values: FormValues) => void;
  isLoading?: boolean;
  setCurrentStep: (value: number) => void;
};
export const SignUpPasswordStep = ({ onFinish, isLoading, setCurrentStep }: SignUpPasswordStepProps) => {
  const intl = useIntl();

  const passwordValidator = async (rule: any, value: string, cb: (msg?: string) => void) => {
    if ((value && value.length < 8) || (value && value.length > 30)) {
      return Promise.reject(
        new Error(`${intl.messages['error.passwordLength'] && intl.formatMessage({ id: 'error.passwordLength' })}`)
      );
    }
    if (
      (value && !/[a-z]/.test(value)) ||
      (value && !/[A-Z]/.test(value)) ||
      (value && !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value))
    ) {
      return Promise.reject(
        new Error(
          `${intl.messages['error.passwordCharacters'] && intl.formatMessage({ id: 'error.passwordCharacters' })}`
        )
      );
    }
    return Promise.resolve();
  };

  const checkUserPassword = (value: any) => {
    const userEmail = Cookies.get('email');
    if (userEmail && userEmail.length > 0) onFinish({ password: value.password, confirmPassword: value.confirmPassword, email: userEmail });
  };

  return (
    <Form onFinish={checkUserPassword} layout="vertical">
      <div className="flex">
        <Input
          type="password"
          name="password"
          validateTrigger="onBlur"
          label={intl.messages.password && intl.formatMessage({ id: 'password' })}
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
          dependencies={['password']}
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: intl.messages['error.confirmPassword'] && intl.formatMessage({ id: 'error.confirmPassword' }),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    `${
                      intl.messages['error.passwordsDontMatch'] &&
                      intl.formatMessage({ id: 'error.passwordsDontMatch' })
                    }`
                  )
                );
              },
            }),
          ]}
          hasFeedback
          size="large"
          className="input"
        />

        <div className="form-footer">
          <div className="buttons">
            <Button
              label={intl.messages.back && intl.formatMessage({ id: 'back' })}
              type="default"
              className="back-btn"
              onClick={() => setCurrentStep(0)}
            />

            <Button
              label={intl.messages.send && intl.formatMessage({ id: 'send' })}
              type="primary"
              htmlType="submit"
              className="btn submit-btn primary-btn"
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
