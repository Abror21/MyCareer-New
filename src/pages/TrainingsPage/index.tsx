import { HeroSecondary } from 'components';
import { TrainingsItem } from 'components/HeroSecondary/type';
import TrainigsCourseCard from './components/TrainigsCourseCard';
import { trainings } from 'utils/consts';
import { useEffect } from 'react';
import { smoothScroll } from 'utils/globalFunctions';

export const TrainingsPage = () => {
  useEffect(() => {
    smoothScroll('top', 0);
  }, []);

  return (
    <>
      <HeroSecondary heroData={TrainingsItem} />
      <TrainigsCourseCard trainings={trainings}/>
    </>
  );
};
