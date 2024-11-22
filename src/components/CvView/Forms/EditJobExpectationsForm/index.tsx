import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'antd/lib/form/Form';
import { Form } from 'antd';

import { StyledEditJobExpectationForm } from './style';
import { Button, Modal, TextArea } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { RealCvInterface } from 'types/RealCV';
import { useUserDispatch } from 'contexts/UserContext';

type EditJobExpectationFormProps = {
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

export const EditJobExpectationForm = ({ open, setOpen, cvData }: EditJobExpectationFormProps) => {
  const intl = useIntl();
  const [form] = useForm();
  const { dispatch: userDispatch } = useUserDispatch();

  useEffect(() => {
    if (cvData) {
      form.setFieldValue('jobExpectations', cvData.jobExpectations);
    }
  }, [cvData, open]);

  const { appendData: updateJobExpectations } = useQueryApiClient({
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
      about: cvData?.about,
      jobExpectations: values.jobExpectations,
    };

    updateJobExpectations(postData);
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
      <StyledEditJobExpectationForm>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <TextArea
            className="cv-textarea"
            label={
              <div className="textarea-label">
                {intl.messages.desiderPositionJobsLabel && intl.formatMessage({ id: 'desiderPositionJobsLabel' })}
                <span className="label-span"> ({intl.messages.maxLength && intl.formatMessage({ id: 'maxLength' })}) </span>
              </div>
            }
            placeholder={intl.messages.desiderPositionJobsPlaceholder && intl.formatMessage({ id: 'desiderPositionJobsPlaceholder' })}
            name="jobExpectations"
            rules={[
              {
                required: true,
                message:intl.messages.desiredPositionJobExpectionsError &&  intl.formatMessage({ id: 'desiredPositionJobExpectionsError' }),
              },
            ]}
            maxLength={1000}
          />
        </Form>
      </StyledEditJobExpectationForm>
    </Modal>
  );
};
