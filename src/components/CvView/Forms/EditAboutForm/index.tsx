import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'antd/lib/form/Form';

import { StyledEditAboutForm } from './style';
import { Button, Modal, TextArea } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Form } from 'antd';
import { RealCvInterface } from 'types/RealCV';
import { useUserDispatch } from 'contexts/UserContext';

type EditAboutFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  cvData: RealCvInterface;
};

type PostData = {
  desiredPositionId?: number;
  jobExperience?: string;
  about?: string;
  jobExpectations?: string;
};

export const EditAboutForm = ({ open, setOpen, cvData }: EditAboutFormProps) => {
  const intl = useIntl();
  const [form] = useForm();
  const { dispatch: userDispatch } = useUserDispatch();

  useEffect(() => {
    if (cvData) {
      form.setFieldValue('about', cvData.about);
    }
  }, [cvData, open]);

  const { appendData: updateAbout } = useQueryApiClient({
    request: {
      url: `/api/freelancer/add-desired-position`,
      method: 'POST',
    },
    onSuccess: () => {
      userDispatch({
        type: 'SET_USER_DATA',
        payload: {
          refresh: true,
        },
      });
      setOpen(false);
      form.resetFields();
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinish = (values: any) => {
    let postData: PostData = {
      desiredPositionId: cvData?.desiredPosition?.id,
      jobExperience: cvData?.jobExperience,
      about: values.about,
      jobExpectations: cvData?.jobExpectations,
    };

    updateAbout(postData);
  };

  return (
    <Modal
      forceRender
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      wrapClassName="edit-intern-cv-modal-wrapper"
      footer={[
        <Button
          key="cancel"
          label={intl.messages.cancel && intl.formatMessage({ id: 'cancel' })}
          type="default"
          className="cancel-btn"
          onClick={() => {
            setOpen(false);
            form.resetFields();
          }}
        />,
        <Button
          key="submit"
          label={intl.messages.save && intl.formatMessage({ id: 'save' })}
          type="primary"
          htmlType="submit"
          className="btn primary-btn save-btn"
          onClick={handleSubmit}
        />,
      ]}
    >
      <StyledEditAboutForm>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <TextArea
            className="cv-textarea"
            label={
              <div className="textarea-label">
                {intl.messages.desiderPositionAboutLabel && intl.formatMessage({ id: 'desiderPositionAboutLabel' })}
                <span className="label-span"> ({intl.messages.maxLength && intl.formatMessage({ id: 'maxLength' })}) </span>
              </div>
            }
            placeholder={intl.messages.desiderPositionAboutPlaceholder && intl.formatMessage({ id: 'desiderPositionAboutPlaceholder' })}
            name="about"
            rules={[{ required: true, message: intl.messages.desiredPositionAboutError && intl.formatMessage({ id: 'desiredPositionAboutError' }) }]}
            maxLength={1000}
          />
        </Form>
      </StyledEditAboutForm>
    </Modal>
  );
};
