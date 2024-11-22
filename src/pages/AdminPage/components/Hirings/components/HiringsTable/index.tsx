import React, { useEffect, useState } from 'react';
import { StyledHiringTable } from './style';
import { Button, Input, Modal, Table } from 'ui';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import useQueryApiClient from 'utils/useQueryApiClient';
import SvgSelector from 'assets/icons/SvgSelector';
import { Dropdown, Menu, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { render } from 'react-dom';
import { routes } from 'config/config';

export function HiringsTable({ hiringDta, isLoading, refetch, totalItems }: any) {
  const intl = useIntl();
  const [hiringId, setHiringId] = useState<{ id: number; status: any } | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [editSequenceId, setEditSequenceId] = useState<number | null>(null);
  const [editSequenceValue, setEditSequenceValue] = useState<string>('');
  const [sequenceQuery, setSequenceQuery] = useState<{ id: number; sequence: number } | null>(null);
  const navigate = useNavigate();

  const handleSequenceDoubleClick = (sequence: string, id: number) => {
    setEditSequenceId(id);
    setEditSequenceValue(sequence);
  };

  const handleSequenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setEditSequenceValue(value);
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue)) {
        setSequenceQuery({ id: editSequenceId ?? 0, sequence: parsedValue });
      }
    }
  };

  const handleSequenceSave = (id: number) => {
    if (sequenceQuery != null) {
      changeSequence();
    }
    setEditSequenceId(null);
  };

  const { isLoading: loadingChangeSequence, refetch: changeSequence } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/update/hiring/sequence?id=${sequenceQuery?.id}&sequence=${sequenceQuery?.sequence}`,
      method: 'PUT',
    },
    onSuccess() {
      refetch();
      setSequenceQuery(null);
    },
  });

  const columns = [
    {
      title: intl.messages.last_update && intl.formatMessage({ id: 'id' }),
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => id.toString().padStart(3, '0'),
    },
    {
      title: intl.messages.last_update && intl.formatMessage({ id: 'last_update' }),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: any) => dayjs(updatedAt).format('DD.MM.YYYY'),
      sorter: (a: any, b: any) => {
        const aValue = a?.updatedAt || '';
        const bValue = b.updatedAt || '';
        return aValue?.toLowerCase().localeCompare(bValue.toLowerCase());
      },
    },
    {
      title: intl.messages.sequence && intl.formatMessage({ id: 'sequence' }),
      dataIndex: 'sequence',
      key: 'sequence',
      render: (sequence: any, record: any) => (
        <div className="sequence-container" onDoubleClick={() => handleSequenceDoubleClick(sequence, record.id)}>
          {editSequenceId === record.id ? (
            <Input
              className="sequence-input"
              value={editSequenceValue}
              onChange={handleSequenceChange}
              onBlur={() => handleSequenceSave(record.id)}
              onPressEnter={() => handleSequenceSave(record.id)}
              autoFocus
            />
          ) : (
            sequence
          )}
        </div>
      ),
      sorter: (a: any, b: any) => {
        const aValue = String(a?.sequence || '');
        const bValue = String(b?.sequence || '');
        return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      },
    },
    {
      title: intl.messages.company_name && intl.formatMessage({ id: 'job_title' }),
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      sorter: (a: any, b: any) => {
        const aValue = a.jobTitle || '';
        const bValue = b.jobTitle || '';
        return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      },
    },
    {
      title: intl.messages.companyCode && intl.formatMessage({ id: 'company_name' }),
      dataIndex: 'companyName',
      key: 'companyName',
      sorter: (a: any, b: any) => {
        const aValue = String(a.companyNamee || '');
        const bValue = String(b.companyName || '');
        return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      },
    },
    {
      title: intl.messages.companyCode && intl.formatMessage({ id: 'anonymous_publisher' }),
      dataIndex: 'anonymousOrganizationName',
      key: 'anonymousOrganizationName',
      sorter: (a: any, b: any) => {
        const aValue = String(a.companyNamee || '');
        const bValue = String(b.companyName || '');
        return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      },
    },
    {
      title: intl.messages.register_country && intl.formatMessage({ id: 'location' }),
      dataIndex: 'location',
      key: 'location',
      render: (location: any, record: any) => (
        <>
          {record.location}
          {record.region && ', '} {record.region}
        </>
      ),
    },
    {
      title: intl.messages.estabilshed && intl.formatMessage({ id: 'language' }),
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: intl.messages.company_size && intl.formatMessage({ id: 'skills' }),
      dataIndex: 'hiringSkills',
      key: 'hiringSkills',
      render: (hiringSkills: any) =>
        hiringSkills?.map((item: any, index: number) => {
          return (
            <span key={index}>
              {item.skill} {index < hiringSkills.length - 1 && ', '}
            </span>
          );
        }),
    },
    {
      title: intl.messages.company_size && intl.formatMessage({ id: 'applicants' }),
      dataIndex: 'applicantsCount',
      key: 'applicantsCount',
      render: (applicantsCount: any, record: any) => (
        <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/applicants-list/${record?.id}`)}>
          {applicantsCount}
        </span>
      ),
    },
    {
      title: intl.messages.industries && intl.formatMessage({ id: 'publicationEndDate' }),
      dataIndex: 'publicationEndDate',
      key: 'hiringDetails',
      render: (hiringDetails: any, record: any) => (
        <span>
          {record?.hiringDetails?.publicationEndDate &&
            dayjs(record?.hiringDetails?.publicationEndDate).format('DD.MM.YYYY')}
        </span>
      ),
    },
    {
      title: intl.messages.industries && intl.formatMessage({ id: 'status' }),
      dataIndex: 'status',
      key: 'status',
      render: (status: any, record: any) => intl.formatMessage({ id: `hiring_${status}` }),
      sorter: (a: any, b: any) => {
        const aValue = String(a.status || '');
        const bValue = String(b.status || '');
        return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      },
    },
    {
      title: intl.messages.action && intl.formatMessage({ id: 'action' }),
      dataIndex: 'status',
      key: 'action',
      render: (status: any, record: any) => (
        <Dropdown menu={createMenuForRecord(record)} trigger={['click']}>
          <Button className="table-action" icon={<SvgSelector id="menu" />} />
        </Dropdown>
      ),
    },
  ];

  const { data: hiringStatus } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/hiring-status',
      method: 'GET',
    },
  });

  const { refetch: changeHiringStatus, isLoading: loadingChangeHiringStatus } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/update/hiring-status?id=${hiringId?.id}&hiringStatus=${hiringId?.status}`,
      method: 'PUT',
    },
    onSuccess() {
      refetch();
    },
    onError(error) {
      message.error(error.data.error);
    },
  });

  const { refetch: deleteHiring, isLoading: loadingDeleteHiring } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/hiring/${id}`,
      method: 'DELETE',
    },
    onSuccess() {
      refetch();
    },
    onError(error) {
      message.error(intl.formatMessage({ id: error.data.error }));
    },
  });

  const createMenuForRecord = (record: any) => {
    return {
      items: [
        {
          key: 'view',
          label: intl.formatMessage({ id: 'view' }),
          onClick: () => navigate(`/admin/hirings/view-hiring/${record?.id}`),
        },
        {
          key: 'copy',
          label: intl.formatMessage({ id: 'copy' }),
          onClick: () => navigate(`/admin/hirings/copy-hiring/${record?.id}`),
        },
        {
          key: 'update',
          label: intl.formatMessage({ id: 'update_hiring' }),
          onClick: () => navigate(`/admin/hirings/edit-hiring/${record?.id}`),
        },
        ...hiringStatus?.data
          ?.filter((status: any) => status !== 'Ended' && status !== "Draft")
          .map((status: any, index: number) => ({
            key: `status-${index}`,
            label: intl.formatMessage({ id: status }),
            disabled: record.status === status,
            onClick: () => handleStatusChange(status, record?.id),
          })),
        { type: 'divider' },
        {
          key: 'delete',
          danger: true,
          label: <div onClick={() => setId(record?.id)}>{intl.formatMessage({ id: 'delete' })}</div>,
        },
      ],
    };
  };

  const handleStatusChange = (status: any, id: number) => {
    setHiringId({ id: id, status: status });
  };

  useEffect(() => {
    if (hiringId) {
      changeHiringStatus();
    }
  }, [hiringId]);

  useEffect(() => {
    if (id) {
      deleteHiring();
    }
  }, [id]);

  return (
    <StyledHiringTable>
      {totalItems !== undefined && (
        <h4 className="total">
          {intl.formatMessage({ id: 'total' })}&nbsp;{totalItems}
        </h4>
      )}
      <Table
        columns={columns}
        loading={isLoading || loadingChangeHiringStatus || loadingDeleteHiring || loadingChangeSequence}
        dataSource={hiringDta}
      />
    </StyledHiringTable>
  );
}
