import React, { useEffect, useState } from 'react';
import { StyledBasicInformation } from './style';
import { Input, Select, SelectOption } from 'ui';
import { useIntl } from 'react-intl';
import useQueryApiClient from 'utils/useQueryApiClient';

const initialValue = {
  CompanyId: null,
};

export function BasicInformation({ form, setPath, disable, hiringImage, setHiringImage }: any) {
  const int = useIntl();
  const [query, setQuery] = useState<any>(initialValue);

  const { isLoading: loadingOrganization, data: organizations } = useQueryApiClient({
    request: {
      url: '/api/organization/name',
      method: 'GET',
    },
  });

  const {
    isLoading: loadingOrganizationCode,
    data: organizationCodeData,
    appendData,
  } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/filter/organization-name',
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess(res) {
      form.setFieldsValue({ companyCode: res?.data[0]?.organizationCode });
      if (hiringImage) appendImageData({ code: res?.data[0]?.organizationCode });
    },
  });

  const { isLoading: loadingSalary, data: hiringSalaryData } = useQueryApiClient({
    request: {
      url: '/api/hirings/salary-period',
      method: 'GET',
    },
  });

  const { isLoading: loadingContactDuration, data: contactDuration } = useQueryApiClient({
    request: {
      url: '/api/hirings/contract-duration',
      method: 'GET',
    },
  });
  const { isLoading: loadingemploymentType, data: employmentTypeData } = useQueryApiClient({
    request: {
      url: '/api/hirings/employment-type',
      method: 'GET',
    },
  });
  const { isLoading: loadingJobLocation, data: jobLocationData } = useQueryApiClient({
    request: {
      url: '/api/hirings/job-location',
      method: 'GET',
    },
  });

  const { refetch: refetchImage, appendData: appendImageData } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/hirings/organization-image',
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess: (response) => {
      setPath(response?.data?.path || '');
    },
  });

  useEffect(() => {
    if (query?.CompanyId) {
      appendData(query);
    }
  }, [query]);

  const onlyNumbersForMaxSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    form.setFieldsValue({ maxSalary: numericValue });
  };
  const onlyNumbersForMinSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    form.setFieldsValue({ minSalary: numericValue });
  };

  return (
    <StyledBasicInformation>
      <hr style={{ background: 'gray', margin: '10px 0 20px 0' }} />
      <div className="basic-data">
        <div className="form-header">
          <div className="ant-form-item">
            <Input
              disabled={disable}
              name="jobTitle"
              label={int.formatMessage({ id: 'job_title' })}
              rules={[
                {
                  required: true,
                  message: int.formatMessage({ id: 'company_name_required' }),
                },
              ]}
            />
          </div>
          <div className="ant-form-item">
            <Select
              disabled={disable}
              allowClear
              loading={loadingOrganization}
              onChange={(x: any, option: any) => {
                setQuery({ ...query, CompanyId: x });
              }}
              label={int.formatMessage({ id: 'company_name' })}
              name="companyName"
              rules={[
                {
                  required: true,
                  message: int.formatMessage({ id: 'company_name_required' }),
                },
              ]}
            >
              {organizations?.data?.map((item: any, index: number) => {
                return (
                  <SelectOption key={index} value={item.id}>
                    {item.name}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
          <div className="ant-form-item">
            <Select
              disabled={disable}
              name="companyCode"
              allowClear
              loading={loadingOrganizationCode}
              label={int.formatMessage({ id: 'company_code' })}
              rules={[
                {
                  required: true,
                  message: int.formatMessage({ id: 'company_name_required' }),
                },
              ]}
            >
              {organizationCodeData?.data?.map((item: any, index: number) => {
                return (
                  <SelectOption key={index} value={item.organizationCode}>
                    {item.organizationCode.toString()}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="form-body">
          <div className="contry-container">
            <Input disabled={disable} name="coutry" allowClear label={int.formatMessage({ id: 'country' })} />
            <Input disabled={disable} name="region" allowClear label={int.formatMessage({ id: 'region' })} />
          </div>
          <div className="form-item">
            <Select
              disabled={disable}
              name="jobLocation"
              loading={loadingJobLocation}
              allowClear
              label={int.formatMessage({ id: 'job_location' })}
            >
              {jobLocationData?.data?.map((item: any, index: number) => {
                return (
                  <SelectOption value={item} key={index}>
                    {int.formatMessage({ id: item })}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
          <div className="form-item">
            <Select
              disabled={disable}
              name="employmentType"
              allowClear
              loading={loadingemploymentType}
              label={int.formatMessage({ id: 'employment_type' })}
            >
              {employmentTypeData?.data?.map((item: any, index: number) => {
                return (
                  <SelectOption value={item} key={index}>
                    {int.formatMessage({ id: item })}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
          <div className="form-item">
            <Select
              disabled={disable}
              name="contractDuration"
              allowClear
              loading={loadingContactDuration}
              label={int.formatMessage({ id: 'contract_duration' })}
            >
              {contactDuration?.data?.map((item: any, index: number) => {
                return (
                  <SelectOption value={item} key={index}>
                    {int.formatMessage({ id: item })}
                  </SelectOption>
                );
              })}
            </Select>
          </div>
          <div className="form-item">
            <Input disabled={disable} name="language" label={int.formatMessage({ id: 'work_language' })} />
          </div>
        </div>
        <div className="form-footer">
          <div className="salary-container">
            <div className="label-salary">
              <Input
                disabled={disable}
                name="minSalary"
                onChange={onlyNumbersForMinSalary}
                allowClear
                label={int.formatMessage({ id: 'gross_salary' })}
              />
            </div>
            <div>-</div>
            <div>
              <Input disabled={disable} name="maxSalary" onChange={onlyNumbersForMaxSalary} allowClear />
            </div>
          </div>
          <Select disabled={disable} name="salaryPeriod" loading={loadingSalary}>
            {hiringSalaryData?.data?.map((item: any, index: number) => {
              return (
                <SelectOption allowClear value={item} key={index}>
                  {int.formatMessage({ id: item })}
                </SelectOption>
              );
            })}
          </Select>
        </div>
      </div>
    </StyledBasicInformation>
  );
}
