import { Form } from 'antd';
import { telegramStatistic } from 'pages/AdminPage/components/Types';
import React from 'react'
import { useIntl } from 'react-intl';
import { Button, Input, Select, SelectOption } from 'ui';
import { QueryParams } from '../..';

interface MindeeLogsFilterProps {
    userEmails: telegramStatistic;
    initialQeuryValues: QueryParams;
    onValuesChange: (changedValues: any, allValues: any) => void;
    setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>;
};

const MindeeLogsFilter = ({ userEmails, initialQeuryValues, onValuesChange, setQueryParams }: MindeeLogsFilterProps) => {
    const intl = useIntl();
    const [form] = Form.useForm();

    const handleClearFilter = () => {
        form.resetFields();
        setQueryParams(initialQeuryValues);
    };

    return (
        <div className="admin-filters">
            <Form form={form} layout={'vertical'} onValuesChange={onValuesChange}>
                <div className="admin-filters__wrapper">
                    <div className="filter-input">
                        <Input
                            label={intl.messages.name ? intl.formatMessage({ id: 'name' }) : 'Name'}
                            name="FirstName"
                            placeholder={intl.messages.name ? intl.formatMessage({ id: 'name' }) : 'Name'}
                        />
                    </div>
                    <div className="filter-input">
                        <Input
                            label={intl.messages.surname ? intl.formatMessage({ id: 'surname' }) : 'Surname'}
                            name="LastName"
                            placeholder={intl.messages.surname ? intl.formatMessage({ id: 'surname' }) : 'Surname'}
                        />
                    </div>
                    <div className="filter-input">
                        <Select
                            name="Email"
                            label={intl.messages.email ? intl.formatMessage({ id: 'email' }) : 'Email'}
                            allowClear
                            placeholder={intl.messages.email ? intl.formatMessage({ id: 'email' }) : 'Email'}
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
                    <Button
                        onClick={handleClearFilter}
                        type="default"
                        htmlType="button"
                        label={intl.messages.clearFilters && intl.formatMessage({ id: 'clearFilters' })}
                        className="admin-default-btn"
                    />
                </div>
            </Form>
        </div>
    )
}

export default MindeeLogsFilter