import { StyledActionModal } from './style';
import SvgSelector from 'assets/icons/SvgSelector';
import { CertificateActionForm, EducationActionForm } from 'components';

import React from 'react';

type Props = {
  setActionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionModalData: { formName?: string; id?: number };
};

export const ActionForms = (props: Props) => {
  const { setActionModalVisible, actionModalData } = props;

  return (
    <StyledActionModal>
      <div className="action-forms">
        {actionModalData?.formName === 'education' ? (
          <EducationActionForm actionModalData={actionModalData} setActionModalVisible={setActionModalVisible} />
        ) : (
          <CertificateActionForm actionModalData={actionModalData} setActionModalVisible={setActionModalVisible} />
        )}
      </div>
      <div className="action-buttons">
        <span onClick={() => setActionModalVisible(false)}>
          <SvgSelector id="blue-chevron-svg" className="right-svg" />
        </span>
      </div>
    </StyledActionModal>
  );
};
