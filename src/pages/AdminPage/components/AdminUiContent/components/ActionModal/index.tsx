import { Col, Form, Modal, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Input, TextArea } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { ActionModalDataType } from '../../type';
import { FormInstance } from 'antd/lib';
import { handleAccessDeniedError, openNotification } from 'utils/globalFunctions';
import { useUserDispatch, useUserState } from '../../../../../../contexts/UserContext';

interface Props {
  form: FormInstance<any>;
  actionModalData: ActionModalDataType | undefined;
  handleCloseModal: (isSuccess?: boolean) => void;
}
export const ActionModal = ({ form, handleCloseModal, actionModalData }: Props) => {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();

  const handleSubmit = (values: any) => {
    if (actionModalData?.data?.key) {
      update(values);
    } else {
      create(values);
    }
  };

  const { appendData: update } = useQueryApiClient({
    request: {
      url: `/api/uicontent/update/key?key=${actionModalData?.data?.key}`,
      method: 'PUT',
    },
    onSuccess() {
      openNotification(
        'success',
        `${intl.messages.update_ui_content_succes && intl.formatMessage({ id: 'update_ui_content_succes' })}`
      );
      handleCloseModal(true);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('cms_translation', allowedPages, userDispatch);
      }
    },
  });

  const { appendData: create } = useQueryApiClient({
    request: {
      url: `/api/uicontent`,
      method: 'POST',
    },
    onSuccess() {
      openNotification(
        'success',
        `${intl.messages.create_ui_content_succes && intl.formatMessage({ id: 'create_ui_content_succes' })}`
      );
      handleCloseModal(true);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('cms_translation', allowedPages, userDispatch);
      }
    },
  });

  const handleCancel = () => {
    handleCloseModal();
  };

  const handleKeyPress = (event: any) => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  return (
    <>
      <Modal
        width={1000}
        title={
          actionModalData?.type &&
          intl.messages[actionModalData?.type] &&
          intl.formatMessage({ id: actionModalData?.type ? actionModalData?.type : 'modal' })
        }
        open={actionModalData?.modalType === 'action'}
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form form={form} onFinish={handleSubmit} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Row gutter={[10, 15]}>
            <Col xs={24} sm={24} md={24}>
              <Input
                onKeyDown={handleKeyPress}
                rules={[
                  { required: true, message: intl.messages.keyRequired && intl.formatMessage({ id: 'keyRequired' }) },
                ]}
                label={intl.messages.key_ui_content_table && intl.formatMessage({ id: 'key_ui_content_table' })}
                name="key"
                maxLength={1000}
              />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <TextArea
                rules={[
                  {
                    required: true,
                    message: intl.messages.textEnRequired && intl.formatMessage({ id: 'textEnRequired' }),
                  },
                ]}
                label={intl.messages.english_ui_content && intl.formatMessage({ id: 'english_ui_content' })}
                name="textEn"
                maxLength={1000}
              />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <TextArea
                rules={[
                  {
                    required: true,
                    message: intl.messages.textRuRequired && intl.formatMessage({ id: 'textRuRequired' }),
                  },
                ]}
                label={intl.messages.russian_ui_content && intl.formatMessage({ id: 'russian_ui_content' })}
                name="textRu"
                maxLength={1000}
              />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <TextArea
                rules={[
                  {
                    required: true,
                    message: intl.messages.textUzRequired && intl.formatMessage({ id: 'textUzRequired' }),
                  },
                ]}
                label={intl.messages.uzbek_ui_content && intl.formatMessage({ id: 'uzbek_ui_content' })}
                name="textUz"
                maxLength={1000}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
