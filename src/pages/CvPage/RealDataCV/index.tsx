import { StyledCvPage } from './style';
import CvBg from 'assets/images/cv-background.jpg';
import { useIntl } from 'react-intl';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useEffect, useState } from 'react';
import { RealCvInterface } from 'types/RealCV';
import { CvView } from 'components';
import SvgSelector from 'assets/icons/SvgSelector';
import DefaultLayout from 'layouts/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { BackButton, Spinner } from 'ui';
import { smoothScroll } from 'utils/globalFunctions';
import useJwt from '../../../utils/useJwt';
import { useUserState } from '../../../contexts/UserContext';
import fileDownload from 'js-file-download';

export const RealDataCV = () => {
  const intl = useIntl();
  const { remove } = useJwt();
  const [cvData, setCvData] = useState<RealCvInterface>({});
  const [id, setId] = useState<number>(0)
  const navigate = useNavigate();
  const { role } = useUserState();

  useEffect(() => {
    smoothScroll('top', -100);
  }, []);

  const { data } = useQueryApiClient({
    request: {
      url: `api/user/profile`,
      method: 'GET',
    },
    onSuccess: (response) => {
      if (!response.data.freelancer) navigate('/create-cv');
      else {
        setCvData(response?.data.freelancer);
        setId(response?.data.id);
      }
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        if (role === 'Intern') {
          remove();
          localStorage.clear();
          return;
        }
        navigate('/unauthorized');
      }
    },
  });

  const { isLoading: isDownloadLoading, refetch: refetchPdfFileGet } = useQueryApiClient({
    request: {
      url: `/api/freelancer/${id}/generate-cv-pdf`,
      method: 'GET',
      disableOnMount: true,
      multipart: true,
    },
    onSuccess: (response) => {
      fileDownload(response, `${cvData?.lastName}-${cvData?.firstName}.pdf`);
    },
    onError: (error) => {
        if (error.error === 'access_denied') {
          if (role === 'Intern') {
            remove();
            localStorage.clear();
            return;
          }
          navigate('/unauthorized');
        }
    },
  });

  return (
    <DefaultLayout.PageContent>
      <StyledCvPage>
        {!data.data ? (
          <div className="spinner">
            <Spinner spinning={true} />
          </div>
        ) : (
          <>
            <img loading='lazy' className="background-image" src={CvBg} alt="bg" />
            <SvgSelector className="create_cv_icon" id="circle1" />
            <div className="container">
              <div className="navigate-back">
                <BackButton label={intl.messages.back && intl.formatMessage({ id: 'back' })} color="white" onClick={() => navigate(-1)} />
              </div>
              <h3 className="title-page">
                {intl.messages.your && intl.formatMessage({ id: 'your' })} <span>{intl.messages.cv && intl.formatMessage({ id: 'cv' })}</span>
              </h3>
              {cvData && <CvView isDownloadLoading={isDownloadLoading} refetchPdfFileGet={refetchPdfFileGet} cvData={cvData} isRealDataCv={cvData.isRealDataCv} />}
            </div>
          </>
        )}
      </StyledCvPage>
    </DefaultLayout.PageContent>
  );
};
