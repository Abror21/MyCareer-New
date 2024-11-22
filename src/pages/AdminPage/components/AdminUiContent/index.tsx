import { Form } from 'antd';
import { StyledAdminUiContent } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import React, { useState } from 'react';
import { AdminPageTitle, Button, Input, Select, SelectOption } from 'ui';
import { UiContentList } from './components/UiContentList';
import { ConiformModal } from './components/ConiformModal';
import { ActionModalDataType, QueryParams, translationDataType } from './type';
import { ActionModal } from './components/ActionModal';
import { useIntl } from 'react-intl';
import { handleAccessDeniedError, smoothScroll } from 'utils/globalFunctions';
import { useUserDispatch, useUserState } from '../../../../contexts/UserContext';
import { uiSelectItems } from 'utils/consts';

const initialQeuryValues: QueryParams = {
  PageIndex: 1,
  PageSize: 20,
  key: '',
  IsDeleted: ""
};

export const AdminUiContent = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>(initialQeuryValues);
  const [form] = Form.useForm();
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const [translationData, setTranslationData] = useState<translationDataType | undefined>(undefined);
  const [actionModalData, setActionModalData] = useState<ActionModalDataType | undefined>();

  const { appendData: appenUiContentApi, isLoading: IsUiContentListLoading } = useQueryApiClient({
    request: {
      url: `/api/uicontent/all`,
      method: 'GET',
    },
    onSuccess(res) {
      setTranslationData(res.data);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('cms_translation', allowedPages, userDispatch);
      }
    },
  });

  const handleCloseModal = (isSuccess?: boolean) => {
    setActionModalData(undefined);
    form.resetFields();
    if (isSuccess) {
      appenUiContentApi(queryParams);
    }
  };

  const handleSearch = (changedFields: any[], allFields: any[]) => {
    appenUiContentApi(allFields);
    setQueryParams({ ...queryParams, ...allFields, PageIndex: 1 });
  };

  const handleOpenModal = (type: string, modalType: string, data?: any) => {
    setActionModalData({ type, modalType, data });
    if (type === 'update_ui_content') {
      form.setFieldsValue(data);
    }
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
    appenUiContentApi(data);
    smoothScroll('top', 95);
  };

  return (
    <StyledAdminUiContent>
      <AdminPageTitle label={intl.messages.translations && intl.formatMessage({ id: 'translations' })}/>
      <div className="search-side">
        <Form onValuesChange={handleSearch} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Input
            name="key"
            label={intl.messages.search_ui_content && intl.formatMessage({ id: 'search_ui_content' })}
          />
          <Select
            placeholder={intl.messages.all && intl.formatMessage({ id: 'all' })}
            allowClear={false}
            showSearch={false}
            name="IsDeleted"
            label={intl.formatMessage({ id: 'ui_select_label' })}
          >
            {uiSelectItems.map((selectItem, index) => (
              <React.Fragment key={index}>
                {intl.messages[selectItem.key] && (
                  <SelectOption value={selectItem?.value}>{intl.formatMessage({ id: selectItem.key })}</SelectOption>
                )}
              </React.Fragment>
            ))}
          </Select>
        </Form>
        <Button onClick={() => handleOpenModal('create_ui_content', 'action')} label="Create" type="primary" />
      </div>

      <UiContentList
        translationData={translationData}
        IsUiContentListLoading={IsUiContentListLoading}
        handleOpenModal={handleOpenModal}
        handlePaginationChange={handlePaginationChange}
        queryParams={queryParams}
      />
      <ActionModal actionModalData={actionModalData} handleCloseModal={handleCloseModal} form={form} />
      <ConiformModal actionModalData={actionModalData} handleCloseModal={handleCloseModal} />
    </StyledAdminUiContent>
  );
};
