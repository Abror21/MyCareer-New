import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { StyledTalentViewPage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { CvView } from 'components';
import { smoothScroll } from 'utils/globalFunctions';
import { useIntl } from 'react-intl';
import { BackButton, Spinner } from 'ui';
import { RealCvInterface } from '../../types/RealCV';

export const TalentViewPage = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const params = useParams();
  const [cvData, setCvData] = useState<RealCvInterface>({});

  useEffect(() => {
    smoothScroll('top', -100);
  }, []);

  const { refetch: getCvDataById, isLoading } = useQueryApiClient({
    request: {
      url: `/api/freelancer/${params?.id}/real-data-cv`,
      method: 'GET',
    },
    onSuccess: (response) => {
      setCvData(response.data);
    },
  });

  return (
    <StyledTalentViewPage>
      <div className="container">
        <div className="navigate-back">
          <BackButton label={intl.messages.back && intl.formatMessage({ id: 'back' })} color="white" onClick={() => navigate(-1)} />
        </div>
        <div className="talent-view-inner">
          <Spinner spinning={isLoading} dontRender>
            {cvData && <CvView cvData={cvData} isRealDataCv={cvData.isRealDataCv} />}
          </Spinner>
        </div>
      </div>
    </StyledTalentViewPage>
  );
};
