import { useIntl } from 'react-intl';
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

import { Button, Input } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import useJwt from 'utils/useJwt';
import { useUserDispatch } from 'contexts/UserContext';
import { getUserAllowedPages, getUserProfile, openNotification } from 'utils/globalFunctions';
import { Page } from 'types/Page';
import React, { useState } from 'react';
import { useLanguage } from 'contexts/LanguageContext';

type SignInFormProps = {
  setCurrentForm: (value: number) => void;
};

export const SignInForm = ({ setCurrentForm }: SignInFormProps) => {
  const [searchparams, setSearchparams] = useSearchParams();

  const jobId = searchparams.get('job-id') ? Number(searchparams.get('job-id')) : null;

  const intl = useIntl();
  const { set } = useJwt();
  const navigate = useNavigate();
  const [form] = useForm();
  const { dispatch: userDispatch } = useUserDispatch();
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const {language} = useLanguage()

  const { isLoading, appendData: submitLogin } = useQueryApiClient({
    request: {
      url: 'api/auth/login',
      method: 'POST',
    },
    onSuccess: async (response) => {
      if (response.data.token) {
        set(response.data.token, 86400);
        // @ts-ignore
        const role = decodeToken(response.data.token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        userDispatch({
          type: 'SET_USER_DATA',
          payload: { role, id: response?.data?.user?.id, isUploadCv: response?.data?.user?.isUploadCv },
        });
        
        const userProfile = await getUserProfile(response.data.token);
        const userAllowedPages = await getUserAllowedPages(response.data.token);

        if (userAllowedPages) {
          let allowedPages = userAllowedPages.map((page: Page) => page.page.key);
          userDispatch({
            type: 'SET_USER_DATA',
            payload: { allowedPages, firstName: userProfile?.freelancer?.firstName },
          });

          if (role === 'SuperAdmin') {
            if(jobId || jobId == 0){
              navigate(`/jobs?job-id=${jobId}`);
            }else {
              navigate('/admin');
            }
            return;
          }

          if (role.toLowerCase().includes('admin'.toLowerCase())) {
            for (const page of allowedPages) {
              let navigated = false;
              if(jobId || jobId == 0){
                navigate(`/jobs?job-id=${jobId}`);
                return;
              }
              
              switch (page) {
                case 'system_administration':
                  navigate('/admin');
                  navigated = true;
                  break;
                case 'cms_translation':
                  navigate('/admin/translations');
                  navigated = true;
                  break;
                case 'log_files':
                  navigate('/admin/logs');
                  navigated = true;
                  break;
                case 'user_permission':
                  navigate('/admin/permissions');
                  navigated = true;
                  break;
                case 'telegram_logs':
                  navigate('/admin/telegram-logs');
                  navigated = true;
                  break;
              }

              if (navigated) {
                return;
              }
            }
          }
        }

        if (userProfile?.freelancer) {
          userDispatch({
            type: 'SET_USER_DATA',
            payload: {
              id: userProfile?.id,
              email: userProfile.email,
              image: userProfile.freelancer?.image?.resizedPath200 || userProfile.freelancer?.image?.path || '',
              isUploadCv: userProfile.isUploadCv,
              firstName: userProfile?.freelancer?.firstName
            },
          });
          if(jobId || jobId == 0){
            navigate(`/jobs?job-id=${jobId}`);
          }else{
            navigate('/profile');
          }

        } else {
          if(jobId || jobId == 0){
            navigate(`/jobs?job-id=${jobId}`);
          }else{
            navigate('/create-cv');
          }
        }
      }
    },
    onError: (error) => {
      if (error.error === 'please_verify_your_email_address') {
        form.setFields([
          {
            name: 'email',
            errors: [`${intl.messages['error.verifyEmail'] && intl.formatMessage({ id: 'error.verifyEmail' })}`],
          },
        ]);
      }
      if (error.error === 'login_or_password_is_incorrect') {
        form.setFields([
          {
            name: 'email',
            errors: [`${intl.messages['error.emailOrPasswordWrong'] && intl.formatMessage({ id: 'error.emailOrPasswordWrong' })}`],
          },
          {
            name: 'password',
            errors: [`${intl.messages['error.emailOrPasswordWrong'] && intl.formatMessage({ id: 'error.emailOrPasswordWrong' })}`],
          },
        ]);
      }
      if (error.error === 'access_denied') {
        form.setFields([
          {
            name: 'email',
            errors: [`${intl.messages['error.access_denied'] && intl.formatMessage({ id: 'error.access_denied' })}`],
          },
        ]);
      }
      if (error.error === 'too_many_requests_please_try_again_later') {
        openNotification('error', intl.formatMessage({ id: "too_many_requests_please_try_again_later" }));
        setDisabledBtn(true);
      }
    },
  });

  const onFinish = (values: any) => {
    userDispatch({
      type: 'SET_USER_DATA',
      payload: {
        email: values.email,
        id: 0,
      },
    });
    submitLogin(values);
  };

  setTimeout(() => {
    setDisabledBtn(false);
  }, 300000);

  return (
    <div className="form">
      <h2 className="title">{intl.messages.signIn && intl.formatMessage({ id: 'signIn' })}</h2>
      <div className="subtitle">
        <p>
          {intl.messages.dontHaveAccount && intl.formatMessage({ id: 'dontHaveAccount' })}&nbsp;
          <span onClick={() => language !== "uz" && setCurrentForm(1)} className={`${language !== "uz" && "link"}`} >
            {intl.messages.signUp && intl.formatMessage({ id: 'signUp' })}
          </span>
          &nbsp;{intl.messages.now && <span onClick={() => language === "uz" && setCurrentForm(1)} className={`${language === "uz" && "link"}`}>{intl.formatMessage({ id: 'now' }) }</span>}
        </p>
      </div>

      <div className="h-100">
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <div className="flex">
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
                  message: intl.messages['error.enterEmail'] &&  intl.formatMessage({ id: 'error.enterEmail' }),
                },
              ]}
              maxLength={50}
            />

            <Input
              type="password"
              name="password"
              validateTrigger="onBlur"
              label={intl.messages.password && intl.formatMessage({ id: 'password' })}
              placeholder={intl.messages.password && intl.formatMessage({ id: 'password' })}
              rules={[
                {
                  required: true,
                  message: intl.messages['error.enterPassword'] && intl.formatMessage({ id: 'error.enterPassword' }),
                },
              ]}
              size="large"
              className="input"
            />

            <div className="form-footer">
              <div className="additionalInfo">
                {intl.messages.forgotPassword && intl.formatMessage({ id: 'forgotPassword' })}&nbsp;
                <span className="link" onClick={() => setCurrentForm(3)}>
                  {intl.messages.clickHere && intl.formatMessage({ id: 'clickHere' })}
                </span>
              </div>

              <Button
                disabled={disabledBtn}
                label={intl.messages.continue && intl.formatMessage({ id: 'continue' })}
                type="primary"
                htmlType="submit"
                className="btn submit-btn primary-btn"
                loading={isLoading}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
