import { Flex, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Checkbox, DatePicker, Input, Spinner, TextArea } from 'ui';
import SvgSelector from 'assets/icons/SvgSelector';
import { WorkExperienceInterface, useWorkExperienceContext } from 'contexts/CreateCvContext/WorkExperienceContext';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';
import { routes } from 'config/config';
import { StyledActionModalForms } from '../style';
import { useUserDispatch, useUserState } from '../../../contexts/UserContext';
import { handleAccessDeniedError } from '../../../utils/globalFunctions';

type Props = {
  setActionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  workExperienceId: number;
  userId?: string | undefined;
};
export const ExperienceActionForm = (props: Props) => {
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const { workExperienceId, setActionModalVisible, userId } = props;
  const { state, dispatch } = useWorkExperienceContext();
  const intl = useIntl();
  const [workExperienceForm] = Form.useForm();
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  useEffect(() => {
    handleGetOne();
  }, [workExperienceId, state.workExperiences, workExperienceForm]);

  useEffect(() => {
    if (isCurrentlyWorking) {
      workExperienceForm.setFieldValue('dateTo', null);
    }
  }, [workExperienceForm, isCurrentlyWorking]);

  const onFinish = (values: WorkExperienceInterface) => {
    const data = {
      ...values,
      id: workExperienceId ? workExperienceId : new Date().getMilliseconds(),
      dateTo: dayjs(values.dateTo),
      dateFrom: dayjs(values.dateFrom),
    };
    handleExperienceSubmit(data);
  };
  const handleGetOne = () => {
    const workExperiencesItem = workExperienceId
      ? state.workExperiences.find((item) => item.id === workExperienceId)
      : null;

    if (workExperiencesItem) {
      const { dateTo, dateFrom, ...otherValues } = workExperiencesItem;

      const updatedItem = {
        ...otherValues,
        dateTo: dateTo ? dayjs(dateTo) : null,
        dateFrom: dateFrom ? dayjs(dateFrom) : null,
      };
      if (!updatedItem.dateTo) {
        setIsCurrentlyWorking(true);
      }
      workExperienceForm.setFieldsValue(updatedItem);
    } else {
      workExperienceForm.resetFields();
      setIsCurrentlyWorking(false);
    }
  };
  const handleExperienceSubmit = (data: WorkExperienceInterface) => {
    if (workExperienceId) {
      updateExperience(data);
    } else {
      createExperience(data);
    }
    setActionModalVisible(false);
    workExperienceForm.resetFields();
  };

  const disabledDate = (current: any, dateFieldName: any) => {
    const dateTo = workExperienceForm.getFieldValue('dateTo');
    const dateFrom = workExperienceForm.getFieldValue('dateFrom');

    if (dateFieldName === 'dateFrom') {
      return dateTo && current.isAfter(dateTo, 'day');
    }

    if (dateFieldName === 'dateTo') {
      return dateFrom && current.isBefore(dateFrom, 'day');
    }

    return false;
  };

  const { isLoading: isUpdateLoading, appendData: updateExperience } = useQueryApiClient({
    request: {
      url: `/api/experience/${workExperienceId}`,
      method: 'PUT',
    },
    onSuccess: (res) => {
      dispatch({ type: 'UPDATE_WORK_EXPERIENCE', payload: res.data });
      setActionModalVisible(false);
      workExperienceForm.resetFields();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  // if userId true create experience with userId or with token
  const { isLoading: isCreateLoading, appendData: createExperience } = useQueryApiClient({
    request: {
      url: userId ? `api/manage-cabinets/${userId}/experience` : '/api/experience',
      method: 'POST',
    },
    onSuccess: (res) => {
      dispatch({ type: 'ADD_WORK_EXPERIENCE', payload: res.data });
      setActionModalVisible(false);
      workExperienceForm.resetFields();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const handleCloseModal = () => {
    setActionModalVisible(false);
    handleGetOne();
  };
  if (isCreateLoading || isUpdateLoading) {
    return <Spinner children={intl.formatMessage({ id: 'loading...' })} spinning={true} />;
  }

  return (
    <StyledActionModalForms>
      <Form
        form={workExperienceForm}
        name="workexperience"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        autoComplete="off"
        className="action-form"
      >
        <div className="action-form-inner">
          <div className="action-form-title">
            <h4>{intl.messages.workExperience && intl.formatMessage({ id: 'workExperience' })}</h4>
          </div>
          <Input
            label={intl.messages.workExName && intl.formatMessage({ id: 'workExName' })}
            name="companyName"
            rules={[
              {
                required: true,
                message: intl.messages.workExNameError && intl.formatMessage({ id: 'workExNameError' }),
              },
            ]}
            className="form-item"
            maxLength={50}
          />

          <div className="input">
            <Input
              label={intl.messages.workExPosition && intl.formatMessage({ id: 'workExPosition' })}
              name="job"
              rules={[
                {
                  required: true,
                  message: intl.messages.workExPositionError && intl.formatMessage({ id: 'workExPositionError' }),
                },
              ]}
              className="input-box"
              maxLength={50}
            />
          </div>

          <Checkbox
            name="currentWorking"
            onChange={() => setIsCurrentlyWorking(!isCurrentlyWorking)}
            label={intl.messages.workExCurentLyWorking && intl.formatMessage({ id: 'workExCurentLyWorking' })}
            checked={isCurrentlyWorking}
          />

          <div className="inputs-box">
            <DatePicker
              label={intl.messages.dateFrom && intl.formatMessage({ id: 'dateFrom' })}
              name="dateFrom"
              rules={[
                {
                  required: true,
                  message:
                    intl.messages.dateFromInputErrorMessage && intl.formatMessage({ id: 'dateFromInputErrorMessage' }),
                },
              ]}
              format={routes.api.appDateFormat}
              disabledDate={(current: any) => disabledDate(current, 'dateFrom')}
              size="large"
              placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
            />

            <DatePicker
              label={intl.messages.dateTo && intl.formatMessage({ id: 'dateTo' })}
              rules={[
                {
                  required: isCurrentlyWorking ? false : true,
                  message:
                    intl.messages.dateToInputErrorMessage && intl.formatMessage({ id: 'dateToInputErrorMessage' }),
                },
              ]}
              name="dateTo"
              disabled={isCurrentlyWorking}
              size="large"
              format={routes.api.appDateFormat}
              disabledDate={(current: any) => disabledDate(current, 'dateTo')}
              placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
            />
          </div>
          <TextArea
            name="description"
            label={intl.messages.workExDescLabel && intl.formatMessage({ id: 'workExDescLabel' })}
            placeholder={intl.messages.workExDesc && intl.formatMessage({ id: 'workExDesc' })}
            rules={[
              {
                required: true,
                message: intl.messages.workExDescError && intl.formatMessage({ id: 'workExDescError' }),
              },
            ]}
            maxLength={1000}
          />
        </div>

        <Flex justify="space-between" align="center" className="action-buttons">
          <span onClick={() => handleCloseModal()} className="right">
            <SvgSelector id="blue-chevron-svg" className="right-svg" />
          </span>
          <Button
            type="primary"
            htmlType="submit"
            label={intl.messages.save && intl.formatMessage({ id: 'save' })}
          ></Button>
        </Flex>
      </Form>
    </StyledActionModalForms>
  );
};
