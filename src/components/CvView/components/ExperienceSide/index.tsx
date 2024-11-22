import SvgSelector from 'assets/icons/SvgSelector';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Experience } from 'types/Experience';
import { EditWorkExperienceForm } from '../../Forms/EditWorkExperienceForm';
import { useWorkExperienceContext } from 'contexts/CreateCvContext/WorkExperienceContext';

interface Props {
  isEditMode: boolean;
  experiences: Experience[] | undefined;
}
const ExperienceSide = ({ experiences, isEditMode }: Props) => {
  const intl = useIntl();
  const [workExperienceModalOpen, setWorkExperienceModalOpen] = useState(false);
  const { state: experienceState, dispatch: experienceDispatch } = useWorkExperienceContext();

  useEffect(() => {
    if (experiences) {
      experienceDispatch({ type: 'SET_WORK_EXPERIENCE', payload: experiences });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences]);
  return (
    <>
      <div className="block-information">
        <h4 className="bar-title">{intl.messages.experience && intl.formatMessage({ id: 'experience' })}</h4>
        <div className="list">
          {experienceState && experienceState?.workExperiences && experienceState?.workExperiences?.length > 0 ? (
            experienceState?.workExperiences?.map((item, index) => (
              <div key={index} className="list-card">
                <p className="block-text">
                  {item?.dateFrom && (
                    <>
                      {item?.dateFrom && dayjs(item?.dateFrom).format('YYYY')}
                      {item?.dateTo
                        ? ` - ${dayjs(item?.dateTo).format('YYYY')}`
                        : ` - ${intl.messages.present && intl.formatMessage({ id: 'present' })}`}
                    </>
                  )}
                </p>
                <h5 className="cv-subtitle">{item.companyName}</h5>
                <h5 className="cv-subtitle-job">{item?.job}</h5>
                <p className="description">{item?.description}</p>
              </div>
            ))
          ) : (
            <p className="emptyText">{intl.messages.WorkNotfoundNotFound && intl.formatMessage({ id: 'WorkNotfoundNotFound' })}</p>
          )}
        </div>
        {isEditMode && (
          <button className="cv-body-edit-btn" onClick={() => setWorkExperienceModalOpen(true)}>
            <div className="cv-body-edit-icon">
              <SvgSelector id="edit-svg" />
            </div>
          </button>
        )}
      </div>

      <EditWorkExperienceForm open={workExperienceModalOpen} setOpen={setWorkExperienceModalOpen} />
    </>
  );
};

export default ExperienceSide;
