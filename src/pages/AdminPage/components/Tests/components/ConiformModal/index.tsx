import { useUserDispatch, useUserState } from 'contexts/UserContext';
import { ActionModalDataType } from 'pages/AdminPage/components/AdminUiContent/type';
import React from 'react';
import { useIntl } from 'react-intl';
import { Modal } from 'ui';
import { handleAccessDeniedError } from 'utils/globalFunctions';
import useQueryApiClient from 'utils/useQueryApiClient';

interface Props {
  actionModalData: ActionModalDataType | undefined;
  handleCloseModal: (isSuccess?: boolean) => void;
}

export function ConiformModal({ actionModalData, handleCloseModal }: Props) {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();

  const handleOkModal = () => {
    if (actionModalData?.type === 'recover_user_test') RecoverTest();
    else DeleteTest();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const { refetch: DeleteTest } = useQueryApiClient({
    request: {
      url: `/api/learning-programs/${actionModalData?.data?.id}`,
      method: 'DELETE',
    },
    onSuccess() {
      // getTests();
      handleCloseModal(true);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('tests', allowedPages, userDispatch);
      }
    },
  });

  const { refetch: RecoverTest } = useQueryApiClient({
    request: { url: `/api/learning-programs/${actionModalData?.data?.id}/recover`, method: 'POST' },
    onSuccess() {
      handleCloseModal(true)
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('tests', allowedPages, userDispatch);
      }
    },

  });

  return (
    <React.Fragment>
      <Modal
        width={520}
        open={actionModalData?.modalType === 'coniform'}
        onOk={handleOkModal}
        onCancel={handleCancel}
        okText={intl.formatMessage({ id: 'yes' })}
        cancelText={intl.formatMessage({ id: 'no' })}
      >
        <p>{intl.formatMessage({ id: actionModalData?.type ? actionModalData?.type : 'modal' })}</p>
      </Modal>
    </React.Fragment>
  );
}
