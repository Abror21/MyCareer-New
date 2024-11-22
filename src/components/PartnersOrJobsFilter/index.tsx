import React, { useEffect } from 'react'
import { StyledPartnersOrJobsFilter } from './style'
import { useIntl } from 'react-intl';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Form } from 'antd';
import { Input, Select, SelectOption } from 'ui';
import { useSearchParams } from 'react-router-dom';

interface PartnersOrJobsFilterProps {
    inputName: string;
    selectName: string;
    type?: string;
    handleFilterChange: (a: any, b: any) => void;
}

export const PartnersOrJobsFilter = ({ inputName, selectName, type='partners', handleFilterChange }: PartnersOrJobsFilterProps) => {
    const intl = useIntl();
    const [form] = Form.useForm();
    const [searchparams, setSearchparams] = useSearchParams();
    const company = searchparams.get('company') ? searchparams.get('company') : null;

    useEffect(() => {
        if (company) {
            form.setFieldValue('CompanyName', company);
            setTimeout(() => {
                handleFilterChange({ CompanyName: company }, form.getFieldsValue());
            }, 500);
        }
    }, []);

    const { data: countryData, isLoading: countryLoading } = useQueryApiClient({
        request: {
            url: '/api/country',
            method: 'GET',
        },
    });

    return (
        <StyledPartnersOrJobsFilter>
            <Form
                className='filter-form'
                form={form}
                onValuesChange={handleFilterChange}
            >
                <Input
                    allowClear
                    size='middle'
                    name={inputName}
                    placeholder={intl.messages.enter_key_words ? intl.formatMessage({ id: 'enter_key_words' }) : 'Enter Key Words'}
                />
                <Select
                    allowClear
                    size='middle'
                    mode='multiple'
                    name={selectName}
                    placeholder={intl.messages.select_countries ? intl.formatMessage({ id: 'select_countries' }) : 'Select Countries'}
                    loading={countryLoading}
                >
                    {countryData?.data?.map((option: any) => {
                        return (
                            <SelectOption key={option.name} value={type == 'partners' ? option.id : option.name}>
                                {option.name}
                            </SelectOption>
                        );
                    })}
                </Select>
            </Form>
        </StyledPartnersOrJobsFilter>
    )
}