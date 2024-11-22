import { useEffect, useState } from 'react';
import { Modal, Form } from 'antd';
import { CvPageInterface } from 'pages/AdminPage/components/Types';
import { useIntl } from 'react-intl';
import { Button, TextArea } from 'ui';
import SvgSelector from 'assets/icons/SvgSelector';
import useQueryApiClient from 'utils/useQueryApiClient';
import { StyledModalForm } from '../../style';
import { useUserDispatch, useUserState } from '../../../../../../contexts/UserContext';
import { handleAccessDeniedError } from '../../../../../../utils/globalFunctions';

interface Props {
  cvData: CvPageInterface | undefined;
}

export const JobExpectationSide = ({ cvData }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobExpectation, setJobExpectation] = useState<any>();
  const handleEdit = () => {
    form.setFieldsValue({ jobExpectation: jobExpectation });
    showModal();
  };

  useEffect(() => {
    if (cvData?.jobExpectations) {
      setJobExpectation(cvData?.jobExpectations);
    }
  }, [cvData]);

  const onFinish = (values: { jobExpectation: string }) => {
    EditJobEx({ JobExpectations: values.jobExpectation });
    setJobExpectation(values.jobExpectation);
    hideModal();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const { isLoading: isUpdateLoading, appendData: EditJobEx } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/${cvData?.id}/change-job-expectation`,
      method: 'PUT',
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  return (
    <>
      <div className="block-information textside">
        <h4 className="bar-title">{intl.messages.jobExpectations && intl.formatMessage({ id: 'jobExpectations' })}</h4>
        <p>{jobExpectation}</p>
        <Button className="edit-btn" label={<SvgSelector id="edit-svg" className="edit-icon" />} onClick={handleEdit} />
        <Modal
          open={isModalVisible}
          onCancel={hideModal}
          width={1000}
          footer={[
            <>
              <Button
                key="cancel"
                type="default"
                className="save-btn"
                onClick={hideModal}
                label={intl.messages.cancel && intl.formatMessage({ id: 'cancel' })}
              />
              <Button
                key="submit"
                type="primary"
                className="btn primary-btn save-btn"
                onClick={() => form.submit()}
                label={intl.messages.save && intl.formatMessage({ id: 'save' })}
              />
            </>,
          ]}
          className="editModal"
          confirmLoading={isUpdateLoading}
        >
          <Form form={form} onFinish={onFinish} layout="vertical">
            <StyledModalForm>
              <TextArea
                maxLength={1000}
                name="jobExpectation"
                initialValue={cvData?.jobExpectations}
                rows={6}
                rules={[
                  {
                    required: true,
                    message:
                      intl.messages.desiredPositionJobExpectionsError &&
                      intl.formatMessage({ id: 'desiredPositionJobExpectionsError' }),
                  },
                ]}
                label={
                  <div className="textarea-label">
                    {intl.messages.desiderPositionJobsLabel && intl.formatMessage({ id: 'desiderPositionJobsLabel' })}
                    <span className="label-span">
                      {' '}
                      ({intl.messages.maxLength && intl.formatMessage({ id: 'maxLength' })}){' '}
                    </span>
                  </div>
                }
              />
            </StyledModalForm>
          </Form>
        </Modal>
      </div>
    </>
  );
};
