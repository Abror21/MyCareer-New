import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { StyledInternCabinetCVPage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { CvView } from '../../components';
import { smoothScroll } from 'utils/globalFunctions';
import { useUserDispatch, useUserState } from 'contexts/UserContext';
import { BackButton } from 'ui';
import { Spinner } from 'ui';
import useJwt from '../../utils/useJwt';
import fileDownload from 'js-file-download';

export const InternCabinetCVPage = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { remove } = useJwt();
  const { dispatch: userDispatch } = useUserDispatch();
  const { refresh, role } = useUserState();
  const [id, setId] = useState<number>(0)

  useEffect(() => {
    smoothScroll('top', -100);
  }, []);

  useEffect(() => {
    refresh && fetchUserProfile();
  }, [refresh]);

  const {
    data: { data },
    isLoading,
    refetch: fetchUserProfile,
  } = useQueryApiClient({
    request: {
      url: 'api/user/profile',
      method: 'GET',
    },
    onSuccess: (response) => {
      userDispatch({
        type: 'SET_USER_DATA',
        payload: {
          refresh: false,
          image: response.data.freelancer?.image?.resizedPath200 || response.data.freelancer?.image?.path || '',
        },
      });
      setId(response?.data?.id)
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
      fileDownload(response, `${data?.freelancer.lastName}-${data?.freelancer?.firstName}.pdf`);
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
    <StyledInternCabinetCVPage>
      <div className="container">
        <div className="cv-preview">
          <div className="back">
            <BackButton label={intl.messages.back && intl.formatMessage({ id: 'back' })} color="green" onClick={() => navigate(-1)} />
          </div>
          <Spinner spinning={isLoading} dontRender>
            {
              data &&
              <CvView
                cvData={data.freelancer}
                isRealDataCv={true}
                isEditMode={true}
                isDownloadLoading={isDownloadLoading}
                refetchPdfFileGet={refetchPdfFileGet}
              />
            }
          </Spinner>
        </div>
      </div>
    </StyledInternCabinetCVPage>
  );
};
