import React from 'react';
import { StyledTitleSection } from './style';
import { useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { HeroDataProps } from './type';
import { Breadcrumb, PublicPageTitle } from 'ui';

export function HeroSecondary({ heroData }: HeroDataProps) {
  const intl = useIntl();
  const location = useLocation();

  return (
    <StyledTitleSection>
      <div className="overlay"></div>
      <div className="container">
        <div className="navigate">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">{intl.messages.home && intl.formatMessage({ id: 'home' })}</Link>,
              },
              {
                title: <h6>{location.pathname === "/trainings" ? intl.messages.trainings && intl.formatMessage({ id: 'trainings' }) : location.pathname === "/about-us" && intl.messages.about_link && intl.formatMessage({ id: 'about_link' })}</h6>,
              },
            ]}
          />
        </div>
        <PublicPageTitle label={heroData?.preTitle  && intl.messages[heroData?.preTitle ] && intl.formatMessage({ id: heroData?.preTitle })} />
        <div className={`${location.pathname === '/about-us' ? 'reverse' : ''} hero-flex-card`}>
          <div className="image">
            <img loading='lazy' src={heroData?.image?.src} alt={heroData?.image?.alt} />
          </div>
          <div className="description">
            <h6 className="title-placeholder">{heroData?.preTitle && intl.messages[heroData?.preTitle] && intl.formatMessage({ id: heroData?.preTitle })}</h6>
            <h3 className="min-title">{heroData?.title && intl.messages[heroData.title] && intl.formatMessage({ id: heroData?.title })}</h3>
            <p className="text">{heroData?.text && intl.messages[heroData.text] && intl.formatMessage({ id: heroData?.text })}</p>
          </div>
        </div>
      </div>
    </StyledTitleSection>
  );
}
