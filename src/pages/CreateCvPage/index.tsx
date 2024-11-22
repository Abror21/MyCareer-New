import { useRef, useState } from 'react';
import { HeaderCreateCV, CreateCvModal, ProgresBar } from './Components';
import { StyledCreateCV } from './style';
import { SkillProvider } from 'contexts/CreateCvContext/SkillContext';
import { LanguageProvider } from 'contexts/CreateCvContext/UserLanguageContext';
import { HobbyProvider } from 'contexts/CreateCvContext/HobbiesContext';
import SvgSelector from 'assets/icons/SvgSelector';

export const CreateCVPage = () => {
  const initialFormIndex = Number(localStorage.getItem('currentFormIndex')) || 0;
  const [currentFormIndex, setCurrentFormIndex] = useState(initialFormIndex);
  const [progressPercentage, setProgressPercentage] = useState<number>();
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const scrollToTop = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <HobbyProvider>
        <LanguageProvider>
          <SkillProvider>
            <StyledCreateCV>
              <div className="container craete_sv_inner" ref={headerRef}>
                <SvgSelector className="create_cv_icon" id="circle1" />
                <HeaderCreateCV currentFormIndex={currentFormIndex} />
                <CreateCvModal
                  currentFormIndex={currentFormIndex}
                  setCurrentFormIndex={setCurrentFormIndex}
                  scrollToTop={scrollToTop}
                  setProgressPercentage={setProgressPercentage}
                />
                {progressPercentage && <ProgresBar progressPercentage={progressPercentage} />}
              </div>
            </StyledCreateCV>
          </SkillProvider>
        </LanguageProvider>
      </HobbyProvider>
  );
};
