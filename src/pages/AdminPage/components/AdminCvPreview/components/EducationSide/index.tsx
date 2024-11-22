import { useEducationContext } from 'contexts/CreateCvContext/EducationContext';
import { CvPageInterface } from 'pages/AdminPage/components/Types';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui';

import EducationListItem from './ListItem';

interface Props {
  cvData: CvPageInterface | undefined;
  handleOpenActionModal: (formName: string, id?: number) => void;
}
export const EducationSide = ({ cvData, handleOpenActionModal }: Props) => {
  const { state: educationState, dispatch: educationDispatch } = useEducationContext();
  const intl = useIntl();

  useEffect(() => {
    if (cvData?.educations) {
      educationDispatch({ type: 'SET_EDUCATIONS', payload: cvData?.educations });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvData]);

  return (
    <>
      <div className="bar-title education-bar">
        <h4>{intl.messages.education && intl.formatMessage({ id: 'education' })}</h4>
        {educationState && educationState?.educations && educationState?.educations.length > 0 && <h5>{intl.messages.verified && intl.formatMessage({ id: 'verified' })}</h5>} 

      </div>
      <div className="list">
        {educationState && educationState?.educations && educationState?.educations.length > 0 ? (
          educationState?.educations?.map((item, index) => (
            <EducationListItem cvData={cvData} handleOpenActionModal={handleOpenActionModal} item={item} key={index} />
          ))
        ) : (
          <p className="emptyText">{intl.messages.EducationNotFound && intl.formatMessage({ id: 'EducationNotFound' })}</p>
        )}
      </div>
      <div className="add-action-btn">
        <Button
          label={intl.messages.addEducationBtn && intl.formatMessage({ id: 'addEducationBtn' })}
          onClick={() => handleOpenActionModal('education')}
        />
      </div>
    </>
  );
};
