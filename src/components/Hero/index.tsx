import { useIntl } from 'react-intl';

import { StyledHero } from './style';
import { Button } from 'ui';
import SvgSelector from 'assets/icons/SvgSelector';
import Cookies from 'js-cookie';

export const Hero = () => {
  const intl = useIntl();
  const hasJwt = !!Cookies.get('jwt');

  return (
    <StyledHero>
      <div className="overlay" />
      <div className="container inner">
        <h1 className="title" dangerouslySetInnerHTML={{ __html: intl.messages.heroTitle &&  intl.formatMessage({ id: 'heroTitle' }) }}></h1>

        <div className="buttons">
          {!hasJwt && (
            <Button
              label={intl.messages.login && intl.formatMessage({ id: 'login' })}
              type="primary"
              className="btn login-btn primary-btn"
              href="/login"
            />
          )}

          <Button
            label={intl.messages.learnMore && intl.formatMessage({ id: 'learnMore' })}
            type="default"
            className="btn secondary-btn"
            href="/about-us"
          />
        </div>
      </div>

      <div className="background-elements">
        <SvgSelector id="diagonalElement" className="diagonal" />
        <SvgSelector id="curve" className="curve" />
        <SvgSelector id="circle1" className="circle1" />
        <SvgSelector id="circle2" className="circle2" />
        <SvgSelector id="circle3" className="circle3" />
        <SvgSelector id="circle4" className="circle4" />
      </div>
    </StyledHero>
  );
};
