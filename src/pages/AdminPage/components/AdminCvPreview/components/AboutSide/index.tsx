import React, { useEffect, useState } from 'react';
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

export const AboutSide = ({ cvData }: Props) => {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [about, setAbout] = useState<string | undefined>();

  const handleEdit = () => {
    form.setFieldsValue({ about });
    showModal();
  };

  useEffect(() => {
    if (cvData?.about) {
      setAbout(cvData?.about);
    }
  }, [cvData]);

  const onFinish = (values: { about: string }) => {
    EditAbout({ about: values.about });
    setAbout(values.about);
    hideModal();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const { isLoading: isUpdateLoading, appendData: EditAbout } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/${cvData?.id}/change-about`,
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
        <h4 className="bar-title">{intl.messages.about && intl.formatMessage({ id: 'about' })}</h4>
        <p>{about}</p>
        <Button className="edit-btn" label={<SvgSelector id="edit-svg" className="edit-icon" />} onClick={handleEdit} />
        <Modal
          open={isModalVisible}
          width={1000}
          onCancel={hideModal}
          footer={[
            <>
              <Button
                type="default"
                key="cancel"
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
                name="about"
                initialValue={about}
                label={
                  intl.messages.desiderPositionAboutLabel && intl.formatMessage({ id: 'desiderPositionAboutLabel' })
                }
                rows={6}
                rules={[
                  {
                    required: true,
                    message:
                      intl.messages.desiredPositionAboutError &&
                      intl.formatMessage({ id: 'desiredPositionAboutError' }),
                  },
                ]}
              />
            </StyledModalForm>
          </Form>
        </Modal>
      </div>
    </>
  );
};
