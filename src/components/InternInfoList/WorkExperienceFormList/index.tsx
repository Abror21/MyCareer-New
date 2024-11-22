import SvgSelector from 'assets/icons/SvgSelector';
import { useIntl } from 'react-intl';
import { StyledWorkExperienceForm } from './style';
import { useWorkExperienceContext } from 'contexts/CreateCvContext/WorkExperienceContext';
import { Spinner } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { InternFormListItem } from '../InternFormListItem';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useFreelancerDataContext } from 'contexts/CreateCvContext/FreelancerData';

type Props = {
  handleOpenActionModal: (formName?: string, id?: number) => void;
  isDisableGet?: boolean;
};
export const WorkExperienceFormList = (props: Props) => {
  const { handleOpenActionModal, isDisableGet = false } = props;
  const { state, dispatch } = useWorkExperienceContext();
  const { state: freelancerDataState } = useFreelancerDataContext();
  const intl = useIntl();
  const [searchparams, setSearchparams] = useSearchParams();
  const addUser = searchparams.get('add-user') ? searchparams.get('add-user') : null;

  const { isLoading, refetch: refetchExperiences } = useQueryApiClient({
    request: { url: '/api/experience/get-experience-userId', method: 'GET', disableOnMount: isDisableGet },
    onSuccess: (res) => {
      if (addUser != 'mount') {
        dispatch({ type: 'SET_WORK_EXPERIENCE', payload: res.data });
      }
    },
  });

  useEffect(() => {
    if(addUser != 'mount' && freelancerDataState?.data?.experiences){
      refetchExperiences();
    }
  }, [freelancerDataState?.data?.experiences])

  if (isLoading) {
    return <Spinner children={intl.formatMessage({ id: 'loading...' })} spinning={true} />;
  }

  return (
    <StyledWorkExperienceForm>
      <h1 className="title">{intl.messages.workExperience && intl.formatMessage({ id: 'workExperience' })}</h1>
      <div className="work-experience-list">
        {!isLoading && state?.workExperiences?.length === 0 && (
          <h3 className="not-avilable-warning">{intl.messages.WorkNotfoundNotFound && intl.formatMessage({ id: 'WorkNotfoundNotFound' })}</h3>
        )}
        {state?.workExperiences?.map((item, index) => (
          <div key={index}>
            <InternFormListItem item={item} handleOpenActionModal={handleOpenActionModal} dispatch={dispatch} />
          </div>
        ))}
      </div>
      <div className="open-modal-btn" onClick={() => handleOpenActionModal()}>
        <SvgSelector id="plus-svg" />
        <span>{intl.messages.addWorkExBtn && intl.formatMessage({ id: 'addWorkExBtn' })}</span>
      </div>
    </StyledWorkExperienceForm>
  );
};
