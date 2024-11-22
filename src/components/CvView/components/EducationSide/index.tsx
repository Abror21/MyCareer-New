import SvgSelector from 'assets/icons/SvgSelector';
import { useEducationContext } from 'contexts/CreateCvContext/EducationContext';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Education } from 'types/Education';
import { EditEducationForm } from '../../Forms/EditEducationForm';

interface Props {
  isEditMode: boolean;
  educations: Education[] | undefined;
}
const EducationSide = ({ educations, isEditMode }: Props) => {
  const intl = useIntl();
  const [educationModalOpen, setEducationModalOpen] = useState(false);

  const { state: educationState, dispatch: educationDispatch } = useEducationContext();
  useEffect(() => {
    if (educations) {
      educationDispatch({ type: 'SET_EDUCATIONS', payload: educations });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [educations]);
  return (
    <>
      <div className="block-information">
        <h4 className="bar-title">{intl.messages.education && intl.formatMessage({ id: 'education' })}</h4>
        <div className="list">
          {educationState && educationState?.educations && educationState?.educations?.length > 0 ?
            educationState?.educations?.map((item, index) => (
              <div key={index} className="list-card">
                <p className="block-text">
                  {item?.dateFrom && (
                    <>
                      {item?.dateFrom && dayjs(item?.dateFrom).format('YYYY')}
                      {item?.dateTo
                        ? ` - ${dayjs(item?.dateTo).format('YYYY')}`
                        : ` - ${intl.messages.attending && intl.formatMessage({ id: 'attending' })}`}
                    </>
                  )}
                </p>
                <h6 className="cv-subtitle">
                  <span>{`${item?.name && item?.name} | ${item?.location && item?.location}`}</span>
                  {item?.verified && <SvgSelector id="addverified" className="verified" />}
                </h6>
                <h6 className="programme-name">{item?.programme && item?.programme}</h6>
                <p className="description">{item?.degree && intl.formatMessage({ id: item?.degree })}</p>
              </div>
            )): <p className='emptyText'>{intl.messages.EducationNotFound && intl.formatMessage({id: "EducationNotFound"})}</p>}
        </div>
        {isEditMode && (
          <button className="cv-body-edit-btn" onClick={() => setEducationModalOpen(true)}>
            <div className="cv-body-edit-icon">
              <SvgSelector id="edit-svg" />
            </div>
          </button>
        )}
      </div>

      <EditEducationForm open={educationModalOpen} setOpen={setEducationModalOpen} />
    </>
  );
};

export default EducationSide;
