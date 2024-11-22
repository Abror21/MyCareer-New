import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { StyledEditCertificateForm } from './style';
import { Button, Modal } from 'ui';
import { CertificateActionForm } from 'components/ActionModalForms/CertificateActionForm';
import { CertificateFormList } from 'components';
import { smoothScroll } from 'utils/globalFunctions';
import SvgSelector from 'assets/icons/SvgSelector';

type EditCertificateFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditCertificateForm = ({ open, setOpen }: EditCertificateFormProps) => {
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [actionModalData, setActionModalData] = useState({});

  const intl = useIntl();

  const handleOpenActionModal = (formName?: string, id?: Number) => {
    setActionModalData({
      formName,
      id,
    });
    setIsActionModalVisible(true);
    smoothScroll('top', 180);
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      okText={intl.messages.save && intl.formatMessage({ id: 'save' })}
      wrapClassName="edit-intern-cv-modal-wrapper"
      footer={[]}
    >
      <StyledEditCertificateForm>
        <div className={`form ${!isActionModalVisible && 'active'}`}>
          <CertificateFormList isDisableGet={true} handleOpenActionModal={handleOpenActionModal} />
          <div className="cancel">
            <Button
              key="cancel"
              label={intl.messages.close && intl.formatMessage({ id: 'close' })}
              type="default"
              className="cancel-btn"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
        <div className={`action-modal ${isActionModalVisible ? 'action-modal-visible' : 'action-modal-hidden'}`}>
          <CertificateActionForm actionModalData={actionModalData} setActionModalVisible={setIsActionModalVisible} />
          <div className="action-buttons">
            <span onClick={() => setIsActionModalVisible(false)}>
              <SvgSelector id="blue-chevron-svg" className="right-svg" />
            </span>
          </div>
        </div>
      </StyledEditCertificateForm>
    </Modal>
  );
};
