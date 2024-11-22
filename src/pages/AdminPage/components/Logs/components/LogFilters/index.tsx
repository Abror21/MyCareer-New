import { Form } from 'antd';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { Button, DatePicker, Select, SelectOption } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { User } from 'types/User';
import { QueryParams } from '../../index';
import { disabledDate } from 'utils/globalFunctions';

type LogFilterProps = {
  queryParams: QueryParams;
  setQueryParams: (val: QueryParams) => void;
  initialValues: QueryParams;
  onValuesChange: (changedValues: any, allValues: any) => void;
};

export const LogFilters = ({ queryParams, setQueryParams, initialValues, onValuesChange }: LogFilterProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const { data: allUsers } = useQueryApiClient({
    request: {
      url: `/api/user`,
      method: 'GET',
    },
  });

  const { data: allModules } = useQueryApiClient({
    request: {
      url: `/api/log/modules`,
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
            <DatePicker
              placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
              format="DD.MM.YYYY"
              name="dateFrom"
              label={intl.messages.dateFrom && intl.formatMessage({ id: 'dateFrom' })}
              disabledDate={(current: any) => disabledDate(current, 'dateFrom', form)}
            />
          </div>
          <div className="filter-input">
            <DatePicker
              placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
              format="DD.MM.YYYY"
              name="dateTo"
              label={intl.messages.dateTo && intl.formatMessage({ id: 'dateTo' })}
              disabledDate={(current: any) => disabledDate(current, 'dateTo', form)}
            />
          </div>
          <div className="filter-input">
            <Select
              name="username"
              label={intl.messages.username && intl.formatMessage({ id: 'username' })}
              allowClear
              labelInValue
            >
              {allUsers.data &&
                allUsers.data.map((option: User) => (
                  <SelectOption key={option.id} value={option.id}>
                    {option.email}
                  </SelectOption>
                ))}
            </Select>
          </div>
          <div className="filter-input">
            <Select
              showSearch={false}
              name="modules"
              label={intl.messages.module && intl.formatMessage({ id: 'module' })}
              allowClear
              mode="multiple"
            >
              {allModules &&
                allModules.data?.map((option: { name: string }) => (
                  <SelectOption key={option.name} value={option.name}>
                    {intl.messages[option.name] && intl.formatMessage({ id: option.name })}
                  </SelectOption>
                ))}
            </Select>
          </div>

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
