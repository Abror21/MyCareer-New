import { Form, Button, Row } from 'antd';
import { routes } from 'config/config';
import { CertificateInterface, useCertificateContext } from 'contexts/CreateCvContext/CertificateContext';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Input, DatePicker, Spinner } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { StyledActionModalForms } from '../style';
import { useUserDispatch, useUserState } from '../../../contexts/UserContext';
import { handleAccessDeniedError } from '../../../utils/globalFunctions';

type Props = {
  actionModalData: any;
  setActionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string | undefined;
};

export const CertificateActionForm = (props: Props) => {
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const { actionModalData, setActionModalVisible, userId } = props;
  const { state, dispatch } = useCertificateContext();
  const [form] = Form.useForm();
  const intl = useIntl();

  useEffect(() => {
    if (actionModalData?.id) {
      const certificateItem = state.certificates.find((item) => item.id === actionModalData?.id);
      if (certificateItem) {
        const { issuingDate, expiringDate, ...otherValues } = certificateItem;

        const updatedItem = {
          ...otherValues,
          issuingDate: issuingDate ? dayjs(issuingDate) : null,
          expiringDate: expiringDate ? dayjs(expiringDate) : null,
        };
        form.setFieldsValue(updatedItem);
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionModalData, state.certificates]);

  const onFinish = (values: any) => {
    const data = {
      id: actionModalData.id ? actionModalData.id : String(new Date().getMilliseconds()),
      certificateName: values.certificateName,
      certificateProgramme: values.certificateProgramme,
      issuingDate: values.issuingDate ? dayjs(values.issuingDate) : undefined,
      expiringDate: values.expiringDate ? dayjs(values.expiringDate) : undefined,
    };

    handleCertificatesSubmit(data);
  };

  //  Submit function for create or update
  const handleCertificatesSubmit = (data: CertificateInterface) => {
    if (actionModalData.id) {
      updateCertificates(data);
    } else {
      createCertificates(data);
    }
  };

  const disabledDate = (current: dayjs.Dayjs, dateFieldName: any) => {
    const expiringDate = form.getFieldValue('expiringDate');
    const issuingDate = form.getFieldValue('issuingDate');

    if (dateFieldName === 'issuingDate') {
      return expiringDate && current.isAfter(expiringDate, 'day');
    }

    if (dateFieldName === 'dateTo') {
      return issuingDate && current.isBefore(issuingDate, 'day');
    }

    return false;
  };

  const { isLoading: isUpdateLoading, appendData: updateCertificates } = useQueryApiClient({
    request: {
      url: `/api/certificate/${actionModalData.id}`,
      method: 'PUT',
    },
    onSuccess: (res) => {
      dispatch({ type: 'UPDATE_CERTIFICATE', payload: res.data });
      setActionModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { isLoading: isCreateLoading, appendData: createCertificates } = useQueryApiClient({
    request: {
      url: userId ? `api/manage-cabinets/${userId}/certificate` : '/api/certificate',
      method: 'POST',
    },
    onSuccess: (res) => {
      dispatch({ type: 'ADD_CERTIFICATE', payload: res.data });
      setActionModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  if (isCreateLoading || isUpdateLoading) {
    return <Spinner children={intl.formatMessage({ id: 'loading...' })} spinning={true} />;
  }
  return (
    <StyledActionModalForms>
      <Form
        form={form}
        name="certifiate"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        autoComplete="off"
        className="form-antd"
      >
        <div className="action-form-title">
          <h4>{intl.messages.certificate && intl.formatMessage({ id: 'certificate' })}</h4>
        </div>
        <Input
          name="certificateName"
          type="text"
          rules={[
            {
              required: true,
              message:
                intl.messages.SkillCertificatelNameErrorMessage &&
                intl.formatMessage({ id: 'SkillCertificatelNameErrorMessage' }),
            },
          ]}
          label={
            intl.messages.SkillCertificateNamePlaceholder &&
            intl.formatMessage({ id: 'SkillCertificateNamePlaceholder' })
          }
          maxLength={60}
        />

        <Input
          name="certificateProgramme"
          type="text"
          rules={[
            {
              required: true,
              message: intl.messages.SkillProgrameError && intl.formatMessage({ id: 'SkillProgrameError' }),
            },
          ]}
          label={intl.messages.SkillprogramPlaceholder && intl.formatMessage({ id: 'SkillprogramPlaceholder' })}
          maxLength={60}
        />

        <div className="inputs-box">
          <DatePicker
            placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
            label={intl.messages.issuingDate && intl.formatMessage({ id: 'issuingDate' })}
            name="issuingDate"
            rules={[
              {
                required: true,
                message:
                  intl.messages.issuingDateInputErrorMessage &&
                  intl.formatMessage({ id: 'issuingDateInputErrorMessage' }),
              },
            ]}
            format={routes.api.appDateFormat}
            disabledDate={(current: dayjs.Dayjs) => disabledDate(current, 'issuingDate')}
            size="large"
          />

          <DatePicker
            placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
            name="expiringDate"
            label={intl.messages.expiringDate && intl.formatMessage({ id: 'expiringDate' })}
            size="large"
            format={routes.api.appDateFormat}
            disabledDate={(current: dayjs.Dayjs) => disabledDate(current, 'dateTo')}
          />
        </div>

        <Row className="save-btn">
          <Button type="primary" htmlType="submit">
            {intl.messages.save && intl.formatMessage({ id: 'save' })}
          </Button>
        </Row>
      </Form>
    </StyledActionModalForms>
  );
};
