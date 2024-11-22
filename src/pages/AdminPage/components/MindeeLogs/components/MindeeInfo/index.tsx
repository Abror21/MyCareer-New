import React from 'react'
import { Modal, Table } from 'ui';
import { StyledMindeeInfo } from './style';
import { Divider, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { InfoModalDataProps } from '../..';
import dayjs from 'dayjs';

interface MindeeInfoProps {
  isOpenInfoModal: boolean;
  infoModalData: InfoModalDataProps | null;
  setIsOpenInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoModalData: React.Dispatch<React.SetStateAction<InfoModalDataProps | null>>;
}
const { Title } = Typography;

const MindeeInfo = ({ isOpenInfoModal, infoModalData, setIsOpenInfoModal, setInfoModalData }: MindeeInfoProps) => {
  const intl = useIntl();

  const resumeSubmits = infoModalData?.mindeeLog?.map((item, index) => {
    return {
      number: index + 1,
      time: dayjs(item.createdAt).format('DD-MM-YYYY HH:mm:ss'),
      type: item.isUploadWebSite ?
        (intl.messages.web_site ? intl.formatMessage({ id: 'web_site' }) : 'Web Site') :
        (intl.messages.bot ? intl.formatMessage({ id: 'bot' }) : 'Bot')
    }
  });

  const mindeeInfoColumns = [
    {
        title: '#',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: intl.messages.date_time ? intl.formatMessage({ id: 'date_time' }) : 'Date/Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: intl.messages.system ? intl.formatMessage({ id: 'system' }) : 'System',
        dataIndex: 'type',
        key: 'type',
    }
];

  return (
    <StyledMindeeInfo id='mindee-modal'>
      <Modal
        open={isOpenInfoModal}
        footer={true}
        centered={true}
        getContainer={document.getElementById('mindee-modal') as HTMLElement}
        onCancel={() => {
          setIsOpenInfoModal(false);
          setInfoModalData(null);
        }}
      >
        <div className='mindee-modal_header'>
          <Title level={3}>{infoModalData?.name}</Title>&nbsp;&nbsp;
          <Title level={3}>{infoModalData?.lastName}</Title>
        </div>
        <Divider />
        <div className='mindee-modal_body'>
          <Table
            columns={mindeeInfoColumns}
            dataSource={resumeSubmits}
          />
        </div>
      </Modal>
    </StyledMindeeInfo>
  )
}

export default MindeeInfo