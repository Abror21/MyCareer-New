import SvgSelector from 'assets/icons/SvgSelector';
import { StyledAdminFooter } from './style';
import { useIntl } from 'react-intl';
import { FixedScrollUpButton } from 'ui';

export const AdminFooter = () => {
  const intl = useIntl();

  return (
    <>
      <StyledAdminFooter>
        <div className="links">
          <h3>
            {`@ ${new Date().getFullYear()}`} {intl.messages.myCareer && intl.formatMessage({ id: 'myCareer' })}
          </h3>
          <span></span>
          <ul>
            <li>{intl.messages.privacyStatement && intl.formatMessage({ id: 'privacyStatement' })}</li>
            <li>{intl.messages.cookies && intl.formatMessage({ id: 'cookies' })}</li>
          </ul>
        </div>
        <div className="social-media">
          <div className="item">
            <div className="icon">
              <SvgSelector id="email-svg" />
            </div>
            <span>info@mycareer.uz</span>
          </div>
          <div className="item">
            <div className="icon">
              <SvgSelector id="twitter-svg" />
            </div>
            <span>Twitter</span>
          </div>
        </div>
      </StyledAdminFooter>
      <FixedScrollUpButton />
    </>
  );
};
