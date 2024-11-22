import React from 'react';
import { StyledTestList } from './style';
import { useIntl } from 'react-intl';
import { Button, Table } from 'ui';
import { programmDataType } from 'pages/AdminPage/components/Types';

interface Props {
  handleOpenModal: (type: string, modalType: string, data?: any) => void;
  programmData: programmDataType | null;
  isLoading: boolean
}

export function TestList({ handleOpenModal, programmData, isLoading }: Props) {
  const intl = useIntl();

  const columns = [
    { title: intl.messages.link && intl.formatMessage({ id: 'link' }), dataIndex: 'link', key: 'link' },
    { title: intl.messages.id && intl.formatMessage({ id: 'id' }), dataIndex: 'cloudStudyId', key: 'cloudStudyId' },
    { title: intl.messages.ruProgram && intl.formatMessage({ id: 'ruProgram' }), dataIndex: 'name_ru', key: 'name_ru' },
    { title: intl.messages.enProgram && intl.formatMessage({ id: 'enProgram' }), dataIndex: 'name_en', key: 'name_en' },
    {
      title: intl.messages.uzbProgram && intl.formatMessage({ id: 'uzbProgram' }),
      dataIndex: 'name_uz',
      key: 'name_uz',
    },
    {
      title: intl.messages.is_deleted_ui_content && intl.formatMessage({ id: 'is_deleted_ui_content' }),
      dataIndex: 'isDeleted',
      key: 'isDeleted',
    },
    {
      title: intl.messages.action && intl.formatMessage({ id: 'action' }),
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => (
        <div className="action-btn">
          <div>
            {record.isDeleted === 1 ? (
              <Button
                label={
                  intl.messages.recover_button_ui_content && intl.formatMessage({ id: 'recover_button_ui_content' })
                }
                onClick={() => handleOpenModal('recover_user_test', 'coniform', record)}
              />
            ) : (
              <>
                <Button
                  onClick={() => handleOpenModal('update_user_test', 'action', record)}
                  label={intl.messages.update && intl.formatMessage({ id: 'update' })}
                />
                <Button
                  onClick={() => handleOpenModal('delete_user_test', 'coniform', record)}
                  danger
                  label={intl.messages.delete && intl.formatMessage({ id: 'delete' })}
                />
              </>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <StyledTestList>
      <Table loading={isLoading} dataSource={programmData?.items} columns={columns} disablePagination />
    </StyledTestList>
  );
}
