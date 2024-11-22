import React, { useState } from 'react';
import { StyledTestsPage } from './style';
import { TestList } from './components/TestList';
import { ActionModalDataType } from '../AdminUiContent/type';
import { Form, Pagination, PaginationProps } from 'antd';
import { ConiformModal } from './components/ConiformModal';
import { ActionModal } from './components/ActionModal';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Button } from 'ui';
import { programmDataType } from '../Types';
import { useIntl } from 'react-intl';
import { smoothScroll } from 'utils/globalFunctions';

interface QueryParams {
  PageIndex: number;
  PageSize: number;
}

const initialQeuryValues: QueryParams = {
  PageIndex: 1,
  PageSize: 20,
};

export function TestsPage() {
  const [queryParams, setQueryParams] = useState<QueryParams>(initialQeuryValues);
  const intl = useIntl();
  const [actionModalData, setActionModalData] = useState<ActionModalDataType | undefined>();
  const [form] = Form.useForm();
  const [programmData, setProgrammData] = useState<programmDataType | null>(null);

  const handleOpenModal = (type: string, modalType: string, data?: any) => {
    setActionModalData({ type, modalType, data });
    if (type === 'update_user_test') {
      form.setFieldsValue(data);
    }
  };

  const handleCloseModal = (isSuccess?: boolean) => {
    setActionModalData(undefined);
    form.resetFields();
    if (isSuccess) {
      appendData(queryParams);
    }
  };

  const { isLoading, appendData } = useQueryApiClient({
    request: { url: '/api/learning-programs/filter?IncludeDeleted=true', method: 'GET' },
    onSuccess(response) {
      setProgrammData(response);
    },
  });

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
    appendData(data);
    smoothScroll('top', 95);
  };

  return (
    <StyledTestsPage>
      <div className="create-inner">
        <Button onClick={() => handleOpenModal('create_new_test', 'action')} type="primary" label="Create" />
      </div>
      <TestList isLoading={isLoading} programmData={programmData} handleOpenModal={handleOpenModal} />
      {programmData && programmData?.totalPages > 1 && (
        <Pagination
          total={programmData?.totalItems}
          pageSize={programmData?.itemsPerPage}
          itemRender={itemRender}
          onChange={handlePaginationChange}
          hideOnSinglePage={true}
          current={queryParams.PageIndex}
        />
      )}
      <ActionModal actionModalData={actionModalData} handleCloseModal={handleCloseModal} form={form} />
      <ConiformModal actionModalData={actionModalData} handleCloseModal={handleCloseModal} />
    </StyledTestsPage>
  );
}
