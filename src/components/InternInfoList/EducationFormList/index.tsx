import { useIntl } from 'react-intl';
import { StyledEducationAdd } from './style';
import SvgSelector from 'assets/icons/SvgSelector';
import { useEducationContext } from 'contexts/CreateCvContext/EducationContext';
import { Spinner } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { InternFormListItem } from '../InternFormListItem';
import { useSearchParams } from 'react-router-dom';
import { useFreelancerDataContext } from 'contexts/CreateCvContext/FreelancerData';
import { useEffect } from 'react';

type Props = {
  handleOpenActionModal: (formName?: string, id?: number) => void;
  isDisableGet?: boolean;
};

export const EducationFormList = (props: Props) => {
  const { handleOpenActionModal, isDisableGet = false } = props;
  const { state, dispatch } = useEducationContext();
  const { state: freelancerDataState } = useFreelancerDataContext();
  const intl = useIntl();
  const [searchparams, setSearchparams] = useSearchParams();
  const addUser = searchparams.get('add-user') ? searchparams.get('add-user') : null;

  const { isLoading, refetch: refetchEducations } = useQueryApiClient({
    request: { url: '/api/education', method: 'GET', disableOnMount: isDisableGet },
    onSuccess: (res) => {
      if (addUser != 'mount') {
        dispatch({ type: 'SET_EDUCATIONS', payload: res.data });
      }
    },
  });

  useEffect(() => {
    if(addUser != 'mount' && freelancerDataState?.data?.educations){
      refetchEducations();
    }
  }, [freelancerDataState?.data?.educations])
  
  return (
    <>
      <StyledEducationAdd>
        <h1 className="title">{intl.messages.education && intl.formatMessage({ id: 'education' })}</h1>
        <div className="education-list">
          {isLoading && <Spinner children={intl.formatMessage({ id: 'loading...' })} spinning={true} />}
          {!isLoading && state?.educations?.length === 0 && (
            <h3 className="not-avilable-warning">{intl.messages.EducationNotFound && intl.formatMessage({ id: 'EducationNotFound' })}</h3>
          )}
          {state?.educations?.map((item, index) => (
            <div key={index}>
              <InternFormListItem
                item={item}
                handleOpenActionModal={handleOpenActionModal}
                dispatch={dispatch}
                formType="education"
              />
            </div>          
          ))}
        </div>
        <div className="open-modal-btn" onClick={() => handleOpenActionModal('education')}>
          <SvgSelector id="plus-svg" />
          <span>{intl.messages.addEducationBtn && intl.formatMessage({ id: 'addEducationBtn' })}</span>
        </div>
      </StyledEducationAdd>
    </>
  );
};
