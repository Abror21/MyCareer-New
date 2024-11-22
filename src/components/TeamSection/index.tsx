import { useIntl } from 'react-intl';

import { StyledTeamSection } from './style';
import { team } from 'utils/consts';
import { Image } from 'antd';

export const TeamSection = () => {
  const intl = useIntl();

  return (
    <StyledTeamSection>
      <div className="container">
        <div className="inner">
          <div className="title">
            <h2>{intl.messages.ourTeam && intl.formatMessage({ id: 'ourTeam' })}</h2>
          </div>

          <div className="wrapper">
            <div className="cards">
              {team.map((item) => (
                <div className="card" key={item.name}>
                  <div className="image">
                    <Image preview={false} loading='lazy' src={item.image.src} alt={item.image.alt} />
                  </div>

                  <div className="content">
                    <h4 className="name">{item?.name && intl.messages[item?.name] && intl.formatMessage({ id: item.name })}</h4>
                    <div className="position">{item?.position && intl.messages[item?.position] && intl.formatMessage({ id: item.position })}</div>
                  </div>

                  <div className="flag">
                    <Image preview={false} loading='lazy' src={item.flagIcon.src} alt={item.flagIcon.alt} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StyledTeamSection>
  );
};
