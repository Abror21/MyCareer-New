import { useCertificateContext } from 'contexts/CreateCvContext/CertificateContext';
import { CvPageInterface } from 'pages/AdminPage/components/Types';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui';
import SvgSelector from 'assets/icons/SvgSelector';
import dayjs from 'dayjs';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Modal } from 'antd';
import { useUserDispatch, useUserState } from '../../../../../../contexts/UserContext';
import { handleAccessDeniedError } from '../../../../../../utils/globalFunctions';

interface Props {
  cvData: CvPageInterface | undefined;
  handleOpenActionModal: (formName: string, id?: number) => void;
  FreelancerDataRefetch: () => void;
}
export const CertificateSide = ({ cvData, handleOpenActionModal, FreelancerDataRefetch }: Props) => {
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const { state: certificateState, dispatch: certificateDispatch } = useCertificateContext();
  const [certificateId, setCertificateId] = useState<number>(0);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const intl = useIntl();

  useEffect(() => {
    if (cvData?.certificates) {
      certificateDispatch({ type: 'SET_CERTIFICATE', payload: cvData?.certificates });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvData]);

  const { isLoading: isDeleteLoading, refetch: deleteCertificate } = useQueryApiClient({
    request: {
      url: `/api/certificate/${certificateId}`,
      method: 'DELETE',
    },
    onSuccess: () => {
      certificateDispatch({ type: 'DELETE_CERTIFICATE', payload: certificateId });
      handleClose();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const handleOpenDeleteModal = (id: number) => {
    setCertificateId(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    if (certificateId) {
      deleteCertificate();
    }
  };
  const handleClose = () => {
    setCertificateId(0);
    setDeleteModalVisible(false);
  };

  return (
    <>
      <div className="bar-title certificate-bar">
        <h4>{intl.messages.certificate && intl.formatMessage({ id: 'certificate' })}</h4>
      </div>
      <div className="list">
        {certificateState && certificateState?.certificates && certificateState?.certificates.length > 0 ? (
          certificateState?.certificates?.map((item, index) => (
            <div className="list-cv-preview" key={index}>
              <p className="date">
                {item.issuingDate && (
                  <>
                    {dayjs(item?.issuingDate).format('YYYY')}
                    {item?.expiringDate && '-'}
                    {item?.expiringDate && dayjs(item?.expiringDate).format('YYYY')}
                  </>
                )}
              </p>
              <h6 className="title">
                <span>{item.certificateName && item.certificateName} </span>
              </h6>
              <h6>{item.certificateProgramme}</h6>
              <div className="action-buttons">
                <Button
                  label={<SvgSelector id="edit-svg" className="edit-icon" />}
                  onClick={() => handleOpenActionModal('certificate', item.id)}
                />
                <Button
                  label={<SvgSelector id="close-svg" className="delete-icon" />}
                  onClick={() => handleOpenDeleteModal(item.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="emptyText">
            {intl.messages.CertificateNotFound && intl.formatMessage({ id: 'CertificateNotFound' })}
          </p>
        )}
      </div>
      {/* backen not ready for create certificate with user id */}
      <div className="add-action-btn">
        <Button
          label={intl.messages.addCertificateBtn && intl.formatMessage({ id: 'addCertificateBtn' })}
          onClick={() => handleOpenActionModal('certificate')}
        />
      </div>
      <Modal
        title={
          intl.messages.deleteCertificateConiformTitle && intl.formatMessage({ id: 'deleteCertificateConiformTitle' })
        }
        open={deleteModalVisible}
        onOk={handleDelete}
        confirmLoading={isDeleteLoading}
        onCancel={handleClose}
      >
        <p>
          {intl.messages.deleteCertificateConiformText && intl.formatMessage({ id: 'deleteCertificateConiformText' })}
        </p>
      </Modal>
    </>
  );
};
