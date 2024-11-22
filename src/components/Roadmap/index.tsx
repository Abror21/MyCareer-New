
import { StyledRoadmap } from 'components/Roadmap/style';
import { useLanguage } from 'contexts/LanguageContext';
export const Roadmap = () => {
  const {language} = useLanguage()
  
  return (
    <StyledRoadmap className={`${language === "ru" ? 'image-ru' : language === "uz" && 'image-uz'}`}>
    </StyledRoadmap>
  );
};