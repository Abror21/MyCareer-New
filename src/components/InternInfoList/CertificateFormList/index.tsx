import { useIntl } from 'react-intl';
import { StyledCertificateAdd } from './style';
import SvgSelector from 'assets/icons/SvgSelector';
import { useCertificateContext } from 'contexts/CreateCvContext/CertificateContext';
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

export const CertificateFormList = (props: Props) => {
  const { handleOpenActionModal, isDisableGet = false } = props;
  const { state, dispatch } = useCertificateContext();
  const { state: freelancerDataState } = useFreelancerDataContext();
  
  const intl = useIntl();
  const [searchparams, setSearchparams] = useSearchParams();
  const addUser = searchparams.get('add-user') ? searchparams.get('add-user') : null;

  const { isLoading, refetch: refetchCertificates } = useQueryApiClient({
    request: { url: '/api/certificate', method: 'GET', disableOnMount: isDisableGet },
    onSuccess: (res) => {
      if (addUser != 'mount') {
        dispatch({ type: 'SET_CERTIFICATE', payload: res.data });
      }
    },
  });

  useEffect(() => {
    if(addUser != 'mount' && freelancerDataState?.data?.certificates){
      refetchCertificates();
    }
  }, [freelancerDataState?.data?.certificates])

  return (
    <>
      <StyledCertificateAdd>
        <h1 className="title">{intl.messages.certificate && intl.formatMessage({ id: 'certificate' })}</h1>
        <div className="certificate-list">
          {isLoading && <Spinner children={intl.formatMessage({ id: 'loading...' })} spinning={true} />}
          {!isLoading && state?.certificates?.length === 0 && (
            <h3 className="not-avilable-warning">{intl.messages.CertificateNotFound && intl.formatMessage({ id: 'CertificateNotFound' })}</h3>
          )}
          {state?.certificates?.map((item, index) => (
            <div key={index}>
              <InternFormListItem
                item={item}
                handleOpenActionModal={handleOpenActionModal}
                dispatch={dispatch}
                formType="certificate"
              />
            </div>
          ))}
        </div>
        <div className="open-modal-btn" onClick={() => handleOpenActionModal('certificate')}>
          <SvgSelector id="plus-svg" />
          <span>{intl.messages.addCertificateBtn && intl.formatMessage({ id: 'addCertificateBtn' })}</span>
        </div>
      </StyledCertificateAdd>
    </>
  );
};
