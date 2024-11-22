import { Form } from 'antd';
import { useIntl } from 'react-intl';

import { Button, Input, Select, SelectOption } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';

type PermissionsFiltersProps = {
  onValuesChange: (changedValues: any, allValues: any) => void;
};

export const PermissionsFilters = ({ onValuesChange }: PermissionsFiltersProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const { data: allPages } = useQueryApiClient({
    request: {
      url: `/api/frontend-page/all`,
      method: 'GET',
    },
  });

  const onReset = () => {
    form.resetFields();
    onValuesChange({}, form.getFieldsValue());
  };

  return (
    <div className="admin-filters">
      <Form form={form} layout={'vertical'} onValuesChange={onValuesChange}>
        <div className="admin-filters__wrapper">
          <div className="filter-input">
            <Input
              name="name"
              label={intl.messages.name && intl.formatMessage({ id: 'name' })}
              allowClear
              size={'small'}
              className="admin-input"
            />
          </div>
          <div className="filter-input">
            <Input
              name="surname"
              label={intl.messages.surname && intl.formatMessage({ id: 'surname' })}
              allowClear
              size={'small'}
              className="admin-input"
            />
          </div>
          <div className="filter-input">
            <Select
              showSearch={false}
              name="pagesId"
              label={intl.messages.pages && intl.formatMessage({ id: 'pages' })}
              allowClear
              mode={'multiple'}
              placeholder="All"
            >
              {allPages.data &&
                allPages.data.map((option: any) => (
                  <SelectOption key={option.id} value={option.id}>
                    {intl.messages[option.key] && intl.formatMessage({ id: option.key })}
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
