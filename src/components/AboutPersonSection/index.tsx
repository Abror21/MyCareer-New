import React from 'react';
import { StyledAboutPerson } from './style';
import { AboutPersonSectionItem } from './type';
import { useIntl } from 'react-intl';

export function AboutPersonSection() {
  const intl = useIntl();
  return (
    <StyledAboutPerson>
      <div className="container section-paddings">
        <div className="inner">
          {AboutPersonSectionItem?.map((item, index) => (
            <div key={index} className="row">
              <div className="imageWrapper">
                <div className="image">
                  <img loading='lazy' src={item?.image?.src} alt={item.image.alt} />
                </div>
              </div>
              <div className="content">
                <div>
                  {item?.content?.preTitleKey && (
                    <h6 className="preTitle">{item?.content?.preTitleKey && intl.messages[item?.content?.preTitleKey ] && intl.formatMessage({ id: item?.content?.preTitleKey })}</h6>
                  )}
                  <h3 className="title">{item?.content?.titleKey && intl.messages[item?.content?.titleKey ] && intl.formatMessage({ id: item?.content?.titleKey })}</h3>
                  <p className="learnText">{item?.content?.infoKey && intl.messages[item?.content?.infoKey] && intl.formatMessage({ id: item?.content?.infoKey })}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledAboutPerson>
  );
}
