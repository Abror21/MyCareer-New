import { useState } from 'react';
import { ActionForms, Skills } from './Components';
import { StyledAddSkills } from './style';
import { EducationProvider } from 'contexts/CreateCvContext/EducationContext';
import { CertificateProvider } from 'contexts/CreateCvContext/CertificateContext';
import { smoothScroll } from 'utils/globalFunctions';
import { CertificateFormList, EducationFormList } from 'components';
import { FormInstance } from 'antd';

type Props = {
  isActionModalVisible: boolean;
  setIsActionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  skillForm:  FormInstance<any>;
};
export const AddSkillsForm = (props: Props) => {
  const { setIsActionModalVisible, isActionModalVisible, skillForm } = props;
  const [actionModalData, setactionModalData] = useState({});

  const handleOpenActionModal = (formName?: string, id?: Number) => {
    setactionModalData({
      formName,
      id,
    });
    setIsActionModalVisible(true);
    smoothScroll('top', 180);
  };
  return (
    <EducationProvider>
      <CertificateProvider>
        <StyledAddSkills>
          <div className={`form ${!isActionModalVisible && 'active'}`}>
            <Skills skillForm={skillForm} />
            <EducationFormList handleOpenActionModal={handleOpenActionModal} />
            <CertificateFormList handleOpenActionModal={handleOpenActionModal} />
          </div>
          <div className={`action-modal ${isActionModalVisible ? 'action-modal-visible' : 'action-modal-hidden'}`}>
            <ActionForms setActionModalVisible={setIsActionModalVisible} actionModalData={actionModalData} />
          </div>
        </StyledAddSkills>
      </CertificateProvider>
    </EducationProvider>
  );
};
