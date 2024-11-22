import React from 'react';

import { StyledAdminActionModal } from './style';
import { useParams } from 'react-router-dom';
import { CertificateActionForm, EducationActionForm, ExperienceActionForm } from 'components';
import { Modal } from 'ui';

type Props = {
  setActionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionModalData: any;
  isActionModalVisible: boolean;
  
};
export const ActionModal = (props: Props) => {
  const { setActionModalVisible, actionModalData, isActionModalVisible } = props;
  const { id } = useParams();
  return (
    <Modal
      open={isActionModalVisible}
      footer={null}
      onCancel={() => setActionModalVisible(false)}
      width={800}
      zIndex={1000}
    >
      <StyledAdminActionModal>
        <div className="action-forms">
          {actionModalData?.formName === 'education' ? (
            <EducationActionForm
              actionModalData={actionModalData}
              setActionModalVisible={setActionModalVisible}
              userId={id}
            />
          ) : actionModalData?.formName === 'certificate' ? (
            <CertificateActionForm
              actionModalData={actionModalData}
              setActionModalVisible={setActionModalVisible}
              userId={id}
            />
          ) : (
            <ExperienceActionForm
              workExperienceId={actionModalData.id}
              setActionModalVisible={setActionModalVisible}
              userId={id}
            />
          )}
        </div>
      </StyledAdminActionModal>
    </Modal>
  );
};
