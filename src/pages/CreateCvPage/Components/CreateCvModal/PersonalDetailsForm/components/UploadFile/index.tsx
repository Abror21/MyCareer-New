import { Form, message, Popconfirm, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from 'ui';
import { checkEmail, transformFileData } from 'utils/globalFunctions';
import useQueryApiClient from 'utils/useQueryApiClient';
import { UploadOutlined } from '@ant-design/icons';
import { StyledUploadFile } from './style';
import { useIntl } from 'react-intl';
import { routes } from 'config/config';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { useFreelancerDataContext } from 'contexts/CreateCvContext/FreelancerData';
import { useUserState } from 'contexts/UserContext';

interface UploadFileProps {
  setIsFileLoading: Function;
  refetchFreelancerData?: Function;
  setIsAddUserOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  email?: string;
}

const infoKey = 'loading-message';

const UploadFile = ({ setIsFileLoading, refetchFreelancerData, email }: UploadFileProps) => {
  const intl = useIntl();
  const { state: freelancerDataState } = useFreelancerDataContext();
  const [searchparams, setSearchParams] = useSearchParams();
  const [file, setFile] = useState<any>(null);
  const [newUserData, setNewUserData] = useState<any>(null);
  const navigate = useNavigate();
  const { role: userRole } = useUserState();
  const [form] = Form.useForm();
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const infoMessage = () => {
    message.open({
      content: intl.messages.mindee_progress && intl.formatMessage({ id: 'mindee_progress' }),
      key: infoKey,
      duration: 500000,
      style: {
        fontSize: '1.1rem',
      },
    });
  };

  const { refetch: checkUploadCvCount } = useQueryApiClient({
    request: {
      url: 'api/job/check/upload/cv',
      method: 'POST',
    },
    onSuccess(response) {
      const token = Cookies.get('jwt');
      if (!token) {
        navigate('/login');
        return;
      }
      // @ts-ignore
      const role = decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (!response.data && role !== 'SuperAdmin') {
        setIsFileLoading(false);
        message.error(intl.formatMessage({ id: 'limited_upload_cv' }));
      } else {
        infoMessage();
        const formData = new FormData();
        formData.append('document', file);
        setIsFileLoading(true);
        if (!file) return;
        postDocument({ file });
      }
    },
  });

  const { appendData: postDocument, isLoading } = useQueryApiClient({
    request: {
      url: `/api/job/document?isCreateUser=${isRegister}`,
      method: 'POST',
      multipart: true,
    },
    onSuccess() {
      refetchFreelancerData?.();
      if (newUserData) {
        setSearchParams((params) => {
          params.set('add-user', 'post');
          return params;
        });
        setNewUserData(null);
      }
      setFile(null);
      form.resetFields();
    },
    onError() {
      setFile(null);
      form.resetFields();
    },
    onFinally() {
      setIsFileLoading(false);
      message.destroy(infoKey);
    },
  });

  useEffect(() => {
    setIsFileLoading(isLoading);
  }, [isLoading]);

  const { appendData: postEmail } = useQueryApiClient({
    request: {
      url: `/api/auth/register/bot`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ApiKey: "81b82cc20b17b1a016bdc7611b70c13e70c59290d195f1ffef7f05cd9b0bc110",
      },
    },
    onSuccess(res) {
      if (res?.data?.token) {
        Cookies.set('temp-token', res.data.token);
        setIsRegister(true);
      } else {
        setIsFileLoading(false);
        message.destroy(infoKey);
      }
    },
  });

  const handleSubmit = async () => {

    if (file) {
      setIsFileLoading(true);
      if (searchparams.get('add-user')) {
        if (email == undefined) {
          setIsRegister(true);
        } else {
          await postEmail({ email });
          const formData = new FormData();
          formData.append('document', file);
          setIsFileLoading(true);
          if (!file) return;
          postDocument({ file });
        }
      } else {
        checkUploadCvCount();
      }
    }
  };

  const handleFileChange = (event: any) => {
    setFile(event.file?.status === 'removed' ? null : event.file);
  };

  const confirmSubmit = () => {
    form.submit();
  };

  useEffect(() => {
    if (isRegister) {

      const formData = new FormData();
      formData.append('document', file);

      if (!file) {
        setIsFileLoading(true);
        return;
      }
      postDocument({ file });
      setIsRegister(false)
    }
  }, [isRegister]);

  return (
    <StyledUploadFile>
      <Form form={form} onFinish={handleSubmit} className="upload-file">
        <Upload
          name="document"
          onChange={handleFileChange}
          maxCount={1}
          className="upload-file__uploader"
          beforeUpload={() => false}
        >
          <Button
            icon={<UploadOutlined />}
            label={intl.messages.upload_resume && intl.formatMessage({ id: 'upload_resume' })}
          />
        </Upload>
        {!!freelancerDataState.data && userRole !== 'SuperAdmin' ? (
          <Popconfirm
            title={intl.messages.upload_new_cv && intl.formatMessage({ id: 'upload_new_cv' })}
            onConfirm={confirmSubmit}
            okText={intl.messages.upload ? intl.formatMessage({ id: 'upload' }) : 'Upload'}
            cancelText={intl.messages.cancel ? intl.formatMessage({ id: 'cancel' }) : 'Cancel'}
          >
            <Button disabled={!file} type="primary" className="btn" htmlType="button" label="Submit" />
          </Popconfirm>
        ) : (
          <Button disabled={!file} type="primary" className="btn" htmlType="submit" label="Submit" />
        )}
      </Form>
      <hr className="upload-file__underline" />
    </StyledUploadFile>
  );
};

export default UploadFile;
