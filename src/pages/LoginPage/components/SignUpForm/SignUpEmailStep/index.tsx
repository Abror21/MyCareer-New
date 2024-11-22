import React, {  useState } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import { useForm } from 'antd/lib/form/Form';

import { Input, Button } from 'ui';
import { emailRegex, checkEmail } from 'utils/globalFunctions';

type FormValues = {
  email: string;
  name?: string;
};

type SignUpEmailStepProps = {
  onFinish: (values: FormValues) => void;
};

export const SignUpEmailStep = ({ onFinish }: SignUpEmailStepProps) => {


  const intl = useIntl();
  const [form] = useForm();


  const emailValidator = async (rule: any, value: string, cb: (msg?: string) => void) => {
    if (value && value.length > 50) {
      return Promise.reject(new Error(`${intl.messages['error.emailIsTooLong'] && intl.formatMessage({ id: 'error.emailIsTooLong' })}`));
    }
    if (value && !emailRegex.test(value)) {
      return Promise.reject(new Error(`${intl.messages['error.emailIsNotValid'] && intl.formatMessage({ id: 'error.emailIsNotValid' })}`));
    }
    if (value) {
      const isEmailExist = await checkEmail(value);

      if (isEmailExist) {
        return Promise.reject(new Error(`${intl.messages['error.emailIsTaken'] && intl.formatMessage({ id: 'error.emailIsTaken' })}`));
      }
    }
    return Promise.resolve();
  };

  return (
    <Form onFinish={onFinish} layout="vertical" form={form}>
      <div className="flex">
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
              required: true,
              message: intl.messages['error.enterEmail'] && intl.formatMessage({ id: 'error.enterEmail' }),
            },
            {
              validator: emailValidator,
            },
          ]}
          maxLength={50}
        />

        <div className="form-footer">
          <Button
            label={intl.messages.continue && intl.formatMessage({ id: 'continue' })}
            type="primary"
            htmlType="submit"
            className={`submit-btn btn submit-btn primary-btn`}
          />
        </div>
      </div>
    </Form>
  );
};
