import { useIntl } from 'react-intl';

import { StyledBenefits } from './style';
import { benefits } from 'utils/consts';
import SvgSelector from 'assets/icons/SvgSelector';

export const Benefits = () => {
  const intl = useIntl();

  return (
    <StyledBenefits>
      <div className="container section-paddings">
        <div className="title">
          <h3>{intl.messages.benefitsTitle && intl.formatMessage({ id: 'benefitsTitle' })}</h3>
        </div>
        <div className="cards">
          {benefits.map((item) => (
            <div className="card" key={item.key}>
              <div className="icon">
                <SvgSelector id={item.icon} />
              </div>
              <h4 className="text">{intl.messages[item.key] && intl.formatMessage({ id: item.key })}</h4>
            </div>
          ))}
        </div>
      </div>
    </StyledBenefits>
  );
};