import React from 'react';
import { StyledHiringTable } from '../HiringsTable/style';
import { BackButton, Table } from 'ui';
import { useIntl } from 'react-intl';
import { routes } from 'config/config';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

export function ApplicantsList() {
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();

  const applicantsColumn = [
    {
      title: intl.messages.company_name && intl.formatMessage({ id: 'userEmail' }),
      dataIndex: 'email',
      key: 'email',
      render: (_: any, record: any) => <>{record?.user?.email}</>,
    },
    {
      title: intl.messages.company_name && intl.formatMessage({ id: 'fullName' }),
      dataIndex: 'userName',
      key: 'userName',
      render: (_: any, record: any) => (
        <div>
          {record.userName}&nbsp;{record.lastName}
        </div>
      ),
    },
    {
      title: intl.messages.company_name && intl.formatMessage({ id: 'phoneNumber' }),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: intl.messages.company_name && intl.formatMessage({ id: 'description' }),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: intl.messages.company_name && intl.formatMessage({ id: 'date' }),
      dataIndex: 'createAt',
      key: 'createAt',
      render: (createAt: any) => dayjs(createAt).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: intl.messages.company_name && intl.formatMessage({ id: 'link' }),
      dataIndex: 'link',
      key: 'link',
      render: (_: any, record: any) => (
        <a href={routes.api.baseUrl + '/admin/cv/' + record?.user?.id}>
          {routes.api.baseUrl + '/admin/cv/' + record?.user?.id}
        </a>
      ),
    },
  ];

  const { isLoading: loadingApplicants, data: applicants } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/applicantes-hiring?hiringId=${params.id}`,
      method: 'GET',
    },
  });

  return (
    <StyledHiringTable>
      <BackButton onClick={() => navigate(-1)} color="black" label={intl.formatMessage({ id: 'back' })} />
      <br />
      <br />
      <Table loading={loadingApplicants} columns={applicantsColumn} dataSource={applicants?.data} />
    </StyledHiringTable>
  );
}
