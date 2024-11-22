import { useState } from 'react';
import { StyledWorkExperience } from './style';
import { WorkExperienceProvider } from 'contexts/CreateCvContext/WorkExperienceContext';
import { smoothScroll } from 'utils/globalFunctions';
import { ExperienceActionForm, WorkExperienceFormList } from 'components';

type Props = {
  setIsActionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isActionModalVisible: boolean;
};
export const WorkExperienceForm = (props: Props) => {
  const { setIsActionModalVisible, isActionModalVisible } = props;
  const [workExperienceId, setWorkExperienceId] = useState(0);

  const handleOpenActionModal = (formName?: string, id?: number) => {
    if (id) {
      setWorkExperienceId(id);
    } else {
      setWorkExperienceId(0);
    }
    setIsActionModalVisible(true);
    smoothScroll('top', 180);
  };

  return (
    <WorkExperienceProvider>
      <StyledWorkExperience>
        <div className={`form ${!isActionModalVisible && 'active'}`}>
          <WorkExperienceFormList handleOpenActionModal={handleOpenActionModal} />
        </div>

        <div className={`action-modal ${isActionModalVisible ? 'action-modal-visible' : 'action-modal-hidden'}`}>
          <ExperienceActionForm setActionModalVisible={setIsActionModalVisible} workExperienceId={workExperienceId} />
        </div>
      </StyledWorkExperience>
    </WorkExperienceProvider>
  );
};
