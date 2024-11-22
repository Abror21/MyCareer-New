import { Dropdown, Space } from 'antd';
import SvgSelector from 'assets/icons/SvgSelector';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Button, Table } from 'ui';
import { StyledFreelancerList } from './style';
import { Link, useSearchParams } from 'react-router-dom';
import useQueryApiClient from 'utils/useQueryApiClient';
import { MenuProps } from 'antd/lib';
import { FreelancerListProps, SkillType } from 'pages/AdminPage/components/Types';
import { useIntl } from 'react-intl';
import { useUserDispatch, useUserState } from 'contexts/UserContext';
import { handleAccessDeniedError } from 'utils/globalFunctions';


export const FreelancerList = (props: FreelancerListProps) => {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();
  const [resumeId, setResumeId] = useState<number | null>(null);
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const { data, isLoading, filterRefetch, setFreelancerId, totalItems } = props;
  const [SelectedUserId, setSelectedUserId] = useState<number>(0);
  const { data: statusData } = useQueryApiClient({
    request: { url: '/api/freelancer/status', method: 'GET' },
  });
  const { appendData: ChangeFreealancerStatus, isLoading: isStatusUpdateLoading } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/ChangeFreelancerStatus',
      method: 'POST',
    },
    onSuccess() {
      filterRefetch();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { isLoading: isDeleteLoading, refetch: deleteResume } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/freelancer/${resumeId}`,
      method: 'DELETE',
    },
    onSuccess: () => {
      filterRefetch();
    },
  });

  useEffect(() => {
    if(resumeId){
      deleteResume()
    }
  }, [resumeId])

  const handleMenuClick = (statusId: number) => {
    ChangeFreealancerStatus({ statusId, userId: SelectedUserId });
  };

  const items = statusData?.data?.map((status: any) => ({
    label: (
      <div
        style={{ display: 'block', width: '100%', height: '100%', textTransform: 'capitalize' }}
        className="dropDown-item"
        onClick={() => handleMenuClick(status.id)}
      >
        {status.name}
      </div>
    ),
    key: status.id.toString(),
  }));

  const menuProps: MenuProps = {
    items: items || [],
    style: {
      maxHeight: '200px',
      overflowY: 'auto',
    },
  };

  const columns = [
    {
      title: intl.messages.registration && intl.formatMessage({ id: 'registration' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => dayjs(createdAt).format('DD.MM.YYYY'),
    },
    {
      title: intl.messages.name && intl.formatMessage({ id: 'name' }),
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: intl.messages.surname && intl.formatMessage({ id: 'surname' }),
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: intl.messages.skills && intl.formatMessage({ id: 'skills' }),
      dataIndex: 'skills',
      key: 'skills',
      render: (skills: SkillType[]) => (
        <div className="skill-column">
          {skills.map((skill) => (
            <div className="skill-column-item" key={skill.id}>
              {skill.verified && <SvgSelector id="addverified" />}
              <span> {skill.skill.content}</span>,
            </div>
          ))}
        </div>
      ),
    },
    {
      title: intl.messages.desiredPosition && intl.formatMessage({ id: 'desiredPosition' }),
      dataIndex: ['desiredPosition', 'name'],
      key: 'desiredPosition',
    },
    {
      title: intl.messages.country && intl.formatMessage({ id: 'country' }),
      dataIndex: ['address', 'country', 'name'],
      key: 'country',
    },
    {
      title: 'Status',
      dataIndex: 'freelancerStatus',
      key: 'freelancerStatus',
      render: (freelancerStatus: any, record: any) => (
        <div className="status-column">
          <Space style={{ cursor: 'pointer', textTransform: 'capitalize' }} onClick={() => setFreelancerId(record.id)}>
            {freelancerStatus?.name}
          </Space>
          <span onClick={() => setSelectedUserId(record.user.id)}>
            <Dropdown menu={menuProps} trigger={['click']}>
              <div className="icon">
                <SvgSelector id="chevron-down-svg" />
              </div>
            </Dropdown>
          </span>
        </div>
      ),
    },
    {
      title: intl.messages.experience && intl.formatMessage({ id: 'experience' }),
      dataIndex: 'jobExperience',
      key: 'jobExperience',
      render: (jobExperience?: string) =>
        jobExperience && intl.messages[jobExperience] && intl.formatMessage({ id: jobExperience }),
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`/admin/cv/${record.user.id}`}>
            <Button label="Open" className=" openBtn" />
          </Link>
        </Space>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            loading={resumeId == record.id && isDeleteLoading}
            label="Delete"
            className="deleteBtn"
            danger
            type='primary'
            onClick={() => setResumeId(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <StyledFreelancerList>
      <div className='users-header'>
        {totalItems !== undefined && (
          <h4 className="total">
            {intl.formatMessage({ id: 'total' })}&nbsp;{totalItems}
          </h4>
        )}
        <Button
          className='add-user-btn'
          label={intl.messages.add_user && intl.formatMessage({ id: 'add_user' })}
          onClick={() => {
            setSearchParams((params) => {
              params.set('add-user', 'mount');
              return params;
            });
          }}
        />
      </div>
      <Table loading={isLoading || isStatusUpdateLoading } dataSource={data} columns={columns} />
    </StyledFreelancerList>
  );
};
