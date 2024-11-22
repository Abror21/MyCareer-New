import React, { useEffect, useState } from 'react';
import { StyledCompanyPage } from './style';
import { useIntl } from 'react-intl';
import { CompanyTable } from './components/CompanyTable';
import { AdminPageTitle, Button } from 'ui';
import { useNavigate } from 'react-router-dom';
import useQueryApiClient from 'utils/useQueryApiClient';
import { JobFilter } from 'components';
import { smoothScroll } from 'utils/globalFunctions';
import { Pagination, PaginationProps } from 'antd';

export const initialQeuryValues = {
  PageIndex: 1,
  PageSize: 10,
  Country: null,
  CompanyId: null,
};

export function CompanyPage() {
  const intl = useIntl();
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<any>(initialQeuryValues);

  const {
    isLoading: companyLoading,
    data: company,
    refetch: getCompany,
    appendData,
  } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/organizations/filter',
      method: 'GET',
      data: queryParams,
      disableOnMount: true,
    },
  });

  const handleChangeForm = (changedValues: any, allValues: any) => {
    const normalizedValues = {
      ...allValues,
      companyId: allValues.companyId?.length ? allValues.companyId : null,
      country: allValues.country?.length ? allValues.country : null,
    };

    setQueryParams((prevParams: any) => ({
      ...prevParams,
      ...normalizedValues,
      PageIndex: 1,
    }));
  };

  useEffect(() => {
    if (queryParams) {
      appendData(queryParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <Button
          className="pagination-btn prev"
          label={intl.messages.previous && intl.formatMessage({ id: 'previous' })}
        />
      );
    }
    if (type === 'next') {
      return (
        <Button className="pagination-btn next" label={intl.messages.next && intl.formatMessage({ id: 'next' })} />
      );
    }

    return originalElement;
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setQueryParams((prevParams: any) => ({
      ...prevParams,
      PageSize: pageSize,
      PageIndex: page,
    }));
    smoothScroll('top', 95);
  };

  return (
    <StyledCompanyPage>
      <AdminPageTitle label={intl.messages.manage_company && intl.formatMessage({ id: 'manage_company' })}/>
      <JobFilter handleChangeForm={handleChangeForm} />
      <Button
        className="add-btn"
        label={intl.messages.add_company && intl.formatMessage({ id: 'add_company' })}
        onClick={() => navigate('/admin/partners/add-partner')}
      />
      <hr style={{ margin: '20px 0', background: 'gray' }} />
      <CompanyTable
        totalItems={company.data?.totalItems}
        companyLoading={companyLoading}
        company={company?.data?.items}
        getCompany={getCompany}
      />
      <div className="pagination-container">
        {company.data?.totalPages > 0 && (
          <Pagination
            total={company?.data?.totalItems}
            pageSize={company?.data?.itemsPerPage}
            itemRender={itemRender}
            onChange={handlePaginationChange}
            hideOnSinglePage={true}
            current={queryParams.PageIndex}
          />
        )}
      </div>
    </StyledCompanyPage>
  );
}
