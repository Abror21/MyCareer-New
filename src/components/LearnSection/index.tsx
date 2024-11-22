import { useIntl } from 'react-intl';

import { StyledLearnSection } from 'components/LearnSection/style';
import { LearnSectionItem } from 'utils/consts';
import { Button } from 'ui';
import { useLocation } from 'react-router-dom';
import useJwt from 'utils/useJwt';
import { Image } from 'antd';

interface Props {
  learnSectionData: LearnSectionItem[];
}

export const LearnSection = ({ learnSectionData }: Props) => {
  const { getDecoded } = useJwt();
  const intl = useIntl();
  const location = useLocation();
  return (
    <StyledLearnSection>
      <div className={`${location.pathname === '/trainings' && 'trainigs-container'}`}>
        <div className="container section-paddings">
          <div className="inner">
            {learnSectionData?.map((item) => (
              <div className="row" key={item.content.titleKey}>
                <div className="imageWrapper">
                  <div className="image">
                    <Image preview={false} loading='lazy' src={item.image.src} alt={item.image.alt} />
                  </div>
                </div>
                <div className="content">
                  {item.content.preTitleKey && (
                    <h6 className="preTitle">{intl.messages[item.content.preTitleKey] && intl.formatMessage({ id: item.content.preTitleKey })}</h6>
                  )}
                  <h3 className="title">{intl.messages[item.content.titleKey] && intl.formatMessage({ id: item.content.titleKey })}</h3>
                  <p className="learnText">{intl.messages[item.content.textKey] && intl.formatMessage({ id: item.content.textKey })}</p>
                  {item.content.callToActionKey && (
                    <p className="callToAction">{intl.messages[item.content.callToActionKey] && intl.formatMessage({ id: item.content.callToActionKey })}</p>
                  )}
                  <Button
                    label={intl.messages[item.content.buttonTextKey] && intl.formatMessage({ id: item.content.buttonTextKey })}
                    type="primary"
                    className="btn learn-btn primary-btn"
                    href={!getDecoded() ? item?.route : item?.nextRoute}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledLearnSection>
  );
};
