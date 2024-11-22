import React, { useEffect, useState } from 'react';
import { StyledHiringsPage } from './style';
import { useIntl } from 'react-intl';
import { Button } from 'ui';
import { useNavigate } from 'react-router-dom';
import { HiringsTable } from './components/HiringsTable';
import useQueryApiClient from 'utils/useQueryApiClient';
import { JobFilter } from 'components';
import { Pagination, PaginationProps } from 'antd';
import { smoothScroll } from 'utils/globalFunctions';

export const initialQeuryValues = {
  PageIndex: 1,
  PageSize: 10,
  Country: null,
  CompanyId: null,
  JobTitle: null,
  Status: null,
};

export function HiringsPage() {
  const intl = useIntl();
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState(initialQeuryValues);

  const {
    isLoading,
    data: hiringDta,
    refetch,
    appendData,
  } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/hiring/filter',
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
    <StyledHiringsPage>
      <h1 className="title">{intl.formatMessage({ id: 'job_request' })}</h1>
      <JobFilter handleChangeForm={handleChangeForm} />
      <Button
        className="add-btn"
        label={intl.messages.add_company && intl.formatMessage({ id: 'add_hiring' })}
        onClick={() => navigate('/admin/hirings/add-hiring')}
      />
      <hr style={{ margin: '20px 0', background: 'gray' }} />
      <HiringsTable
        totalItems={hiringDta.data?.totalItems}
        hiringDta={hiringDta?.data?.items}
        refetch={refetch}
        isLoading={isLoading}
      />
      <div className="pagination-container">
        {hiringDta.data?.totalPages > 0 && (
          <Pagination
            total={hiringDta?.data?.totalItems}
            pageSize={hiringDta?.data?.itemsPerPage}
            itemRender={itemRender}
            onChange={handlePaginationChange}
            hideOnSinglePage={true}
            current={queryParams.PageIndex}
          />
        )}
      </div>
    </StyledHiringsPage>
  );
}
