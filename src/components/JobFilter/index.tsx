import React from 'react';
import { StyledJobsFilter } from './style';
import { Form } from 'antd';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Input, Select, SelectOption } from 'ui';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { HiOutlineTemplate } from 'react-icons/hi';

export function JobFilter({ handleChangeForm }: any) {
  const [form] = Form.useForm();
  const locations = useLocation();
  const intl = useIntl();

  const { isLoading: locadingOrganization, data: organizations } = useQueryApiClient({
    request: {
      url: '/api/organization/name',
      method: 'GET',
    },
  });

  const { isLoading: locadingCountry, data: countrydata } = useQueryApiClient({
    request: {
      url: '/api/country',
      method: 'GET',
    },
  });

  const { isLoading: loadingHiring, data: hiringDta } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/hirings/job-title',
      method: 'GET',
    },
  });

  const { isLoading: loadingHiringStatus, data: hiringStatusData } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/hiring-status',
      method: 'GET',
    },
  });

  return (
    <StyledJobsFilter>
      <Form layout="vertical" form={form} onValuesChange={handleChangeForm}>
        {locations.pathname === '/admin/hirings' && (
          <Select
            loading={loadingHiring}
            name="JobTitle"
            mode="multiple"
            placeholder={intl.formatMessage({ id: 'enter_key_words' })}
            label={locations.pathname.includes('/admin') ? intl.formatMessage({ id: 'job_title' }) : ''}
          >
            {hiringDta?.data?.map((item: any, index: number) => {
              return (
                <SelectOption key={index} value={item.name}>
                  {item.name}
                </SelectOption>
              );
            })}
          </Select>
        )}
        <Select
          mode="multiple"
          name="companyId"
          loading={locadingOrganization}
          placeholder={intl.formatMessage({ id: 'enter_key_words' })}
          label={locations.pathname.includes('/admin') ? intl.formatMessage({ id: 'company_name' }) : ''}
        >
          {organizations?.data?.map((item: any, index: number) => {
            return (
              <SelectOption key={index} value={item.id}>
                {item?.name}
              </SelectOption>
            );
          })}
        </Select>
        <Select
          mode="multiple"
          name="country"
          loading={locadingCountry}
          placeholder={intl.formatMessage({ id: 'multiple_selection_of_countries' })}
          label={locations.pathname.includes('/admin') ? intl.formatMessage({ id: 'country' }) : ''}
        >
          {countrydata?.data?.map((item: any, index: number) => {
            return (
              <SelectOption key={index} value={locations.pathname === '/admin/hirings' ? item?.name : item?.id}>
                {item.name}
              </SelectOption>
            );
          })}
        </Select>
        {locations.pathname === '/admin/hirings' && (
          <Select
            mode="multiple"
            name="status"
            loading={loadingHiringStatus}
            placeholder={intl.formatMessage({ id: 'filter_by_status' })}
            label={locations.pathname.includes('/admin') ? intl.formatMessage({ id: 'filter_by_status' }) : ''}
          >
            {hiringStatusData?.data?.map((item: any, index: number) => {
              return (
                <SelectOption key={index} value={item}>
                  {intl.formatMessage({ id: `hiring_${item}` })}
                </SelectOption>
              );
            })}
          </Select>
        )}
      </Form>
    </StyledJobsFilter>
  );
}
