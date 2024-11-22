import { StyledTelegramLogs } from './style';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Divider, Pagination, PaginationProps } from 'antd';
import { AdminPageTitle, Button, Table, Tabs } from 'ui';
import { parseDate, smoothScroll } from 'utils/globalFunctions';
import { TelegramLogFilters } from './components/TelegramLogFilter';
import dayjs from 'dayjs';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useSearchParams } from 'react-router-dom';
import ChatLog from './components/chatLog';
import { routes } from 'config/config';

export interface QueryParams {
  PageIndex: number;
  PageSize: number | null;
  Email?: string | null;
  pagesId?: number[];
  DateFrom?: string | null;
  DateTo?: string | null;
  Level?: string | null;
  Language?: string | null;
  ProgramId?: string | null;
  PhoneNumber?: string | null;
  pageIndex?: number;
}

const initialQeuryValues: QueryParams = {
  PageIndex: 1,
  PageSize: 20,
  pagesId: [],
  DateFrom: null,
  DateTo: null,
  Email: null,
  Language: null,
  Level: null,
  PhoneNumber: null,
  ProgramId: null,
};
const initialValues = {
  PageIndex: 1,
  PageSize: 20,
};

const TelegramLogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const intl = useIntl();
  const [queryParams, setQueryParams] = useState<QueryParams>(initialQeuryValues);
  const [actionStatus, setActionStatus] = useState<boolean>(false);
  const [userId, setUserId] = useState<{id: null | number; method: string;}>({id: null, method: 'delete'});

  const chatUrl = searchParams.get('chat') == 'true';
  const idUrl = typeof Number(searchParams.get('id')) == 'number' && !isNaN(Number(searchParams.get('id')));
  const isChatVisible = chatUrl && idUrl;

  const {
    data,
    isLoading: isDataLoading,
    appendData: getData,
  } = useQueryApiClient({
    request: {
      url: `${routes.api.backendBotUrl}/get/all/${actionStatus ? 'user-reports' : 'statistic'}?PageSize=${queryParams.PageSize}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ApiKey: "qwerty43-53$",
      },
    },
  });
  const { appendData: appendData, isLoading: isChangeLoading } = useQueryApiClient({
    request: {
      url: `${routes.api.backendBotUrl}/${userId.method}/user-reports?id=${userId.id}`,
      method: userId.method == 'delete' ? 'DELETE' : 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ApiKey: "qwerty43-53$",
      },
    },
    onSuccess(){
      getData(queryParams);
    }
  });

  useEffect(() => {
    if(userId.id){
      appendData(queryParams);
    }
  }, [userId])

  useEffect(() => {
    getData(queryParams);
  }, [queryParams, actionStatus]);

  const handleTabs = (val: any) => {
    setActionStatus(prev => !prev);
    setQueryParams((prev) => {
      return {
        ...prev,
        PageIndex: 1,
        PageSize: 20,
      };
    });
  };

  const usersColumns = [
    {
      title: intl.messages.email && intl.formatMessage({ id: 'email' }),
      dataIndex: 'email',
      key: 'email',
      sorter: (a: any, b: any) => a.email.toLowerCase().localeCompare(b.email.toLowerCase()),
    },
    {
      title: intl.messages.phone && intl.formatMessage({ id: 'phone' }),
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: intl.messages.technology && intl.formatMessage({ id: 'technology' }),
      dataIndex: 'program',
      key: 'program',
      render: (program: any) => <span>{program?.name}</span>,
      sorter: (a: any, b: any) => a.program?.name.toLowerCase().localeCompare(b.program?.name.toLowerCase()),
    },
    {
      title: intl.messages.level && intl.formatMessage({ id: 'level' }),
      dataIndex: 'level',
      key: 'level',
      render: (level: any) => <span>{level?.name}</span>,
      sorter: (a: any, b: any) => a.level?.name.toLowerCase().localeCompare(b.level?.name.toLowerCase()),
    },
    {
      title: intl.messages.language && intl.formatMessage({ id: 'language' }),
      dataIndex: 'language',
      key: 'language',
      sorter: (a: any, b: any) => a.language.toLowerCase().localeCompare(b.language.toLowerCase()),
    },
    {
      title: intl.messages.date && intl.formatMessage({ id: 'date' }),
      dataIndex: 'formattedDate',
      key: 'formattedDate',
      sorter: (a: any, b: any) => {
        const dateA: Date = parseDate(a.formattedDate);
        const dateB: Date = parseDate(b.formattedDate);
        return dateA.getTime() - dateB.getTime();
      }
    },
    {
      title: intl.messages.tests && intl.formatMessage({ id: 'tests' }),
      dataIndex: 'totalCount',
      key: 'totalCount',
    },
    {
      title: intl.messages.right_answers && intl.formatMessage({ id: 'right_answers' }),
      dataIndex: 'count',
      key: 'count',
      sorter: (a: any, b: any) => a.count - b.count,
    },
  ];
  const usersReportsColumns = [
    {
      title: intl.messages.email && intl.formatMessage({ id: 'email' }),
      dataIndex: 'email',
      key: 'email',
      sorter: (a: any, b: any) => a.email.toLowerCase().localeCompare(b.email.toLowerCase()),
    },
    {
      title: intl.messages.phone && intl.formatMessage({ id: 'phone' }),
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Program',
      dataIndex: 'programs',
      key: 'programs',
      render: (program: any) => <span>{program?.name}</span>,
      sorter: (a: any, b: any) => a.programs?.name.toLowerCase().localeCompare(b.programs?.name.toLowerCase()),
    },
    {
      title: 'Level',
      dataIndex: 'levels',
      key: 'levels',
      render: (level: any) => <span>{level?.name}</span>,
      sorter: (a: any, b: any) => a.levels?.name.toLowerCase().localeCompare(b.levels?.name.toLowerCase()),
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      sorter: (a: any, b: any) => a.language.toLowerCase().localeCompare(b.language.toLowerCase()),
    },
    {
      title: intl.messages.date && intl.formatMessage({ id: 'date' }),
      dataIndex: 'formattedDate',
      key: 'formattedDate',
      sorter: (a: any, b: any) => {
        const dateA: Date = parseDate(a.formattedDate);
        const dateB: Date = parseDate(b.formattedDate);
        return dateA.getTime() - dateB.getTime();
      }
    },
    {
      title: intl.messages.question_text && intl.formatMessage({ id: 'question_text' }),
      dataIndex: 'questionText',
      key: 'questionText',
    },
    {
      title: intl.messages.answer_text && intl.formatMessage({ id: 'answer_text' }),
      dataIndex: 'rightAnswer',
      key: 'rightAnswer',
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: (_: any, record: any) => { 
        return(
          record.isDeleted === 0 ?
            <Button
              label={intl.messages.delete && intl.formatMessage({ id: 'delete' })}
              danger
              loading={record.id == userId.id && isChangeLoading}
              onClick={() => setUserId({id: record.id, method: 'delete'})}
            /> :
            <Button
              label={intl.messages.recover && intl.formatMessage({ id: 'recover' })}
              loading={record.id == userId.id && isChangeLoading}
              onClick={() => setUserId({id: record.id, method: 'recover'})}
            />
        )
      }
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
      DateFrom: (allValues.dateFrom && dayjs(allValues.dateFrom).format('YYYY-MM-DD')) || null,
      DateTo: (allValues.dateTo && dayjs(allValues.dateTo).format('YYYY-MM-DD')) || null,
      Email: (allValues.Email && allValues.Email) || null,
      Language: (allValues.Language && allValues.Language) || null,
      Level: (allValues.Level && allValues.Level) || null,
      ProgramId: (allValues.Program && allValues.Program) || null,
      PhoneNumber: (allValues.PhoneNumber && allValues.PhoneNumber) || null,
      PageIndex: 1,
      PageSize: 20,
    });
  };

  const tabItems = [
    {
      label: intl.messages.statistics && intl.formatMessage({ id: 'statistics' }),
      key: 'statistics',
      children: (
        <div className="admin-table statistics">
          <TelegramLogFilters
            userEmails={data}
            onValuesChange={onValuesChange}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            initialValues={initialValues}
          />
          <Table
            columns={usersColumns}
            dataSource={data?.data?.items}
            loading={isDataLoading}
            onRow={(record: any, rowIndex: any) => {
              return {
                onClick: (event: any) => setSearchParams(`chat=true&id=${record.id}`),
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
        </div>
      ),
    },
    {
      label: intl.messages.reports && intl.formatMessage({ id: 'reports' }),
      key: 'reports',
      children: (
        <div className="admin-table">
          <TelegramLogFilters
            userEmails={data}
            onValuesChange={onValuesChange}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            initialValues={initialValues}
          />
          <Table columns={usersReportsColumns} dataSource={data?.data?.items} loading={isDataLoading} />
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
        </div>
      ),
    },
  ];

  return (
    <StyledTelegramLogs>
      {isChatVisible ? (
        <ChatLog />
      ) : (
        <>
          <AdminPageTitle label={intl.messages['telegram-logs'] ? intl.formatMessage({ id: 'telegram-logs' }) : "Telegram Logs"}/>
          <Tabs onChange={handleTabs} type="card" items={tabItems} className="admin-tabs" />
        </>
      )}
    </StyledTelegramLogs>
  );
};

export default TelegramLogs;
