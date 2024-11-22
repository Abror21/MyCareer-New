import { useIntl } from 'react-intl';
import { StyledContactLocationSide } from './style';
import { routes } from 'config/config';
import { useEffect } from 'react';
import { smoothScroll } from 'utils/globalFunctions';

export const LocationSide = () => {
  const intl = useIntl();

  useEffect(() => {
    smoothScroll('top', 0);
  }, []);
  return (
    <StyledContactLocationSide>
      <div className="location-inner container section-paddings">
        <div className="first-card-map card-map">
          <h4>{intl.messages.ourOfficeInLatvia && intl.formatMessage({ id: 'ourOfficeInLatvia' })}</h4>
          <iframe
            title="Latvia "
            src={routes.api.latviaLocationSrc}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map"
          ></iframe>
          <div className="map-footer">
            <div className="address">
              <h5>{intl.messages.address && intl.formatMessage({ id: 'address' })}</h5>
              <h6>{intl.messages.csLocationLv && intl.formatMessage({ id: 'csLocationLv' })}</h6>
            </div>
            <div className="email">
              <h5>{intl.messages.email && intl.formatMessage({ id: 'email' })}</h5>
              <h6>{intl.messages.emailLv && intl.formatMessage({ id: 'emailLv' })}</h6>
            </div>
            <div className="phone">
              <h5>{intl.messages.phone && intl.formatMessage({ id: 'phone' })}</h5>
              <h6>{intl.messages.phoneNumberLv && intl.formatMessage({ id: 'phoneNumberLv' })}</h6>
            </div>
          </div>
        </div>
        <div className="second-card-map card-map">
          <h4>{intl.messages.ourOfficeUzb && intl.formatMessage({ id: 'ourOfficeUzb' })}</h4>
          <iframe
            title="Uzbekistan"
            src={routes.api.uzbekistanLocationSrc}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map"
          ></iframe>
          <div className="map-footer">
            <div className="address">
              <h5>{intl.messages.address && intl.formatMessage({ id: 'address' })}</h5>
              <h6>{intl.messages.csLocationUz && intl.formatMessage({ id: 'csLocationUz' })}</h6>
            </div>
            <div className="email">
              <h5>{intl.messages.email && intl.formatMessage({ id: 'email' })}</h5>
              <h6>{intl.messages.emailUz && intl.formatMessage({ id: 'emailUz' })}</h6>
            </div>
            <div className="phone">
              <h5>{intl.messages.phone && intl.formatMessage({ id: 'phone' })}</h5>
              <h6>{intl.messages.phoneNumberUz && intl.formatMessage({ id: 'phoneNumberUz' })}</h6>
            </div>
          </div>
        </div>
      </div>
    </StyledContactLocationSide>
  );
};
