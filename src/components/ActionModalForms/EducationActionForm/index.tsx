import { useEffect, useState } from 'react';
import { Button, Form, Row } from 'antd';
import { useEducationContext, EducationInterface } from 'contexts/CreateCvContext/EducationContext';
import { useIntl } from 'react-intl';
import { Input, Select, SelectOption, DatePicker, Spinner, Checkbox } from 'ui';
import dayjs from 'dayjs';
import useQueryApiClient from 'utils/useQueryApiClient';
import { routes } from 'config/config';
import { StyledActionModalForms } from '../style';
import { useUserDispatch, useUserState } from '../../../contexts/UserContext';
import { handleAccessDeniedError } from '../../../utils/globalFunctions';

type Props = {
  actionModalData: any;
  setActionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string | undefined;
};

export const EducationActionForm = (props: Props) => {
  const { actionModalData, setActionModalVisible, userId } = props;
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const [educationForm] = Form.useForm();
  const { state, dispatch } = useEducationContext();
  const [isCurrentlyAttending, setIsCurrentlyAttending] = useState(false);

  useEffect(() => {
    if (actionModalData?.id) {
      const educationItem = state.educations.find((edu) => edu.id === actionModalData?.id);

      if (educationItem) {
        const { dateTo, dateFrom, ...otherValues } = educationItem;

        const updatedItem = {
          ...otherValues,
          dateTo: dateTo ? dayjs(dateTo) : null,
          dateFrom: dateFrom ? dayjs(dateFrom) : null,
        };
        if (!updatedItem.dateTo) {
          setIsCurrentlyAttending(true);
        }
        educationForm.setFieldsValue(updatedItem);
      }
    } else {
      educationForm.resetFields();
      setIsCurrentlyAttending(false);
    }
  }, [actionModalData, state.educations, educationForm]);

  useEffect(() => {
    if (isCurrentlyAttending) {
      educationForm.setFieldValue('dateTo', null);
    }
  }, [educationForm, isCurrentlyAttending]);

  const onFinish = (values: any) => {
    const data = {
      id: actionModalData.id ? actionModalData.id : String(new Date().getMilliseconds()),
      dateFrom: values.dateFrom ? dayjs(values.dateFrom) : undefined,
      dateTo: values.dateTo ? dayjs(values.dateTo) : undefined,
      ...values,
    };

    handleEducationSubmit(data);
  };

  const handleEducationSubmit = async (data: EducationInterface) => {
    if (actionModalData.id) {
      updateEducation(data);
    } else {
      createEducation(data);
    }
  };

  const disabledDate = (current: any, dateFieldName: any) => {
    const dateTo = educationForm.getFieldValue('dateTo');
    const dateFrom = educationForm.getFieldValue('dateFrom');

    if (dateFieldName === 'dateFrom') {
      return dateTo && current.isAfter(dateTo, 'day');
    }

    if (dateFieldName === 'dateTo') {
      return dateFrom && current.isBefore(dateFrom, 'day');
    }

    return false;
  };

  const { isLoading: isUpdateLoading, appendData: updateEducation } = useQueryApiClient({
    request: {
      url: `/api/education/${actionModalData.id}`,
      method: 'PUT',
    },
    onSuccess: (res) => {
      dispatch({ type: 'UPDATE_EDUCATION', payload: res.data });
      setActionModalVisible(false);
      educationForm.resetFields();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });
  // if userId true create education with userId or with token
  const { isLoading: isCreateLoading, appendData: createEducation } = useQueryApiClient({
    request: {
      url: userId ? `api/manage-cabinets/${userId}/education` : '/api/education',
      method: 'POST',
    },
    onSuccess: (res) => {
      dispatch({ type: 'ADD_EDUCATION', payload: res.data });
      setActionModalVisible(false);
      educationForm.resetFields();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { isLoading: isDegreeLoading, data: DegreeApiData } = useQueryApiClient({
    request: {
      url: `api/education/degree-list`,
      method: 'GET',
    },
  });

  if (isCreateLoading || isUpdateLoading) {
    return <Spinner children={intl.formatMessage({ id: 'loading...' })} spinning={true} />;
  }

  return (
    <StyledActionModalForms>
      <Form
        form={educationForm}
        name="education"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        autoComplete="off"
        className="form-antd"
      >
        <div className="action-form-title">
          <h4>{intl.messages.education && intl.formatMessage({ id: 'education' })}</h4>
        </div>
        <Input
          label={intl.messages.SkillSchoolNamePlaceholder && intl.formatMessage({ id: 'SkillSchoolNamePlaceholder' })}
          name="name"
          rules={[
            {
              required: true,
              message:
                intl.messages.SkillSchoolNameErrorMessage && intl.formatMessage({ id: 'SkillSchoolNameErrorMessage' }),
            },
          ]}
          className="form-item"
          maxLength={60}
        />

        <Select
          label={intl.messages.degree && intl.formatMessage({ id: 'degree' })}
          name="degree"
          rules={[
            {
              required: true,
              message: intl.messages.SkillSelectDegreeError && intl.formatMessage({ id: 'SkillSelectDegreeError' }),
            },
          ]}
          loading={isDegreeLoading}
        >
          {DegreeApiData?.data?.map((option: string, index: number) => (
            <SelectOption key={index} value={option}>
              {intl.messages[option] && intl.formatMessage({ id: option })}
            </SelectOption>
          ))}
        </Select>

        <div className="input">
          <Input
            label={
              intl.messages.SkillSchoolprogramePlaceholder &&
              intl.formatMessage({ id: 'SkillSchoolprogramePlaceholder' })
            }
            name="programme"
            rules={[
              {
                required: true,
                message: intl.messages.SkillProgrameError && intl.formatMessage({ id: 'SkillProgrameError' }),
              },
            ]}
            className="input-box"
            maxLength={60}
          />
        </div>

        <Input
          label={
            intl.messages.SkillSchoolLocationPlaceholder && intl.formatMessage({ id: 'SkillSchoolLocationPlaceholder' })
          }
          name="location"
          rules={[
            {
              required: true,
              message:
                intl.messages.SkillSchoolLocationErrorMessage &&
                intl.formatMessage({ id: 'SkillSchoolLocationErrorMessage' }),
            },
          ]}
          maxLength={60}
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
                required: isCurrentlyAttending ? false : true,
                message: intl.messages.dateToInputErrorMessage && intl.formatMessage({ id: 'dateToInputErrorMessage' }),
              },
            ]}
            name="dateTo"
            disabled={isCurrentlyAttending}
            size="large"
            format={routes.api.appDateFormat}
            disabledDate={(current: any) => disabledDate(current, 'dateTo')}
            placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
          />
        </div>

        <Checkbox
          onChange={() => setIsCurrentlyAttending(!isCurrentlyAttending)}
          label={
            intl.messages.skillAddEducationModalCheckbox && intl.formatMessage({ id: 'skillAddEducationModalCheckbox' })
          }
          checked={isCurrentlyAttending}
        />

        <Row className="save-btn">
          <Button type="primary" htmlType="submit">
            {intl.messages.save && intl.formatMessage({ id: 'save' })}
          </Button>
        </Row>
      </Form>
    </StyledActionModalForms>
  );
};
