import React, { useEffect, useState } from 'react';
import { StyledCompanyTable } from './style';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Input, Table } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import SvgSelector from 'assets/icons/SvgSelector';
import { useNavigate } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import { CompanyInformation } from 'components';

export function CompanyTable({ getCompany, company, companyLoading, totalItems }: any) {
  const intl = useIntl();
  const [companyId, setCompanyId] = useState<{ id: number; status: boolean } | null>(null);
  const [id, setId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [editSequenceId, setEditSequenceId] = useState<number | null>(null);
  const [editSequenceValue, setEditSequenceValue] = useState<string>('');
  const [sequenceQuery, setSequenceQuery] = useState<{ id: number; sequence: number } | null>(null);
  const [modalData, setModalData] = useState<{ status: boolean; data: {} } | null>(null);

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
      url: `/api/manage-cabinets/update/organization/sequence?id=${sequenceQuery?.id}&sequence=${sequenceQuery?.sequence}`,
      method: 'PUT',
    },
    onSuccess() {
      getCompany();
      setSequenceQuery(null);
    },
  });

  const { refetch: deleteCompanyStatus, isLoading: isDeleteLoading } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/delete/organization?id=${id}`,
      method: 'DELETE',
    },
    onSuccess() {
      getCompany();
    },
  });

  const { appendData: changeCompanyStatus, isLoading: isChangeLoading } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/update/status/organization?id=${companyId?.id}`,
      method: 'PUT',
    },
    onSuccess() {
      getCompany();
    },
  });

  const columns = [
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
      title: intl.messages.company_name && intl.formatMessage({ id: 'company_name' }),
      dataIndex: 'organizationName',
      key: 'organizationName',
      render: (organizationName: any) => <span className="organization-name">{organizationName}</span>,
      sorter: (a: any, b: any) => {
        const aValue = a.organizationName || '';
        const bValue = b.organizationName || '';
        return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      },
    },
    {
      title: intl.messages.companyCode && intl.formatMessage({ id: 'companyCode' }),
      dataIndex: 'organizationsDetail',
      key: 'organizationsDetail',
      render: (organizationsDetail: any) => organizationsDetail?.organizationCode,
    },
    {
      title: intl.messages.register_country && intl.formatMessage({ id: 'register_country' }),
      dataIndex: 'organizationRegistered',
      key: 'organizationRegistered',
      render: (organizationRegistered: any) => organizationRegistered?.name,
    },
    {
      title: intl.messages.estabilshed && intl.formatMessage({ id: 'estabilshed' }),
      dataIndex: 'establishedYear',
      key: 'establishedYear',
    },
    {
      title: intl.messages.company_size && intl.formatMessage({ id: 'company_size' }),
      dataIndex: 'employessCount',
      key: 'employessCount',
    },
    {
      title: intl.messages.industries && intl.formatMessage({ id: 'industries' }),
      dataIndex: 'industriys',
      key: 'industriys',
      render: (industriys: any) => (
        <div>
          {industriys?.map((item: any, index: number) => (
            <span key={index}>
              {item?.name}
              {index < industriys?.length - 1 && ', '}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: intl.messages.action && intl.formatMessage({ id: 'action' }),
      dataIndex: 'status',
      key: 'action',
      render: (status: any, record: any) => (
        <div className="table-action">
          <Tooltip
            color="#ffffff"
            style={{ color: 'black' }}
            placement="bottom"
            title={<span style={{ color: 'var(--black)' }}>{intl.formatMessage({ id: 'view' })}</span>}
            trigger={'hover'}
          >
            <div onClick={() => navigate(`/admin/view-partner/${record.id}`)}>
              <SvgSelector id="view" className="view-svg" />
            </div>
          </Tooltip>
          <Tooltip
            color="#ffffff"
            style={{ color: 'black' }}
            placement="bottom"
            title={<span style={{ color: 'var(--black)' }}>{intl.formatMessage({ id: 'edit' })}</span>}
            trigger={'hover'}
          >
            <div onClick={() => navigate(`/admin/edit-partner/${record.id}`)}>
              <SvgSelector className="edit-svg" id="edit" />
            </div>
          </Tooltip>
          <Tooltip
            color="#ffffff"
            style={{ color: 'black' }}
            placement="bottom"
            title={
              <span style={{ color: 'var(--black)' }}>
                {status ? intl.formatMessage({ id: 'hide' }) : intl.formatMessage({ id: 'show' })}
              </span>
            }
            trigger={'hover'}
          >
            <div onClick={() => handleChangeStatus(!status ? true : false, record.id)}>
              {status ? <SvgSelector id="eye" /> : <SvgSelector id="eye-slash" />}
            </div>
          </Tooltip>
          <Tooltip
            color="#ffffff"
            style={{ color: 'black' }}
            placement="bottom"
            title={<span style={{ color: 'var(--black)' }}>{intl.formatMessage({ id: 'delete' })}</span>}
            trigger={'hover'}
          >
            <div onClick={() => setId(record.id)}>
              <SvgSelector className="trash-svg" id="trash" />
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleChangeStatus = (status: boolean, id: number) => {
    setCompanyId({ id: id, status: status });
  };

  useEffect(() => {
    if (companyId) {
      changeCompanyStatus({ status: companyId.status });
    }
  }, [companyId]);

  useEffect(() => {
    if (id) {
      deleteCompanyStatus();
    }
  }, [id]);
  return (
    <StyledCompanyTable>
      {totalItems !== undefined && (
        <h4 className="total">
          {intl.formatMessage({ id: 'total' })}&nbsp;{totalItems}
        </h4>
      )}
      <Table
        loading={companyLoading || isChangeLoading || isDeleteLoading || loadingChangeSequence}
        dataSource={company}
        columns={columns}
        onRow={(record: any, rowIndex: any) => {
          return {
            onClick: (event: React.MouseEvent<HTMLTableRowElement>) => {
              const target = event.target as HTMLElement;
              const closestTd = target.closest('td');
              if (!closestTd) return;
              const parentNode = closestTd.parentNode;
              if (!parentNode) return;
              const cellIndex = Array.from(parentNode.children).indexOf(closestTd);

              const companyNameColumnIndex = 2;

              if (cellIndex === companyNameColumnIndex) {
                setModalData({ status: true, data: record });
              }
            },
          };
        }}
      />
      <CompanyInformation setModalData={setModalData} data={modalData} />
    </StyledCompanyTable>
  );
}
