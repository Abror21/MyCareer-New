import { useWorkExperienceContext } from 'contexts/CreateCvContext/WorkExperienceContext';
import { CvPageInterface } from 'pages/AdminPage/components/Types';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import SvgSelector from 'assets/icons/SvgSelector';
import { Button } from 'ui';
import dayjs from 'dayjs';
import { Modal } from 'antd';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useUserDispatch, useUserState } from 'contexts/UserContext';
import { handleAccessDeniedError } from '../../../../../../utils/globalFunctions';
interface Props {
  cvData: CvPageInterface | undefined;
  handleOpenActionModal: (formName: string, id?: number) => void;
}
export const WorkExperienceSide = ({ cvData, handleOpenActionModal }: Props) => {
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const { state: experienceState, dispatch: experienceDispatch } = useWorkExperienceContext();
  const intl = useIntl();
  const [experienceId, setExperienceId] = useState<number>(0);

  const { isLoading: isDeleteLoading, refetch: deleteExperience } = useQueryApiClient({
    request: {
      url: `/api/experience/${experienceId}`,
      method: 'DELETE',
    },
    onSuccess: () => {
      experienceDispatch({ type: 'DELETE_WORK_EXPERIENCE', payload: experienceId });
      setExperienceId(0);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  useEffect(() => {
    if (cvData?.experiences) {
      experienceDispatch({ type: 'SET_WORK_EXPERIENCE', payload: cvData?.experiences });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvData]);

  const handleOpenDeleteModal = (id: number) => {
    setExperienceId(id);
  };

  const handleDelete = () => {
    if (experienceId) {
      deleteExperience();
    }
  };

  return (
    <>
      <h4 className="bar-title">{intl.messages.experience && intl.formatMessage({ id: 'experience' })}</h4>
      <div className="list">
        {experienceState && experienceState?.workExperiences && experienceState?.workExperiences.length > 0 ? (
          experienceState?.workExperiences?.map((item, index) => (
            <div className="list-cv-preview" key={index}>
              <p className="date">
                {item.dateFrom && (
                  <>
                    {dayjs(item?.dateFrom).format('YYYY')}
                    {item.dateTo
                      ? ` - ${dayjs(item.dateTo).format('YYYY')}`
                      : ` - ${intl.messages.present && intl.formatMessage({ id: 'present' })}`}
                  </>
                )}
              </p>
              <h5 className="title-company">{item?.companyName}</h5>
              <h6 className="title-job">{item?.job}</h6>
              <p>{item?.description}</p>

              <div className="action-buttons">
                <Button
                  label={<SvgSelector id="edit-svg" className="edit-icon" />}
                  onClick={() => handleOpenActionModal('experience', item.id)}
                />
                <Button
                  label={<SvgSelector id="close-svg" className="delete-icon" />}
                  onClick={() => handleOpenDeleteModal(item.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="emptyText">
            {intl.messages.WorkNotfoundNotFound && intl.formatMessage({ id: 'WorkNotfoundNotFound' })}
          </p>
        )}
      </div>
      <div className="add-action-btn">
        <Button
          label={intl.messages.addWorkExBtn && intl.formatMessage({ id: 'addWorkExBtn' })}
          onClick={() => handleOpenActionModal('experience')}
        />
      </div>
      <Modal
        title={
          intl.messages.deleteExperienceConiformTitle && intl.formatMessage({ id: 'deleteExperienceConiformTitle' })
        }
        open={experienceId !== 0 ? true : false}
        onOk={handleDelete}
        confirmLoading={isDeleteLoading}
        onCancel={() => setExperienceId(0)}
      >
        <p>
          {intl.messages.deleteExperienceConiformText && intl.formatMessage({ id: 'deleteExperienceConiformText' })}
        </p>
      </Modal>
    </>
  );
};
