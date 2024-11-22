import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib';
import { useIntl } from 'react-intl';
import { Button, Table } from 'ui';
import { QueryParams, translationDataType } from '../../type';

interface Props {
  IsUiContentListLoading: boolean;
  translationData: translationDataType | undefined;
  handleOpenModal: (type: string, modalType: string, data?: any) => void;
  handlePaginationChange: (page: number, pageSize: number) => void;
  queryParams: QueryParams;
}
export const UiContentList = ({
  handlePaginationChange,
  IsUiContentListLoading,
  translationData,
  handleOpenModal,
  queryParams,
}: Props) => {
  const intl = useIntl();

  const columns = [
    {
      title: `${intl.messages.key_ui_content_table && intl.formatMessage({ id: 'key_ui_content_table' })}`,
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: `${intl.messages.english_ui_content && intl.formatMessage({ id: 'english_ui_content' })}`,
      dataIndex: 'textEn',
      key: 'textEn',
    },
    {
      title: `${intl.messages.russian_ui_content && intl.formatMessage({ id: 'russian_ui_content' })}`,
      dataIndex: 'textRu',
      key: 'textRu',
    },
    {
      title: `${intl.messages.uzbek_ui_content && intl.formatMessage({ id: 'uzbek_ui_content' })}`,
      dataIndex: 'textUz',
      key: 'textUz',
    },
    {
      title: `${intl.messages.is_deleted_ui_content && intl.formatMessage({ id: 'is_deleted_ui_content' })}`,
      dataIndex: 'isDeleted',
      key: 'isDeleted',
    },
    {
      title: `${intl.messages.action_ui_content && intl.formatMessage({ id: 'action_ui_content' })}`,
      key: 'actions',
      render: (text: any, record: any) => (
        <div className="action-btn">
          {record.isDeleted === 1 ? (
            <Button
              label={intl.messages.recover_button_ui_content && intl.formatMessage({ id: 'recover_button_ui_content' })}
              onClick={() => handleOpenModal('recover_ui_content', 'coniform', record)}
            />
          ) : (
            <div>
              <Button
                label={intl.messages.update && intl.formatMessage({ id: 'update' })}
                onClick={() => handleOpenModal('update_ui_content', 'action', record)}
              />
              <Button
                danger
                label={intl.messages.delete && intl.formatMessage({ id: 'delete' })}
                onClick={() => handleOpenModal('delete_ui_content', 'coniform', record)}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <Button className="pagination-btn prev" label={intl.messages.previous && intl.formatMessage({ id: 'previous' })} />;
    }
    if (type === 'next') {
      return <Button className="pagination-btn next" label={intl.messages.next && intl.formatMessage({ id: 'next' })} />;
    }
    return originalElement;
  };

  return (
    <>
      <Table loading={IsUiContentListLoading} dataSource={translationData?.items} columns={columns} disablePagination />
      <div className="pagination">
        {translationData && translationData?.totalPages > 1 && (
          <Pagination
            total={translationData?.totalItems}
            pageSize={translationData?.itemsPerPage}
            itemRender={itemRender}
            onChange={handlePaginationChange}
            hideOnSinglePage={true}
            current={queryParams.PageIndex}
          />
        )}
      </div>
    </>
  );
};
