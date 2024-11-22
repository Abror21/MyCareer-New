/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import { Divider, Pagination, PaginationProps } from 'antd';
import { StyledLogs } from './style';
import { AdminPageTitle, Button, Table } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { smoothScroll } from 'utils/globalFunctions';
import { LogFilters } from './components/LogFilters';

const initialValues = {
  pageIndex: 1,
  pageSize: 20,
};

export interface QueryParams {
  pageIndex: number;
  pageSize: number;
  dateFrom?: string;
  dateTo?: string;
  email?: string;
  modules?: string[];
}

const initialQeuryValues: QueryParams = {
  pageIndex: 1,
  pageSize: 20,
  dateFrom: '',
  dateTo: '',
  email: '',
  modules: [],
};

export const Logs = () => {
  const intl = useIntl();
  const [queryParams, setQueryParams] = useState<QueryParams>(initialQeuryValues);
  const columns = [
    {
      title: intl.messages.ip_address && intl.formatMessage({ id: 'ip_address' }),
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 200,
      render: (value: string) => <div>{value}</div>,
    },
    {
      title: intl.messages.username && intl.formatMessage({ id: 'username' }),
      dataIndex: 'user',
      key: 'user',
      width: 500,
      render: (value: { email: string }) => <div>{value.email}</div>,
    },
    {
      title: intl.messages.date_time && intl.formatMessage({ id: 'date_time' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 300,
      render: (value: string) => <div>{dayjs(value).format('DD.MM.YYYY HH:mm')}</div>,
    },
    {
      title: intl.messages.module && intl.formatMessage({ id: 'module' }),
      dataIndex: 'module',
      key: 'module',
      width: 300,
      render: (value: string) => <div>{intl.formatMessage({ id: value })}</div>,
    },
    {
      title: intl.messages.action && intl.formatMessage({ id: 'action' }),
      dataIndex: 'action',
      key: 'action',
      width: 300,
      render: (value: string) => <div>{value}</div>,
    },
  ];

  const { data, appendData } = useQueryApiClient({
    request: {
      url: '/api/log',
      method: 'GET',
      data: queryParams,
    },
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    let data = {
      ...queryParams,
      pageSize: pageSize,
      pageIndex: page,
    };
    setQueryParams((prevParams: QueryParams) => ({
      ...prevParams,
      pageSize: pageSize,
      pageIndex: page,
    }));
    appendData(data);
    smoothScroll('top', 95);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    setQueryParams({
      ...queryParams,
      dateFrom: (allValues.dateFrom && dayjs(allValues.dateFrom).format('YYYY-MM-DD')) || '',
      dateTo: (allValues.dateTo && dayjs(allValues.dateTo).format('YYYY-MM-DD')) || '',
      email: allValues.username?.label || '',
      modules: allValues.modules || null,
      pageIndex: 1,
    });
  };

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

  useEffect(() => {
    if (queryParams) {
      appendData(queryParams);
    }
  }, [queryParams]);

  return (
    <StyledLogs>
      <AdminPageTitle label={intl.messages.logs && intl.formatMessage({ id: 'logs' })} />
      <LogFilters
        onValuesChange={onValuesChange}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        initialValues={initialValues}
      />
      <Divider />
      <div className="admin-table">
        <Table columns={columns} dataSource={data?.data?.items} />
        <div className="pagination-container">
          <Pagination
            total={data.data?.totalItems}
            pageSize={data?.data?.itemsPerPage}
            itemRender={itemRender}
            onChange={handlePaginationChange}
            hideOnSinglePage={true}
            current={queryParams.pageIndex}
          />
        </div>
      </div>
    </StyledLogs>
  );
};
