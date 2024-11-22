import { Dropdown, Space } from 'antd';
import { MenuProps } from 'antd/lib';
import SvgSelector from 'assets/icons/SvgSelector';
import { AdminStatusHistory } from 'pages/AdminPage/components/AdminCabinet/components/AdminStatusHistory';
import { CvPageInterface } from 'pages/AdminPage/components/Types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useUserDispatch, useUserState } from 'contexts/UserContext';
import { handleAccessDeniedError } from '../../../../../../utils/globalFunctions';

interface Props {
  cvData: CvPageInterface | undefined;
  FreelancerDataRefetch: () => void;
}
export const StatusSide = ({ cvData, FreelancerDataRefetch }: Props) => {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const [freelancerId, setFreelancerId] = useState<number>(0);

  const { data: statusData } = useQueryApiClient({
    request: { url: '/api/freelancer/status', method: 'GET' },
  });

  const { appendData: ChangeFreealancerStatus } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/ChangeFreelancerStatus',
      method: 'POST',
    },
    onSuccess() {
      FreelancerDataRefetch();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const handleChangeStatus = (statusId: number) => {
    ChangeFreealancerStatus({ statusId, userId: cvData?.user?.id });
  };

  const statusItems = statusData?.data?.map((status: any) => ({
    label: <div onClick={() => handleChangeStatus(status.id)}>{status.name}</div>,
    key: status.id.toString(),
  }));

  const statusMenuProps: MenuProps = {
    items: statusItems || [],
    style: {
      maxHeight: '200px',
      overflowY: 'auto',
    },
  };
  return (
    <>
      <div className="block-infarmation">
        <h4 className="bar-title">{intl.messages.status && intl.formatMessage({ id: 'status' })}</h4>
        <div className="status-dropdown">
          <Space style={{ cursor: 'pointer' }} onClick={() => setFreelancerId(cvData ? cvData?.id : 0)}>
            {cvData?.freelancerStatus.name}
          </Space>
          <span>
            <Dropdown menu={statusMenuProps} trigger={['click']}>
              <div className="icon">
                <SvgSelector id="chevron-down-svg" />
              </div>
            </Dropdown>
          </span>
        </div>
      </div>
      <AdminStatusHistory freelancerId={freelancerId} setFreelancerId={setFreelancerId} />
    </>
  );
};
