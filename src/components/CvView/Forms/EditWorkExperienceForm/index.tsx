import { useState } from 'react';
import { useIntl } from 'react-intl';
import { StyledEditWorkExperienceForm } from './style';
import { Button, Modal } from 'ui';
import { ExperienceActionForm, WorkExperienceFormList } from 'components';
import { smoothScroll } from 'utils/globalFunctions';

type EditWorkExperienceFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const EditWorkExperienceForm = ({ open, setOpen }: EditWorkExperienceFormProps) => {
  const intl = useIntl();
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
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
      <StyledEditWorkExperienceForm>
        <div className={`form ${!isActionModalVisible && 'active'}`}>
          <WorkExperienceFormList isDisableGet={true} handleOpenActionModal={handleOpenActionModal} />
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
          <ExperienceActionForm setActionModalVisible={setIsActionModalVisible} workExperienceId={workExperienceId} />
        </div>
      </StyledEditWorkExperienceForm>
    </Modal>
  );
};
