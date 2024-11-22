import SvgSelector from 'assets/icons/SvgSelector';
import { useCertificateContext } from 'contexts/CreateCvContext/CertificateContext';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Certificate } from 'types/Certificate';
import { EditCertificateForm } from '../../Forms/EditCertificateForm';
interface Props {
  isEditMode: boolean;
  certificates: Certificate[] | undefined;
}
const CertificateSide = ({ certificates, isEditMode }: Props) => {
  const intl = useIntl();
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  const { state: certificateState, dispatch: certificateDispatch } = useCertificateContext();
  useEffect(() => {
    if (certificates) {
      certificateDispatch({ type: 'SET_CERTIFICATE', payload: certificates });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificates]);
  return (
    <>
      <div className="block-information">
        <h4 className="bar-title">{intl.messages.certificate && intl.formatMessage({ id: 'certificate' })}</h4>
        <div className="list">
          {certificateState && certificateState?.certificates && certificateState?.certificates?.length > 0 ? (
            certificateState?.certificates?.map((item, index) => (
              <div key={index} className="list-card">
                <p className="block-text">
                  {item?.issuingDate && (
                    <>
                      {item?.issuingDate && dayjs(item.issuingDate).format('YYYY')}
                      {item.expiringDate && ` - ${dayjs(item.expiringDate).format('YYYY')}`}
                    </>
                  )}
                </p>
                <h6 className="cv-subtitle">
                  <span>{item?.certificateName && item?.certificateName} </span>
                  {/*TODO: temporarily removed, api is not ready*/}
                  {/*<SvgSelector id="addverified" className="verified" />*/}
                </h6>
                <h6 className="programme-name">{item?.certificateProgramme && item?.certificateProgramme}</h6>
              </div>
            ))
          ) : (
            <p className="emptyText">{intl.messages.CertificateNotFound && intl.formatMessage({ id: 'CertificateNotFound' })}</p>
          )}
        </div>
        {isEditMode && (
          <button className="cv-body-edit-btn" onClick={() => setCertificateModalOpen(true)}>
            <div className="cv-body-edit-icon">
              <SvgSelector id="edit-svg" />
            </div>
          </button>
        )}
      </div>
      <EditCertificateForm open={certificateModalOpen} setOpen={setCertificateModalOpen} />
    </>
  );
};

export default CertificateSide;
