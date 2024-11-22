import { ComponentType, Suspense, lazy, useEffect } from 'react';
import { LearnSectionItem, learnSectionData } from 'utils/consts';
import { smoothScroll } from 'utils/globalFunctions';

type components = ComponentType<{}>;

const LazyHero = lazy(() => import('components/index').then(module => ({ default: module.HeroCountdown })) as Promise<{ default: components }>);
const LazyLearnSection = lazy(() => import('components/index').then(module => ({ default: module.LearnSection })) as Promise<{ default: React.ComponentType<{ learnSectionData: LearnSectionItem[] }> }>);
const LazyRoadmap = lazy(() => import('components/index').then(module => ({ default: module.Roadmap })) as Promise<{ default: components }>);
const LazyTeamSection = lazy(() => import('components/index').then(module => ({ default: module.TeamSection })) as Promise<{ default: components }>);
const LazyPresidentQuote = lazy(() => import('components/index').then(module => ({ default: module.PresidentQuote })) as Promise<{ default: components }>);
const LazyBenefits = lazy(() => import('components/index').then(module => ({ default: module.Benefits })) as Promise<{ default: components }>);
const SuspenseFallback = () => <div>Loading...</div>;

export const HomePage = () => {
  useEffect(() =>{
    smoothScroll("top", 0)
  },[])
  
  return (
    <Suspense fallback={<SuspenseFallback/>}>
      <LazyHero />
      <LazyBenefits />
      <LazyRoadmap />
      <LazyLearnSection learnSectionData={learnSectionData} />
      <LazyPresidentQuote />
      <LazyTeamSection />
    </Suspense>
  );
};
