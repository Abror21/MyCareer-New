import { Modal } from 'antd';
import { useIntl } from 'react-intl';
import useQueryApiClient from 'utils/useQueryApiClient';
import { ActionModalDataType } from '../../type';
import { useUserDispatch, useUserState } from '../../../../../../contexts/UserContext';
import { handleAccessDeniedError } from '../../../../../../utils/globalFunctions';
interface Props {
  actionModalData: ActionModalDataType | undefined;
  handleCloseModal: (isSuccess?: boolean) => void;
}
export const ConiformModal = (props: Props) => {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const { handleCloseModal, actionModalData } = props;

  const { refetch: RefetchDeleteUiContent } = useQueryApiClient({
    request: {
      url: `/api/uicontent/key?key=${actionModalData?.data?.key}`,
      method: 'DELETE',
    },
    onSuccess() {
      handleCloseModal(true);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('cms_translation', allowedPages, userDispatch);
      }
    },
  });

  const { refetch: RefetchChangeStatusUIContent } = useQueryApiClient({
    request: {
      url: `/api/uicontent/recover?key=${actionModalData?.data?.key}`,
      method: 'PUT',
    },
    onSuccess() {
      handleCloseModal(true);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('cms_translation', allowedPages, userDispatch);
      }
    },
  });

  const handleOkModal = () => {
    if (actionModalData?.type === 'delete_ui_content') {
      RefetchDeleteUiContent();
      return;
    }
    if (actionModalData?.type === 'recover_ui_content') {
      RefetchChangeStatusUIContent();
    }
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <>
      <Modal
        open={actionModalData?.modalType === 'coniform'}
        onOk={handleOkModal}
        onCancel={handleCancel}
        okText={intl.formatMessage({ id: 'yes' })}
        cancelText={intl.formatMessage({ id: 'no' })}
      >
        <p>{intl.formatMessage({ id: actionModalData?.type ? actionModalData?.type : 'modal' })}</p>
        {/* Are you sure to delete this item? */}
      </Modal>
    </>
  );
};
