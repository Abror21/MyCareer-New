import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { StyledTalentsPage } from './style';
import { TalentsList } from './Components/TalentsList';
import { smoothScroll } from 'utils/globalFunctions';
import { Breadcrumb } from 'ui';

export const TalentsPage = () => {
  const intl = useIntl();

  useEffect(() => {
    smoothScroll('top', -100);
  }, []);

  return (
    <StyledTalentsPage>
      <div className="container">
        <div className="talents-inner">
          <Breadcrumb
            items={[
              {
                title: <a href="/">{intl.messages.home && intl.formatMessage({ id: 'home' })}</a>,
              },
              {
                title: <h6>{intl.messages.talents && intl.formatMessage({ id: 'talents' })}</h6>,
              },
            ]}
          />
          <div className="title">
            <h1>{intl.messages.talents && intl.formatMessage({ id: 'talents' })}</h1>
          </div>
          <TalentsList />
        </div>
      </div>
    </StyledTalentsPage>
  );
};
