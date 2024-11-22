import React from 'react';
import { useIntl } from 'react-intl';
import { Form } from 'antd';
import { Button, DatePicker, Input, Select, SelectOption } from 'ui';
import { disabledDate } from 'utils/globalFunctions';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Skill } from 'types/Skill';
import { languages, skillLevels } from 'utils/consts';
import { telegramStatistic } from 'pages/AdminPage/components/Types';

type LogFilterProps = {
  queryParams: any;
  setQueryParams: (val: any) => void;
  initialValues: any;
  onValuesChange: (changedValues: any, allValues: any) => void;
  isVisibleDates?: boolean;
  userEmails: telegramStatistic;
};

export const TelegramLogFilters = ({
  setQueryParams,
  initialValues,
  onValuesChange,
  isVisibleDates = true,
  userEmails,
}: LogFilterProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const { data: technologies } = useQueryApiClient({
    request: {
      url: `/api/skill`,
      method: 'GET',
    },
  });

  const onReset = () => {
    form.resetFields();
    setQueryParams(initialValues);
  };

  return (
    <div className="admin-filters">
      <Form form={form} layout={'vertical'} onValuesChange={onValuesChange}>
        <div className="admin-filters__wrapper">
          <div className="filter-input">
            <Select
              name="Email"
              label={intl.messages.email && intl.formatMessage({ id: 'email' })}
              allowClear
              placeholder={intl.messages.email && intl.formatMessage({ id: 'email' })}
            >
              {userEmails?.data?.items &&
                userEmails.data.items
                  .filter((option, index, self) => self.findIndex((o) => o.email === option.email) === index) // фильтр дубликатов
                  .map((option: any) => (
                    <SelectOption key={option.id} value={option.email}>
                      {option.email}
                    </SelectOption>
                  ))}
            </Select>
          </div>
          <div className="filter-input">
            <Input
              label={intl.messages.phone && intl.formatMessage({ id: 'phone' })}
              name="PhoneNumber"
              placeholder={intl.messages.phone && intl.formatMessage({ id: 'phone' })}
            />
          </div>
          <div className="filter-input">
            <Select
              name="Program"
              placeholder={intl.messages.technology && intl.formatMessage({ id: 'technology' })}
              label={intl.messages.technology && intl.formatMessage({ id: 'technology' })}
              allowClear
            >
              {technologies.data &&
                technologies.data.map((option: Skill) => (
                  <SelectOption key={option.id} value={option.id}>
                    {option.content}
                  </SelectOption>
                ))}
            </Select>
          </div>
          <div className="filter-input">
            <Select
              name="Level"
              placeholder={intl.messages.level && intl.formatMessage({ id: 'level' })}
              label={intl.messages.level && intl.formatMessage({ id: 'level' })}
              allowClear
            >
              {skillLevels.map((option: { label: string; value: string }) => (
                <SelectOption key={option.label} value={option.value}>
                  {option.label}
                </SelectOption>
              ))}
            </Select>
          </div>
          <div className="filter-input">
            <Select
              name="Language"
              placeholder={intl.messages.language && intl.formatMessage({ id: 'language' })}
              label={intl.messages.language && intl.formatMessage({ id: 'language' })}
              allowClear
            >
              {languages.map((option: { label: string; value: string }) => (
                <SelectOption key={option.label} value={option.value}>
                  {option.label}
                </SelectOption>
              ))}
            </Select>
          </div>
          {isVisibleDates && (
            <div className="filter-input">
              <DatePicker
                placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
                name="dateFrom"
                label={intl.messages.dateFrom && intl.formatMessage({ id: 'dateFrom' })}
                disabledDate={(current: any) => disabledDate(current, 'dateFrom', form)}
              />
            </div>
          )}
          {isVisibleDates && (
            <div className="filter-input">
              <DatePicker
                placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
                name="dateTo"
                label={intl.messages.dateTo && intl.formatMessage({ id: 'dateTo' })}
                disabledDate={(current: any) => disabledDate(current, 'dateTo', form)}
              />
            </div>
          )}

          <Button
            onClick={onReset}
            type="default"
            htmlType="button"
            label={intl.messages.clearFilters && intl.formatMessage({ id: 'clearFilters' })}
            className="admin-default-btn"
          />
        </div>
      </Form>
    </div>
  );
};
