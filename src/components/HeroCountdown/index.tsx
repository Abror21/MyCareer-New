import { useIntl } from 'react-intl';
import React from 'react';
import { StyledHeroCountdown } from './style';
import { Button } from 'ui';

export const HeroCountdown = () => {
  const intl = useIntl();

  return (
    <StyledHeroCountdown>
      <div className="container inner">
        <h1
          className="title title--started"
          dangerouslySetInnerHTML={{
            __html: intl.messages.registrationStarted && intl.formatMessage({ id: 'registrationStarted' }),
          }}
        ></h1>

        <div className="buttons">
          <Button
            label={intl.messages.learnMore && intl.formatMessage({ id: 'learnMore' })}
            type="primary"
            className="btn primary-btn learn-more-btn"
            href="/trainings"
          />
        </div>
      </div>
    </StyledHeroCountdown>
  );
};
