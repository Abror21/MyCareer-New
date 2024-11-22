import React, { useEffect } from 'react';
import { StyledTable } from './style';
import { Table } from 'antd';
// import { columnsData } from './type';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Button } from 'ui';
import SvgSelector from 'assets/icons/SvgSelector';
import { UpdateByType, statusType } from './type';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

interface Props {
  freelancerId: number;
  setFreelancerId: React.Dispatch<React.SetStateAction<number>>;
}

export const AdminStatusHistory = (props: Props) => {
  const { freelancerId, setFreelancerId } = props;
  const intl = useIntl()
  const columnsData = [
    {
      id: 1,
      title: intl.messages.status && intl.formatMessage({id: 'status'}),
      key: 'status',
      dataIndex: 'status',
      render: (status: statusType) => <div>{status?.name}</div>,
    },
    {
      id: 2,
      title: intl.messages.date && intl.formatMessage({id: 'date'}),
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt: Date) => dayjs(createdAt).format('D MMM YYYY HH:mm'),
    },
    {
      id: 3,
      title: (
        <div className="thead-flex">
          <span>{intl.messages.user && intl.formatMessage({id: 'user'})}</span>
        </div>
      ),
      key: 'updatedBy',
      dataIndex: 'updatedBy',
      render: (updateBy: UpdateByType) => <div>{updateBy?.email}</div>,
    },
  ];

  const {
    data: historyData,
    refetch,
    isLoading,
  } = useQueryApiClient({
    request: {
      url: `api/manage-cabinets/${freelancerId}/status-history`,
      method: 'GET',
      disableOnMount: !freelancerId,
    },
  });
  useEffect(() => {
    if (freelancerId) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freelancerId]);

  if (!freelancerId) {
    return null;
  }

  const reversedData = historyData?.data ? [...historyData.data].reverse() : [];

  return (
    <>
      <StyledTable>
        <div className="table-history">
          <div className="table-inner">
            <Button
              onClick={() => setFreelancerId(0)}
              className="close-btn"
              type="text"
              icon={<SvgSelector id="close-svg" className="close-icon" />}
            />
            <Table
              scroll={{ y: 400 }}
              loading={isLoading}
              dataSource={reversedData}
              columns={columnsData}
              pagination={false}
            />
          </div>
        </div>
        <div className="history-blur"></div>
      </StyledTable>
    </>
  );
};
