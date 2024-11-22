import { FreelancerDataProvider } from 'contexts/CreateCvContext/FreelancerData';
import { HobbyProvider } from 'contexts/CreateCvContext/HobbiesContext';
import { SkillProvider } from 'contexts/CreateCvContext/SkillContext';
import { LanguageProvider } from 'contexts/CreateCvContext/UserLanguageContext';
import { CreateCvModal } from 'pages/CreateCvPage/Components';
import React, { useEffect, useState } from 'react';
import { Modal } from 'ui';
import { StyledUploadCV } from './style';
import { useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { initialQeuryValues } from '../..';

interface UploadCVProps {
  isAddUserOpen: boolean;
  setIsAddUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterRefetch: any;
}


const UploadCV = ({ isAddUserOpen, setIsAddUserOpen, filterRefetch }: UploadCVProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFormIndex = Number(localStorage.getItem('currentFormIndex')) || 0;
  const [currentFormIndex, setCurrentFormIndex] = useState(initialFormIndex);

  useEffect(() => {
    if (searchParams.get('add-user') && searchParams.get('add-user') == 'mount') {
      setCurrentFormIndex(0);
    }
  }, []);

  const scrollToTop = () => {};

  const onCancel = () => {
    localStorage.removeItem('currentFormIndex');
    setIsAddUserOpen(false);
    setSearchParams((params) => {
      params.set('add-user', 'false');
      return params;
    });
    Cookies.remove('temp-token');
    setCurrentFormIndex(0);
    localStorage.removeItem('currentFormIndex');
    filterRefetch(initialQeuryValues);
  };

  return (
    <StyledUploadCV>
      <div id="upload-cv-wrapper">
        <Modal
          open={isAddUserOpen}
          footer={false}
          getContainer={document.getElementById('upload-cv-wrapper') as HTMLElement}
          onCancel={onCancel}
        >
          <FreelancerDataProvider>
            <HobbyProvider>
              <LanguageProvider>
                <SkillProvider>
                  <CreateCvModal
                    filterRefetch={filterRefetch}
                    currentFormIndex={currentFormIndex}
                    setCurrentFormIndex={setCurrentFormIndex}
                    scrollToTop={scrollToTop}
                  />
                </SkillProvider>
              </LanguageProvider>
            </HobbyProvider>
          </FreelancerDataProvider>
        </Modal>
      </div>
    </StyledUploadCV>
  );
};

export default UploadCV;
