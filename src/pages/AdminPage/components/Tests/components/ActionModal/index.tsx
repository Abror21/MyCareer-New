import { Col, Form, Modal, Row } from 'antd';
import { FormInstance } from 'antd/lib';
import { ActionModalDataType } from 'pages/AdminPage/components/AdminUiContent/type';
import React from 'react';
import { useIntl } from 'react-intl';
import { Input } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { StyledTestsPage } from '../../style';
import { handleAccessDeniedError, openNotification } from 'utils/globalFunctions';
import { useUserDispatch, useUserState } from 'contexts/UserContext';

interface Props {
  form: FormInstance<any>;
  actionModalData: ActionModalDataType | undefined;
  handleCloseModal: (isSuccess?: boolean) => void;
}

export function ActionModal({ form, handleCloseModal, actionModalData }: Props) {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();

  const onClose = () => {
    handleCloseModal();
  };

  const { appendData: update } = useQueryApiClient({
    request: {
      url: `/api/learning-programs`,
      method: 'PUT',
    },
    onSuccess() {
      openNotification(
        'success',
        `${intl.messages.update_ui_content_succes && intl.formatMessage({ id: 'update_test' })}`
      );
      handleCloseModal(true);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('tests', allowedPages, userDispatch);
      }
    },
  });

  const { appendData: create } = useQueryApiClient({
    request: {
      url: `/api/learning-programs`,
      method: 'POST',
    },
    onSuccess() {
      openNotification(
        'success',
        `${intl.messages.create_ui_content_succes && intl.formatMessage({ id: 'create_test' })}`
      );
      handleCloseModal(true);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('tests', allowedPages, userDispatch);
      }
    },
  });

  const handleSubmit = (values: any) => {
    if (actionModalData?.data?.id) {
      update({
        id: actionModalData?.data?.id,
        name_uz: values.name_uz,
        name_ru: values.name_ru,
        name_en: values.name_en,
        cloudStudyId: values.cloudStudyId,
      });
    } else {
      create(values);
    }
  };

  return (
    <React.Fragment>
      <Modal
        width={500}
        title={
          actionModalData?.type &&
          intl.messages[actionModalData?.type] &&
          intl.formatMessage({ id: actionModalData?.type ? actionModalData?.type : 'modal' })
        }
        open={actionModalData?.modalType === 'action'}
        onCancel={onClose}
        onOk={form.submit}
      >
        <StyledTestsPage>
          <Form onFinish={handleSubmit} form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <Row gutter={[10, 15]}>
              <Col xs={24} sm={24} md={24}>
                <Input
                  name="name_uz"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'programUzRequired' }),
                    },
                  ]}
                  label={intl.messages.uzbek_learning_program && intl.formatMessage({ id: 'uzbek_learning_program' })}
                />
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Input
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'programRuRequired' }),
                    },
                  ]}
                  name="name_ru"
                  label={
                    intl.messages.russian_learning_program && intl.formatMessage({ id: 'russian_learning_program' })
                  }
                />
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Input
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'programEnRequired' }),
                    },
                  ]}
                  name="name_en"
                  label={
                    intl.messages.english_learning_program && intl.formatMessage({ id: 'english_learning_program' })
                  }
                />
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Input
                  type="number"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'cloudStudy' }),
                    },
                  ]}
                  label="Cloud Study Id"
                  name="cloudStudyId"
                />
              </Col>
            </Row>
          </Form>
        </StyledTestsPage>
      </Modal>
    </React.Fragment>
  );
}
