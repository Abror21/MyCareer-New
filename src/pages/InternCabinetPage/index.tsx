import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import { useIntl } from 'react-intl';

import { StyledInternCabinetPage } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { routes } from 'config/config';
import SvgSelector from 'assets/icons/SvgSelector';
import { TalentCard } from 'components/TalentCard';
import { smoothScroll } from 'utils/globalFunctions';
import { useUserDispatch, useUserState } from 'contexts/UserContext';
import { Button, Spinner } from 'ui';
import useJwt from '../../utils/useJwt';
import { TestsStatusList } from './components/TestsStatusList';
import { TimeProvider } from 'utils/useTimeExpiration';

export const InternCabinetPage = () => {
  const intl = useIntl();
  const { remove } = useJwt();
  const navigate = useNavigate();
  const { dispatch: userDispatch } = useUserDispatch();
  const { refresh, role } = useUserState();

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
      if (!response.data.freelancer) navigate('/create-cv');
      else {
        userDispatch({
          type: 'SET_USER_DATA',
          payload: {
            refresh: false,
            image: response.data.freelancer?.image?.resizedPath200 || response.data.freelancer?.image?.path || '',
          },
        });
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

  return (
    <StyledInternCabinetPage>
      <div className="container">
        <div className="profile-inner">
          <Spinner spinning={isLoading} dontRender>
            <div className="profile-main">
              <div className="left">
                {data && data.freelancer?.image ? (
                  <div className="image">
                    <img loading='lazy' src={`${routes.api.baseUrl}/${data.freelancer?.image?.resizedPath600}`} alt="avatar" />
                  </div>
                ) : (
                  <div className="intern-cabinet-avatar">
                    <Avatar shape="square" icon={<SvgSelector className="avatar-icon" id="avatar-icon" />} />
                  </div>
                )}
                <div className="name">
                  {`${(data && data.freelancer?.firstName) || ''} ${(data && data.freelancer?.lastName) || ''}`}
                </div>
                <div className="email">
                  {data && (
                    <>
                      <div className="email-icon">
                        <SvgSelector id="email" />
                      </div>
                      {data && <>{data.freelancer?.email}</>}
                    </>
                  )}
                </div>
              </div>

              <div className="right">
                <div className="cv-status-badge">
                  <div className="cv-status">
                    <div className="verified-icon">
                      <SvgSelector id="addverified" />
                    </div>
                    <div className="cv-status-label">
                      {data &&
                        data.freelancer.freelancerStatus.description &&
                        intl.messages[data.freelancer?.freelancerStatus?.description] &&
                        intl.formatMessage({ id: `${data.freelancer?.freelancerStatus?.description}` })}
                    </div>
                  </div>
                </div>
                <div className="action-buttons">
                  <div className="links">
                    <Link to={'/purchase-services'} className="action-badge purchase-btn">
                      <SvgSelector id="purchase-service-svg" />
                      <div>{intl.messages.purchase_services && intl.formatMessage({ id: 'purchase_services' })}</div>
                    </Link>
                    <Link to="/profile/edit-cv" className="action-badge">
                      <SvgSelector id="edit-svg" />
                      <div>
                        {intl.messages.edit_your_existing_cv && intl.formatMessage({ id: 'edit_your_existing_cv' })}
                      </div>
                    </Link>
                    <Link
                      to="https://t.me/Automotive_CEO"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-badge telegram-badge"
                    >
                      <SvgSelector id="telegram" />
                      <div>
                        {intl.messages.connectWithTelegram && intl.formatMessage({ id: 'connectWithTelegram' })}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/*<div className="action-buttons">*/}
            {/*  <div className="links">*/}
            {/*    <Link*/}
            {/*      to="https://example.com"*/}
            {/*      target="_blank"*/}
            {/*      rel="noopener noreferrer"*/}
            {/*      className="action-badge telegram-badge"*/}
            {/*    >*/}
            {/*      <SvgSelector id="telegram" />*/}
            {/*      <div>{intl.formatMessage({ id: 'connectWithTelegram' })}</div>*/}
            {/*    </Link>*/}
            {/*    <Link to="/profile/edit-cv" className="action-badge">*/}
            {/*      <SvgSelector id="edit-svg" />*/}
            {/*      <div>{intl.formatMessage({ id: 'edit_your_existing_cv' })}</div>*/}
            {/*    </Link>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <TimeProvider><TestsStatusList data={data}/></TimeProvider>

            {data && data.freelancer && (
              <div className="profile-talent-card">
                <Link to={`/profile/cv`}>
                  <div className="talent-card-border">
                    <TalentCard talent={data.freelancer} isRealDataCv={data.freelancer?.isRealDataCv} />
                  </div>
                </Link>
              </div>
            )}
          </Spinner>
        </div>
      </div>
    </StyledInternCabinetPage>
  );
};
