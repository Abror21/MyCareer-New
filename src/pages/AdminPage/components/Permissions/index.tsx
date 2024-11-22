import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { StyledPermissions } from './style';
import { PermissionsFilters } from './components/PermissionsFilters';
import { AdminPageTitle, Button, Table, Tabs } from 'ui';
import { EditPermissionsForm } from './components/EditPermissionsForm';
import { User } from 'types/User';
import { Role } from 'types/Role';
import { Page } from 'types/Page';
import useQueryApiClient from 'utils/useQueryApiClient';
import { smoothScroll } from 'utils/globalFunctions';
import { Pagination, PaginationProps } from 'antd';

export type PermissionsFilterType = {
  pageIndex: number;
  pageSize: number;
  workforceRoles?: string;
  name?: string;
  surname?: string;
  pagesId?: number[];
  roleId?: number;
};

interface QueryParams {
  PageIndex: number;
  PageSize: number;
  Name?: string;
  surname?: string;
  email?: string;
  pagesId?: number[];
}

const initialQeuryValues: QueryParams = {
  PageIndex: 1,
  PageSize: 20,
  Name: '',
  surname: '',
  email: '',
  pagesId: [],
};

export const Permissions = () => {
  const intl = useIntl();
  const [queryParams, setQueryParams] = useState<QueryParams>(initialQeuryValues);
  const [editPermissionsModalOpen, setEditPermissionsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [tabsType, setTabsType] = useState<string>('interns');

  const columns = [
    {
      title: intl.messages.registration && intl.formatMessage({ id: 'registration' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (value: string) => <div>{value && dayjs(value).format('DD.MM.YYYY')}</div>,
    },
    {
      title: intl.messages.name && intl.formatMessage({ id: 'name' }),
      dataIndex: 'name',
      key: 'name',
      width: 400,
      render: (value: string) => <div>{value && value}</div>,
    },
    {
      title: intl.messages.surname && intl.formatMessage({ id: 'surname' }),
      dataIndex: 'surname',
      key: 'surname',
      width: 400,
      render: (value: string) => <div>{value && value}</div>,
    },
    {
      title: intl.messages.pages && intl.formatMessage({ id: 'pages' }),
      dataIndex: 'pages',
      key: 'pages',
      width: 800,
      className: 'admin-base-color-column',
      render: (value: Page[]) => {
        const allSelectedPages = value.map((item: any) => intl.formatMessage({ id: item.page.key }));
        return allSelectedPages.length === 0 ? (
          <div>{intl.messages.blocked && intl.formatMessage({ id: 'blocked' })}</div>
        ) : (
          <div>{allSelectedPages.join(', ')}</div>
        );
      },
    },
    {
      title: intl.messages.email && intl.formatMessage({ id: 'email' }),
      dataIndex: 'email',
      key: 'email',
      width: 500,
      render: (value: string) => <div>{value && value}</div>,
    },
    {
      title: intl.messages.position && intl.formatMessage({ id: 'position' }),
      dataIndex: 'role',
      key: 'role',
      width: 300,
      className: 'admin-bold-column',
      render: (value: Role) => (
        <div>{value && intl.messages[value.name] && intl.formatMessage({ id: value.name })}</div>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (value: number, record: User) => (
        <>
          <Button
            type="primary"
            label={
              intl.messages.edit &&
              intl.formatMessage({
                id: 'edit',
              })
            }
            className="admin-primary-btn"
            onClick={() => onEditClick(record)}
          />
        </>
      ),
    },
  ];

  const { data: getInterns, appendData: appenInternApi, refetch: getInternsList } = useQueryApiClient({
    request: { url: '/api/user-permissions?WorkforceRoles=Interns', method: 'GET', data: queryParams },
  });
  const { data: getEmployees, appendData: appenEmployeesApi, refetch: getEmployeesList } = useQueryApiClient({
    request: { url: '/api/user-permissions?WorkforceRoles=Employees', method: 'GET', data: queryParams },
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    let data = {
      ...queryParams,
      PageSize: pageSize,
      PageIndex: page,
    };
    setQueryParams((prevParams: QueryParams) => ({
      ...prevParams,
      PageSize: pageSize,
      PageIndex: page,
    }));
    appenInternApi(data);
    smoothScroll('top', 95);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    setQueryParams({
      ...queryParams,
      Name: (allValues.name && allValues.name) || '',
      surname: (allValues.surname && allValues.surname) || '',
      pagesId: allValues.pagesId || null,
      PageIndex: 1,
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
  const handleTabs = (val: any) => {
    setTabsType(val);
  };
  const tabItems = [
    {
      label: intl.messages.interns && intl.formatMessage({ id: 'interns' }),
      key: 'interns',
      children: (
        <div className="admin-table">
          <Table columns={columns} dataSource={getInterns?.data?.items} refresh={refresh} setRefresh={setRefresh} />
          <div className="pagination-container">
            {getInterns && getInterns.data && getInterns?.data?.totalPages > 1 && (
              <Pagination
                total={getInterns?.data?.totalItems}
                pageSize={getInterns?.data?.itemsPerPage}
                itemRender={itemRender}
                onChange={handlePaginationChange}
                hideOnSinglePage={true}
                current={queryParams.PageIndex}
              />
            )}
          </div>
        </div>
      ),
    },
    {
      label: intl.messages.employees && intl.formatMessage({ id: 'employees' }),
      key: 'employees',

      children: (
        <div className="admin-table">
          <Table dataSource={getEmployees?.data?.items} columns={columns} refresh={refresh} setRefresh={setRefresh} />
          <div className="pagination-container">
            {getEmployees && getEmployees.data && getEmployees?.data?.totalPages > 1 && (
              <Pagination
                total={getEmployees?.data?.totalItems}
                pageSize={getEmployees?.data?.itemsPerPage}
                itemRender={itemRender}
                onChange={handlePaginationChange}
                hideOnSinglePage={true}
                current={queryParams.PageIndex}
              />
            )}
          </div>
        </div>
      ),
    },
  ];

  const onEditClick = (record: User) => {
    setUser(record);
    setEditPermissionsModalOpen(true);
  };

  useEffect(() => {
    if (queryParams) {
      if (tabsType === 'interns') {
        appenInternApi(queryParams);
      } else if (tabsType === 'employees') {
        appenEmployeesApi(queryParams);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <StyledPermissions>
      <AdminPageTitle label={intl.formatMessage({ id: 'user_permissions' })}/>
      <PermissionsFilters onValuesChange={onValuesChange} />
      <Tabs onChange={handleTabs} type="card" items={tabItems} className="admin-tabs" />
      <EditPermissionsForm
       getEmployeesList={getEmployeesList}
        getInternsList={getInternsList}
        open={editPermissionsModalOpen}
        setOpen={setEditPermissionsModalOpen}
        user={user}
        setRefresh={setRefresh}
      />
    </StyledPermissions>
  );
};
