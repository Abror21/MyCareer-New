import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Modal, Select, SelectOption } from 'ui';
import { useIntl } from 'react-intl';
import { useForm } from 'antd/lib/form/Form';
import { Form, Typography } from 'antd';
import { User } from 'types/User';
import { Role } from 'types/Role';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useUserDispatch, useUserState } from '../../../../../../contexts/UserContext';
import { handleAccessDeniedError } from '../../../../../../utils/globalFunctions';

type Page = {
  id: number;
  key: string;
  path: string;
  createdAt: string;
  updatedAt: string | null;
};

type EditPermissionsFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  user: User | null;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  getEmployeesList: () => void
  getInternsList: () => void;
};
export const EditPermissionsForm = ({ open, setOpen, user, setRefresh, getInternsList, getEmployeesList }: EditPermissionsFormProps) => {
  const intl = useIntl();
  const [form] = useForm();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const [allPages, setAllPages] = useState([]);
  const [filteredPages, setFilteredPages] = useState([]);

  useQueryApiClient({
    request: {
      url: `/api/frontend-page/all`,
      method: 'GET',
    },
    onSuccess: (response) => {
      setAllPages(response.data);
      setFilteredPages(response.data);
    },
  });

  const { data: allRoles } = useQueryApiClient({
    request: {
      url: `/api/role/get-admin-and-intern-roles`,
      method: 'GET',
    },
  });

  const { appendData } = useQueryApiClient({
    request: {
      url: `/api/user-permissions`,
      method: 'PUT',
    },
    onSuccess: () => {
      setRefresh(true);
      setOpen(false);
      getEmployeesList();
      getInternsList()
      form.resetFields();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('user_permission', allowedPages, userDispatch);
      }
    },
  });

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        pages: user.pages?.map((item) => item.page.id) || null,
        position: user.role?.id,
      });

      if (user.role.name === 'Intern') {
        const filteredArray = allPages && allPages.filter((page: { key: string }) => page.key === 'intern');
        setFilteredPages(filteredArray);
      }
    }
  }, [user, open]);

  const position = Form.useWatch('position', form);

  useEffect(() => {
    if (position !== 6) {
      // intern roleId
      setFilteredPages(allPages);
    } else {
      const filteredArray = allPages && allPages.filter((page: { key: string }) => page.key === 'intern');
      setFilteredPages(filteredArray);
      form.setFieldsValue({
        pages: [1],
      });
    }
  }, [position]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinish = (values: any) => {
    const postData = {
      userId: user && user.id,
      roleId: values.position,
      pageIds: values.pages,
    };

    appendData(postData);
  };

  return (
    <Modal
      destroyOnClose
      title={intl.messages.editUserPermissions && intl.formatMessage({ id: 'editUserPermissions' })}
      forceRender
      width={520}
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      wrapClassName="admin-modal-wrapper"
      footer={[
        <Button
          key="cancel"
          label={intl.messages.cancel && intl.formatMessage({ id: 'cancel' })}
          type="default"
          className="admin-cancel-btn"
          onClick={() => {
            setOpen(false);
            form.resetFields();
          }}
        />,
        <Button
          key="submit"
          label={intl.messages.save && intl.formatMessage({ id: 'save' })}
          type="primary"
          htmlType="submit"
          className="admin-save-btn"
          onClick={handleSubmit}
        />,
      ]}
    >
      <Form form={form} layout="horizontal" className="edit-permissions-form" onFinish={onFinish}>
        <Form.Item label={intl.messages.name && intl.formatMessage({ id: 'name' })}>
          <Typography.Text className="ant-form-text" type="secondary">
            {user && user.name ? user.name : '-'}
          </Typography.Text>
        </Form.Item>
        <Form.Item label={intl.messages.surname && intl.formatMessage({ id: 'surname' })}>
          <Typography.Text className="ant-form-text" type="secondary">
            {user && user.surname ? user.surname : '-'}
          </Typography.Text>
        </Form.Item>
        <Form.Item label={intl.messages.email && intl.formatMessage({ id: 'email' })}>
          <Typography.Text className="ant-form-text" type="secondary">
            {user && user.email}
          </Typography.Text>
        </Form.Item>
        <div className="admin-positions-select">
          <Select
            name="position"
            label={intl.messages.position && intl.formatMessage({ id: 'position' })}
            variant="borderless"
          >
            {allRoles &&
              allRoles.data &&
              allRoles.data.map((option: Role) => (
                <SelectOption key={option.id} value={option.id}>
                  {intl.messages[option.name] && intl.formatMessage({ id: option.name })}
                </SelectOption>
              ))}
          </Select>
        </div>
        <div className="admin-pages-select">
          <Select
            name="pages"
            label={intl.messages.pages && intl.formatMessage({ id: 'pages' })}
            variant="borderless"
            mode={'multiple'}
            placeholder="-"
          >
            {filteredPages &&
              filteredPages?.map((option: Page) => (
                <SelectOption key={option.id} value={option.id}>
                  {intl.messages[option.key] && intl.formatMessage({ id: option.key })}
                </SelectOption>
              ))}
          </Select>
        </div>
      </Form>
    </Modal>
  );
};
