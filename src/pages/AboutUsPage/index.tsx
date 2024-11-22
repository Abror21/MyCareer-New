import { AboutPersonSection, HeroSecondary, TeamSection } from 'components';
import { AboutItem } from 'components/HeroSecondary/type';
import { useEffect } from 'react';
import { smoothScroll } from 'utils/globalFunctions';

export function AboutUsPage() {
  useEffect(() => {
    smoothScroll('top', 0);
  }, []);
  
  return (
    <>
      <HeroSecondary heroData={AboutItem} />
      <AboutPersonSection />
      <TeamSection />
    </>
  );
}
