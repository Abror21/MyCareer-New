import React, { useEffect, useState } from 'react';
import { StyledMindeeLogs } from './style';
import { useIntl } from 'react-intl';
import { Divider, Pagination, PaginationProps } from 'antd';
import MindeeLogsFilter from './components/MindeeLogsfilter';
import { AdminPageTitle, Button, Table } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { routes } from 'config/config';
import { smoothScroll } from 'utils/globalFunctions';
import MindeeInfo from './components/MindeeInfo';

export interface QueryParams {
  PageIndex: number;
  PageSize: number | null;
  Email?: string | null;
  FirstName?: string | null;
  LastName?: string | null;
}

export const initialQeuryValues: QueryParams = {
  PageIndex: 1,
  PageSize: 20,
  Email: null,
  FirstName: null,
  LastName: null,
};

interface MindeeLogsItem {
  id: number;
  createdAt: string;
  isUploadWebSite: boolean;
  updatedAt: string;
}
export interface InfoModalDataProps {
  name: string;
  email: string;
  id: number;
  isBotUploadCv: number;
  isWebSiteUploadCv: number;
  lastName: string;
  mindeeLog: MindeeLogsItem[];
}

const MindeeLogs = () => {
  const intl = useIntl();
  const [queryParams, setQueryParams] = useState<QueryParams>(initialQeuryValues);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState<boolean>(false);
  const [infoModalData, setInfoModalData] = useState<InfoModalDataProps | null>(null);

  useEffect(() => {
    if (queryParams) {
      appendData(queryParams);
    }
  }, [queryParams]);

  const {
    data,
    isLoading: isDataLoading,
    appendData,
  } = useQueryApiClient({
    request: {
      url: `${routes.api.baseUrl}/api/manage-cabinets/mindee-logs/filter`,
      method: 'GET',
      data: queryParams,
    },
  });
  const { data: emailData, appendData: getData } = useQueryApiClient({
    request: {
      url: `${routes.api.backendBotUrl}/get/all/statistic`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ApiKey: 'qwerty43-53$',
      },
    },
  });

  const mindeeColumns = [
    {
      title: intl.messages.name && intl.formatMessage({ id: 'name' }),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    },
    {
      title: intl.messages.surname && intl.formatMessage({ id: 'surname' }),
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a: any, b: any) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()),
    },
    {
      title: intl.messages.email && intl.formatMessage({ id: 'email' }),
      dataIndex: 'email',
      key: 'email',
      sorter: (a: any, b: any) => a.email.toLowerCase().localeCompare(b.email.toLowerCase()),
    },
    {
      title: intl.messages.uploads_by_bot && intl.formatMessage({ id: 'uploads_by_bot' }),
      dataIndex: 'isBotUploadCv',
      key: 'isBotUploadCv',
      sorter: (a: any, b: any) => a.isBotUploadCv - b.isBotUploadCv,
    },
    {
      title: intl.messages.uploads_by_web && intl.formatMessage({ id: 'uploads_by_web' }),
      dataIndex: 'isWebSiteUploadCv',
      key: 'isWebSiteUploadCv',
      sorter: (a: any, b: any) => a.isWebSiteUploadCv - b.isWebSiteUploadCv,
    },
  ];

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
    setQueryParams((prevParams: QueryParams) => ({
      ...prevParams,
      PageSize: pageSize,
      PageIndex: page,
    }));
    smoothScroll('top', 95);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    setQueryParams({
      ...queryParams,
      Email: (allValues.Email && allValues.Email) || null,
      FirstName: (allValues.FirstName && allValues.FirstName) || null,
      LastName: (allValues.LastName && allValues.LastName) || null,
      PageIndex: 1,
      PageSize: 20,
    });
  };

  return (
    <StyledMindeeLogs>
      <AdminPageTitle label={intl.messages.mindee_logs ? intl.formatMessage({ id: 'mindee-logs' }) : 'Mindee Logs'}/>
      <MindeeLogsFilter
        userEmails={emailData}
        initialQeuryValues={initialQeuryValues}
        onValuesChange={onValuesChange}
        setQueryParams={setQueryParams}
      />
      <Table
        columns={mindeeColumns}
        dataSource={data?.data?.items}
        loading={isDataLoading}
        onRow={(record: any, rowIndex: any) => {
          return {
            onClick: (event: any) => {
              setIsOpenInfoModal(true);
              setInfoModalData(record);
            },
          };
        }}
      />
      {data?.data?.totalItems > 1 && (
        <div className="pagination-container">
          <Pagination
            total={data?.data?.totalItems}
            pageSize={data?.data?.itemsPerPage}
            itemRender={itemRender}
            onChange={handlePaginationChange}
            current={queryParams.PageIndex}
          />
        </div>
      )}
      <MindeeInfo
        isOpenInfoModal={isOpenInfoModal}
        infoModalData={infoModalData}
        setIsOpenInfoModal={setIsOpenInfoModal}
        setInfoModalData={setInfoModalData}
      />
    </StyledMindeeLogs>
  );
};

export default MindeeLogs;
