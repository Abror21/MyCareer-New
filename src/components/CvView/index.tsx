import { Avatar } from 'antd';
import { useIntl } from 'react-intl';
import SvgSelector from 'assets/icons/SvgSelector';
import { routes } from 'config/config';
import { RealCvInterface } from 'types/RealCV';
import { StyledCvCard } from './style';
import { Button } from 'ui/Button';
import { useState } from 'react';
import { EditPersonalDetailsForm } from './Forms/EditPersonalDetailsForm';
import { EditLanguagesForm } from './Forms/EditLanguagesForm';
import { EditHobbiesForm } from './Forms/EditHobbiesForm';
import { EditJobExpectationForm } from './Forms/EditJobExpectationsForm';
import { EditAboutForm } from './Forms/EditAboutForm';
import { Link, useLocation } from 'react-router-dom';
import EducationSide from './components/EducationSide';
import { EducationProvider } from 'contexts/CreateCvContext/EducationContext';
import { WorkExperienceProvider } from 'contexts/CreateCvContext/WorkExperienceContext';
import ExperienceSide from './components/ExperienceSide';
import { CertificateProvider } from 'contexts/CreateCvContext/CertificateContext';
import CertificateSide from './components/CertficateSide';
import { EditSkillsForm } from './Forms/EditSkillsForm';
import { Spinner } from 'ui';

type RealCVProps = {
  cvData: RealCvInterface;
  isRealDataCv?: boolean;
  isEditMode?: boolean;
  isDownloadLoading?: boolean;
  refetchPdfFileGet?: () => void;
};

type Levels = {
  [key: string]: string;
};

export const CvView = ({ cvData, isRealDataCv, isEditMode = false, isDownloadLoading = false, refetchPdfFileGet }: RealCVProps) => {
  const {
    user,
    image,
    firstName = '',
    lastName = '',
    desiredPosition,
    phoneNumber,
    email,
    address,
    jobExperience,
    about,
    jobExpectations,
    skills,
    languages,
    hobbies,
    educations,
    experiences,
    certificates,
  } = cvData;
  const intl = useIntl();
  const location = useLocation();

  const [personalDetailsModalOpen, setPersonalDetailsModalOpen] = useState(false);
  const [languagesModalOpen, setLanguagesModalOpen] = useState(false);
  const [hobbiesModalOpen, setHobbiesModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [jobExpectationsModalOpen, setJobExpectationsModalOpen] = useState(false);

  const levels: Levels = {
    Beginner: 'A1',
    Elementary: 'A2',
    Intermediate: 'B1',
    UpperIntermediate: 'B2',
    Advanced: 'C1',
    Proficient: 'C2',
    Native: '(Native)',
  };

  const editPersonalDetailsHandler = () => {
    setPersonalDetailsModalOpen(true);
  };

  return (
    <StyledCvCard>
      <div className="cv-wrapper">
        <div className="cv-header">
          {isRealDataCv && (
            <div className={`${!image ? 'avatar' : 'imageWrapper'}`}>
              {image ? (
                <Avatar src={`${routes.api.baseUrl}/${image.resizedPath600}`} shape="square" />
              ) : (
                <Avatar shape="square" icon={<SvgSelector className="avatar-icon" id="avatar-icon" />} />
              )}
            </div>
          )}

          {!isRealDataCv && <Avatar shape="square" icon={<SvgSelector className="avatar-icon" id="avatar-icon" />} />}

          {isRealDataCv && (
            <div className="user-information">
              <ul>
                <div>
                  <li className="user-name">
                    <h3>{`${firstName && firstName} ${lastName && lastName}`}</h3>
                  </li>
                  <li className="position">
                    <h5>{desiredPosition && desiredPosition.name}</h5>
                  </li>
                </div>

                <div>
                  <li className="cv-contacts-wrapper">
                    <div className="cv-contacts-icon">
                      <SvgSelector id="phone" />
                    </div>
                    <h5 className="cv-contacts">
                      {`${phoneNumber && phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`}`}
                    </h5>
                  </li>
                  <li className="cv-contacts-wrapper">
                    <div className="cv-contacts-icon">
                      <SvgSelector id="email" className="user-email" />
                    </div>
                    <h5 className="cv-contacts">{email && email}</h5>
                  </li>
                  <li className="user-location cv-contacts-wrapper">
                    <div className="cv-contacts-icon">
                      <SvgSelector id="location" />
                    </div>
                    <h5 className="cv-contacts">
                      {address && address?.country?.name},&nbsp;
                      {address && address?.region !== null && address.region.name}&nbsp;
                      {address && address?.street}
                    </h5>
                  </li>
                </div>

                <div>
                  <li>
                    <h5 className="job-experience-label">
                      {intl.messages.experience && intl.formatMessage({ id: 'experience' })}
                    </h5>
                    <p className="job-experience-value">{jobExperience && intl.formatMessage({ id: jobExperience })}</p>
                  </li>
                </div>
              </ul>

              {isEditMode && (
                <button className="cv-header-edit-btn mobile" onClick={editPersonalDetailsHandler}>
                  <div className="cv-header-edit-icon">
                    <SvgSelector id="edit-svg" />
                  </div>
                </button>
              )}
            </div>
          )}

          {!isRealDataCv && (
            <div className="avatar-information">
              <div className="avatar-position">{desiredPosition && desiredPosition.name}</div>
              <div>
                <p className="job-experience-label">
                  {intl.messages.experience && intl.formatMessage({ id: 'experience' })}
                </p>
                <p className="job-experience-value">
                  {jobExperience && intl.messages.jobExperience && intl.formatMessage({ id: jobExperience })}
                </p>
              </div>
            </div>
          )}

          {isEditMode && (
            <button className="cv-header-edit-btn desktop" onClick={editPersonalDetailsHandler}>
              <div className="cv-header-edit-icon">
                <SvgSelector id="edit-svg" />
              </div>
            </button>
          )}
        </div>

        <div className="cv-body">
          <div className="cv-left-bar">
            <div className="block-information skills">
              <h4 className="bar-title">{intl.messages.skills && intl.formatMessage({ id: 'skills' })}</h4>
              {!isEditMode && (
                <ul>
                  {skills &&
                    skills.map((skill: any, index) => (
                      <li key={index} className="info-item">
                        <div className="item__content">{skill.skill.content}</div>
                        <div className="skill-level-text">
                          {skill.level}&nbsp;
                          {skill.verified && <SvgSelector className="verified" id="addverified" />}
                        </div>
                      </li>
                    ))}
                </ul>
              )}

              {isEditMode && <EditSkillsForm cvData={cvData} />}
            </div>

            <div className="block-information">
              <h4 className="bar-title">{intl.messages.languages && intl.formatMessage({ id: 'languages' })}</h4>
              <ul className="cv-bar-ul">
                {languages &&
                  languages?.map((lang, index) => (
                    <li key={index} className="info-item">
                      <p className="info-item__language">{lang?.language?.name}</p>&nbsp;
                      {lang?.level && <p className="level-text">{levels[`${lang?.level}`]}</p>}
                    </li>
                  ))}
              </ul>

              {isEditMode && (
                <button className="cv-body-edit-btn" onClick={() => setLanguagesModalOpen(true)}>
                  <div className="cv-body-edit-icon">
                    <SvgSelector id="edit-svg" />
                  </div>
                </button>
              )}
            </div>

            <div className="block-information">
              <h4 className="bar-title">{intl.messages.hobbi && intl.formatMessage({ id: 'hobbi' })}</h4>
              <ul className="cv-bar-ul">
                {hobbies && hobbies?.length > 0 ? (
                  hobbies?.map((hobby, index) => (
                    <li key={index} className="info-item">
                      {intl.messages[hobby?.content] && (
                        <p className="hobby-text">
                          {hobby?.content &&
                            hobby &&
                            intl.messages[hobby?.content] &&
                            intl.formatMessage({ id: hobby?.content })}
                        </p>
                      )}
                    </li>
                  ))
                ) : (
                  <p className="emptyText">
                    {intl.messages.HobbiesNotFound && intl.formatMessage({ id: 'HobbiesNotFound' })}
                  </p>
                )}
              </ul>

              {isEditMode && (
                <button className="cv-body-edit-btn" onClick={() => setHobbiesModalOpen(true)}>
                  <div className="cv-body-edit-icon">
                    <SvgSelector id="edit-svg" />
                  </div>
                </button>
              )}
            </div>

            {!isRealDataCv && location?.pathname !== '/profile/cv' && (
              <div className="mobile-hidden">
                <Link to={`/contact-us/interview/${user?.id}`}>
                  <Button
                    className="interview-btn primary-btn"
                    label={intl.messages.scheduleTheInterview && intl.formatMessage({ id: 'scheduleTheInterview' })}
                    type="primary"
                  />
                </Link>
              </div>
            )}
          </div>

          <div className="cv-right-bar">
            <div className="block-information">
              <h4 className="bar-title">{intl.messages.about && intl.formatMessage({ id: 'about' })}</h4>
              <p className="block-text">{about && about}</p>

              {isEditMode && (
                <button className="cv-body-edit-btn" onClick={() => setAboutModalOpen(true)}>
                  <div className="cv-body-edit-icon">
                    <SvgSelector id="edit-svg" />
                  </div>
                </button>
              )}
            </div>

            <div className="block-information">
              <h4 className="bar-title">
                {intl.messages.jobExpectations && intl.formatMessage({ id: 'jobExpectations' })}
              </h4>
              <p className="block-text">{jobExpectations && jobExpectations}</p>

              {isEditMode && (
                <button className="cv-body-edit-btn" onClick={() => setJobExpectationsModalOpen(true)}>
                  <div className="cv-body-edit-icon">
                    <SvgSelector id="edit-svg" />
                  </div>
                </button>
              )}
            </div>
            <EducationProvider>
              <EducationSide isEditMode={isEditMode} educations={educations} />
            </EducationProvider>
            <CertificateProvider>
              <CertificateSide isEditMode={isEditMode} certificates={certificates} />
            </CertificateProvider>
            <WorkExperienceProvider>
              <ExperienceSide isEditMode={isEditMode} experiences={experiences} />
            </WorkExperienceProvider>
            {!isRealDataCv && location?.pathname !== '/profile/cv' && (
              <div className="desktop-hidden interview-btn-wrapper">
                <Link to={`/contact-us/interview/${user?.id}`}>
                  <Button
                    className="interview-btn primary-btn"
                    label={intl.messages.scheduleTheInterview && intl.formatMessage({ id: 'scheduleTheInterview' })}
                    type="primary"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="pdf-btn" onClick={() => (refetchPdfFileGet && !isDownloadLoading) && refetchPdfFileGet()}>
          <Spinner spinning={isDownloadLoading}>
            <SvgSelector id="download-svg" />
          </Spinner>
        </div>
      </div>
      <div className="cv-information-verified">
        <SvgSelector id="addverified" />
        &nbsp;&ndash;&nbsp;
        <h6>{intl.messages.informationVerified && intl.formatMessage({ id: 'informationVerified' })}</h6>
      </div>

      {isEditMode && (
        <>
          <EditPersonalDetailsForm
            open={personalDetailsModalOpen}
            setOpen={setPersonalDetailsModalOpen}
            image={image}
            cvData={cvData}
          />
          <EditLanguagesForm open={languagesModalOpen} setOpen={setLanguagesModalOpen} cvData={cvData} />
          <EditHobbiesForm open={hobbiesModalOpen} setOpen={setHobbiesModalOpen} cvData={cvData} />
          <EditAboutForm open={aboutModalOpen} setOpen={setAboutModalOpen} cvData={cvData} />

          <EditJobExpectationForm
            open={jobExpectationsModalOpen}
            setOpen={setJobExpectationsModalOpen}
            cvData={cvData}
          />
        </>
      )}
    </StyledCvCard>
  );
};
