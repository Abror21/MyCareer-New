import { Form } from 'antd';
import { Button, DatePicker, Input, Select, SelectOption } from 'ui';
import { StyledAdminSearch } from './style';
import { useIntl } from 'react-intl';
import useQueryApiClient from 'utils/useQueryApiClient';
type Props = {
  handleFormChange: (changedValues: any, allValues: any) => void;
};
export const AdminSearch = ({ handleFormChange }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const handleFilterClear = () => {
    form.resetFields();
    handleFormChange({}, form.getFieldsValue());
  };

  const disabledDate = (current: any, dateFieldName: any) => {
    const RegistrationDateTo = form.getFieldValue('RegistrationDateTo');
    const RegistrationDateFrom = form.getFieldValue('RegistrationDateFrom');

    if (dateFieldName === 'RegistrationDateFrom') {
      return RegistrationDateTo && current.isAfter(RegistrationDateTo, 'day');
    }

    if (dateFieldName === 'RegistrationDateTo') {
      return RegistrationDateFrom && current.isBefore(RegistrationDateFrom, 'day');
    }

    return false;
  };

  const { data: desiredPositionData, isLoading: desiredPositionLoading } = useQueryApiClient({
    request: {
      url: '/api/desired-position',
      method: 'GET',
    },
  });

  const { data: skillData, isLoading: skillLoading } = useQueryApiClient({
    request: {
      url: '/api/skill',
      method: 'GET',
    },
  });

  const { data: countryData, isLoading: countryLoading } = useQueryApiClient({
    request: {
      url: '/api/country',
      method: 'GET',
    },
  });

  const { data: languageData, isLoading: isLanguageLoading } = useQueryApiClient({
    request: { url: '/api/language', method: 'GET' },
  });
  const { data: statusData, isLoading: isStatusLoading } = useQueryApiClient({
    request: { url: '/api/freelancer/status', method: 'GET' },
  });

  return (
    <StyledAdminSearch>
      <Form
        form={form}
        name="myForm"
        className="admin-seachr-form"
        onValuesChange={handleFormChange}
        initialValues={{ status: 'active' }}
      >
        <div className="input-box ">
          {/* First Line */}
          <div className="input first-line-input">
            <DatePicker
              placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
              name="RegistrationDateFrom"
              label={intl.messages.registerDateFrom && intl.formatMessage({ id: 'registerDateFrom' })}
              disabledDate={(current: any) => disabledDate(current, 'RegistrationDateFrom')}
            />
          </div>
          <div className="input  first-line-input">
            <DatePicker
              placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
              name="RegistrationDateTo"
              label={intl.messages.registerDateTo && intl.formatMessage({ id: 'registerDateTo' })}
              disabledDate={(current: any) => disabledDate(current, 'RegistrationDateTo')}
            />
          </div>
          <div className="input  first-line-input">
            <Input name="Name" label={intl.messages.name && intl.formatMessage({ id: 'name' })} />
          </div>
          <div className="input  first-line-input">
            <Input name="Surname" label={intl.messages.surname && intl.formatMessage({ id: 'surname' })} />
          </div>
          <div className="input  first-line-input">
            <Select
              loading={isStatusLoading}
              name="StatusId"
              label={intl.messages.status && intl.formatMessage({ id: 'status' })}
              allowClear={true}
            >
              {statusData?.data?.map((option: any) => (
                <SelectOption key={option.id} value={option.id}>
                  {option.name}
                </SelectOption>
              ))}
            </Select>
          </div>
          <div className="input  first-line-input">
            <Select
              name="DesiredPositionId"
              loading={desiredPositionLoading}
              label={intl.messages.desiredPositionLabel && intl.formatMessage({ id: 'desiredPositionLabel' })}
              allowClear={true}
            >
              {desiredPositionData?.data?.map((option: any) => (
                <SelectOption key={option.id} value={option.id}>
                  {option.name}
                </SelectOption>
              ))}
            </Select>
          </div>
          <div className="input  second-line-input">
            <Select
              name="SkillsVerification"
              label={intl.messages.skillVerification && intl.formatMessage({ id: 'skillVerification' })}
              allowClear={true}
            >
              <SelectOption value={''}>{intl.messages.all && intl.formatMessage({ id: 'all' })}</SelectOption>
              <SelectOption value={'true'}>
                {intl.messages.verified && intl.formatMessage({ id: 'verified' })}
              </SelectOption>
              <SelectOption value={'false'}>
                {intl.messages.notVerified && intl.formatMessage({ id: 'notVerified' })}
              </SelectOption>
            </Select>
          </div>
          <div className="input  second-line-input">
            <Select
              name="CountryId"
              placeholder={
                intl.messages.personalDetailCountryPlaceholder &&
                intl.formatMessage({ id: 'personalDetailCountryPlaceholder' })
              }
              loading={countryLoading}
              label={intl.messages.country && intl.formatMessage({ id: 'country' })}
              allowClear={true}
            >
              {countryData?.data?.map((option: any) => {
                return (
                  <SelectOption key={option.id} value={option.id}>
                    {option.name}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
          <div className="input  second-line-input">
            <Select
              name="SkillIds"
              placeholder={intl.messages.addSkillsPlaceholder && intl.formatMessage({ id: 'addSkillsPlaceholder' })}
              label={intl.messages.skills && intl.formatMessage({ id: 'skills' })}
              loading={skillLoading}
              mode="multiple"
              allowClear={true}
            >
              {skillData?.data?.map((option: any) => {
                return (
                  <SelectOption key={option?.id} value={option?.id}>
                    {option?.content}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
          <div className="input  second-line-input">
            <Select
              placeholder={
                intl.messages.AddLanguageSelectPlaceholder && intl.formatMessage({ id: 'AddLanguageSelectPlaceholder' })
              }
              name="LanguageIds"
              label={intl.messages.languages && intl.formatMessage({ id: 'languages' })}
              loading={isLanguageLoading}
              mode="multiple"
              allowClear={true}
            >
              {languageData?.data?.map((option: any) => {
                return (
                  <SelectOption key={option.id} value={option.id}>
                    {option.name}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
          <div className="action-btn">
            <div className="admin-default-btn">
              <Button
                onClick={handleFilterClear}
                type="default"
                htmlType="button"
                label={intl.messages.clearFilters && intl.formatMessage({ id: 'clearFilters' })}
              />
            </div>
          </div>
        </div>
      </Form>
    </StyledAdminSearch>
  );
};
