import { useEffect, useState } from 'react';
import SvgSelector from 'assets/icons/SvgSelector';
import { StyledCreateCvModals } from './style';
import { PersonalDetailsForm } from './PersonalDetailsForm';
import { DesiredPositionForm } from './DesiredPositionForm';
import { AddSkillsForm } from './AddSkillsForm';
import { AddLanguages } from './AddLanguages';
import { AddHobbies } from './AddHobbies';
import { Form, Spin } from 'antd';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';
import { Button, Spinner } from 'ui';
import { useSkillContext } from 'contexts/CreateCvContext/SkillContext';
import { useLanguageContext } from 'contexts/CreateCvContext/UserLanguageContext';
import { useIntl } from 'react-intl';
import { useHobbyContext } from 'contexts/CreateCvContext/HobbiesContext';
import { useFreelancerDataContext } from 'contexts/CreateCvContext/FreelancerData';
import { WorkExperienceForm } from './WorkExperienceForm';
import { useUserDispatch, useUserState } from 'contexts/UserContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useJwt from '../../../../utils/useJwt';
import Cookies from 'js-cookie';
import { routes } from 'config/config';
import { initialQeuryValues } from 'pages/AdminPage/components/AdminCabinet';

interface CreateCvModalProps {
  currentFormIndex: number;
  setCurrentFormIndex: React.Dispatch<React.SetStateAction<number>>;
  scrollToTop: () => void;
  setProgressPercentage?: React.Dispatch<React.SetStateAction<number | undefined>>;
  filterRefetch?: (value: any) => void;
}
export const CreateCvModal: React.FC<CreateCvModalProps> = (props) => {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();
  const { remove } = useJwt();
  const { dispatch: userDispatch } = useUserDispatch();
  const { currentFormIndex, setCurrentFormIndex, scrollToTop, setProgressPercentage, filterRefetch } = props;
  const [languageValidation, setLanguageValidation] = useState<boolean | null>(true);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [tempEmail, setTempEmail] = useState<string | null>(null);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { state: skillState } = useSkillContext();
  const { state: languageState } = useLanguageContext();
  const { state: hobbyState } = useHobbyContext();
  const { dispatch: freelancerDataDispatch } = useFreelancerDataContext();
  const { role } = useUserState();
  const [email, setEmail] = useState<any | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [personalForm] = Form.useForm();
  const [desiredPositionForm] = Form.useForm();
  const [skillForm] = Form.useForm();
  const [hobbiesForm] = Form.useForm();

  const forms = [
    <PersonalDetailsForm personalForm={personalForm} setIsFileLoading={setIsFileLoading} />,
    <DesiredPositionForm desiredPositionForm={desiredPositionForm} />,
    <AddSkillsForm
      skillForm={skillForm}
      setIsActionModalVisible={setIsActionModalVisible}
      isActionModalVisible={isActionModalVisible}
    />,
    <WorkExperienceForm
      setIsActionModalVisible={setIsActionModalVisible}
      isActionModalVisible={isActionModalVisible}
    />,
    <AddLanguages languageValidation={languageValidation} setLanguageValidation={setLanguageValidation} />,
    <AddHobbies hobbiesForm={hobbiesForm} />,
  ];
  const FormLength = 6;

  useEffect(() => {
    if (currentFormIndex > 5) {
      setCurrentFormIndex(0);
      localStorage.setItem('currentFormIndex', '0');
      return;
    }
    localStorage.setItem('currentFormIndex', String(currentFormIndex));
  }, [currentFormIndex]);

  const { appendData: postEmail, isLoading: isPostEmailLoading } = useQueryApiClient({
    request: {
      url: `/api/auth/register/bot`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ApiKey: "81b82cc20b17b1a016bdc7611b70c13e70c59290d195f1ffef7f05cd9b0bc110",
      },
      disableOnMount: true,
    },
    onSuccess(res) {
      Cookies.set('temp-token', res.data.token);
      setSearchParams((params) => {
        params.set('add-user', 'post');
        return params;
      });
      personalForm
        .validateFields()
        .then((res) => {
          const formData = new FormData();
          res.OtherRegion = res.RegionId ? false : true;
          res.RegionId = res.RegionId ? res.RegionId : 0;
          res.DateOfBirth = dayjs(res.DateOfBirth).format('YYYY-MM-DD');

          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              formData.append(key, res[key]);
            }
          }
          personalDetailPostApi(formData);
        })
        .catch((res) => {
          return;
        });

    },
  });

  const handleNext = async () => {
    setCurrentFormIndex((prevIndex: number) => Math.min(prevIndex + 1, forms.length - 1));
    scrollToTop();
  };

  const handleBack = () => {
    setCurrentFormIndex((prevIndex: number) => Math.max(prevIndex - 1, 0));
    scrollToTop();
  };

  useEffect(() => {
    if(setProgressPercentage){
      setProgressPercentage(((currentFormIndex + 1) / forms.length) * 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFormIndex, forms.length]);

  useEffect(() => {
    if (tempEmail) {
      postEmail({ email: tempEmail });
    }
  }, [tempEmail]);

  const handleSubmitForm = async () => {

    // Post Personal form Data
    if (currentFormIndex === 0) {
      await personalForm
        .validateFields()
        .then((res) => {
         
          if (searchParams.get('add-user') == 'mount') {
            setTempEmail(res.Email);
          } else {
            const formData = new FormData();
            res.OtherRegion = res.RegionId ? false : true;
            res.RegionId = res.RegionId ? res.RegionId : 0;
            res.DateOfBirth = dayjs(res.DateOfBirth).format('YYYY-MM-DD');

            for (const key in res) {
              if (res.hasOwnProperty(key)) {
                formData.append(key, res[key]);
              }
            }

            personalDetailPostApi(formData);
          }
        })
        .catch((res) => {
          return;
        });
      return;
    }

    // Post Desired position  form Data
    if (currentFormIndex === 1) {
      await desiredPositionForm
        .validateFields()
        .then((res) => {
          desiredPositionlPostApi(res);
        })
        .catch((res) => {
         return;
        });
      return;
    }

    // Post User skills form Data
    const userSkills = skillState.selectedSkills;
    if (currentFormIndex === 2) {
      if (!userSkills?.length) {
        // validate skill form
        await skillForm
          .validateFields()
          .then((res) => {
            skillForm.submit();
            skilllPostApi({ userSkills: [res] });
          })
          .catch((res) => {
            return;
          });
        return;
      }
      skilllPostApi({ userSkills });
      return;
    }
    setLanguageValidation(true);
    // post user language
    const freelancerLanguageDTOs = languageState.userlanguage.map(({ id, ...rest }) => rest);
    if (currentFormIndex === 4 && freelancerLanguageDTOs.length) {
      const isLanguageValid = freelancerLanguageDTOs.every((language) => language.languageId);
      if (!isLanguageValid) {
        setLanguageValidation(false);
        return;
      }
      languagePostApi({ freelancerLanguageDTOs });
      return;
    }
    handleNext();
  };

  const handleSaveForm = async () => {
    const userHobbies = hobbyState.selectedHobbies?.map(({ id, hobbyName, ...rest }) => rest);
    if (userHobbies?.length) {
      hobbyPostApi({ userHobbies });
      return;
    }
    await hobbiesForm
      // validate hobby form
      .validateFields()
      .then((res) => {
        hobbiesForm.submit();
        hobbyPostApi({ userHobbies: [{ hobbyId: res.hobby }] });
      })
      .catch((res) => {
        return;
      });
    return;
  };

  const { isLoading: isPersonalDetailApiLoading, appendData: personalDetailPostApi } = useQueryApiClient({
    request: {
      url: `/api/freelancer/add-personal-details`,
      method: 'POST',
      multipart: true,
    },
    onSuccess: () => {
      refetchUserData();
      handleNext();
    },
  });

  const { refetch: refetchUserData } = useQueryApiClient({
    request: {
      url: `/api/freelancer/real-data-cv`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess: (response) => {
      userDispatch({
        type: 'SET_USER_DATA',
        payload: {
          image: response.data?.image?.resizedPath200 || response.data?.image?.path || '',
        },
      });
    },
  });

  const { isLoading: isDesiredPositionApiLoading, appendData: desiredPositionlPostApi } = useQueryApiClient({
    request: {
      url: `/api/freelancer/add-desired-position`,
      method: 'POST',
    },
    onSuccess: () => {
      handleNext();
    },
  });

  const { isLoading: isSkillApiLoading, appendData: skilllPostApi } = useQueryApiClient({
    request: {
      url: `/api/user-skill`,
      method: 'POST',
    },
    onSuccess: () => {
      handleNext();
    },
  });
  const { isLoading: isLanguageApiLoading, appendData: languagePostApi } = useQueryApiClient({
    request: {
      url: `/api/freelancer/add-language`,
      method: 'POST',
    },
    onSuccess: () => {
      handleNext();
    },
  });
  const { isLoading: isHobbyApiLoading, appendData: hobbyPostApi } = useQueryApiClient({
    request: {
      url: `/api/user-hobby`,
      method: 'POST',
    },
    onSuccess: () => {
      finishCvRefetch();
      verifiedUserTelegramBot();
    },
  });

  const {refetch: verifiedUserTelegramBot} = useQueryApiClient({
    request: {
      method: "POST",
      url: `${routes.api.backendBotUrl}/check/verified?email=${email?.email}`,
      headers:{
        ApiKey: "qwerty43-53$"
      }
    }
  })

  const { isLoading: isFreelancerDataLoading } = useQueryApiClient({
    request: {
      url: `/api/freelancer/real-data-cv`,
      method: 'GET',
    },
    onSuccess(res) {
      freelancerDataDispatch({ type: 'SET_FREELANCER_DATA', payload: res.data });
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        if (role === 'Intern') {
          remove();
          localStorage.clear();
          return;
        }
        navigate('/unauthorized');
      }
    },
  });

  const { refetch: finishCvRefetch } = useQueryApiClient({
    request: {
      url: `/api/freelancer/finish-cv`,
      method: 'POST',
    },
    onSuccess() {
      if (searchParams.get('add-user') == 'post') {
        localStorage.removeItem('currentFormIndex');
        setSearchParams((params) => {
          params.set('add-user', 'finish');
          return params;
        });
        Cookies.remove('temp-token');
        filterRefetch && filterRefetch(initialQeuryValues);
      } else {
        localStorage.removeItem('currentFormIndex');
        navigate('/purchase-services');
      }
    },
  });

  return (
    <StyledCreateCvModals>
      <Spin
        spinning={isFileLoading}
        className='personal-data-spinner'
        size='large'
      >
        <div className="modals">
          <div className="modals-inner">
            {forms.map((Form, index) => (
              <div
                key={index}
                className={`modal ${index === currentFormIndex ? ' active' : ''}`}
                style={{
                  opacity: index === currentFormIndex ? 1 : 0,
                  visibility: index === currentFormIndex ? 'visible' : 'hidden',
                  transition: 'transform 0.5s, opacity 0.7s, visibility 0.5s',
                  transform: `translateX(${(index - currentFormIndex) * 150}%)`,
                }}
              >
                {Form}
              </div>
            ))}
          </div>
        </div>

        {isPersonalDetailApiLoading ||
        isDesiredPositionApiLoading ||
        isSkillApiLoading ||
        isLanguageApiLoading ||
        isHobbyApiLoading ||
        isFreelancerDataLoading ||
        isPostEmailLoading ? (
          <div className="cv-loader">
            <Spinner children={intl.formatMessage({ id: intl.formatMessage({ id: 'loading...' }) })} spinning={true} />
          </div>
        ) : (
          ''
        )}

        <div className={`navigation ${!isActionModalVisible && 'active'}`}>
          {currentFormIndex !== 0 && currentFormIndex !== 6 && (
            <div className="left" onClick={handleBack}>
              <SvgSelector id="blue-chevron-svg" />
            </div>
          )}

          {currentFormIndex < FormLength - 1 && (
            <div className="right" onClick={handleSubmitForm}>
              <SvgSelector id="blue-chevron-svg" />
            </div>
          )}
          {currentFormIndex === FormLength - 1 && (
            <Button
              type="primary"
              className="btn create-cv-save-btn"
              onClick={handleSaveForm}
              label={intl.messages.save && intl.formatMessage({ id: 'save' })}
            />
          )}
        </div>
      </Spin>
    </StyledCreateCvModals>
  );
};
