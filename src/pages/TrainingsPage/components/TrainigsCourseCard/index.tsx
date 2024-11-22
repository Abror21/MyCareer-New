/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { StyledTrainigsCourseCard } from './style';
import { trainigsItem } from 'utils/consts';
import { Button } from 'ui';
import { useIntl } from 'react-intl';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useNavigate } from 'react-router-dom';
import useJwt from 'utils/useJwt';
import Cookies from 'js-cookie';

interface Props {
  trainings: trainigsItem[];
}

const getInitialLevels = (trainings: any) => {
  const savedLevels = JSON.parse(localStorage.getItem('selectedLevels') || '{}');
  return trainings.reduce((acc: any, curr: any) => {
    acc[curr.title] = savedLevels[curr.title] || 'begginer';
    return acc;
  }, {});
};

export default function TrainigsCourseCard({ trainings }: Props) {
  const hasJwt = Cookies.get('jwt');
  const intl = useIntl();
  const navigate = useNavigate();
  const { getDecoded } = useJwt();
  const [learnItPrice, setLearnItPrice] = useState<any>(null);
  const [selectedLevels, setSelectedLevels] = useState(() => getInitialLevels(trainings));
  const [trainigData, setTrainigData] = useState<{ trainingLevelId: number; trainingId: number } | null>(null);

  const { isLoading, appendData } = useQueryApiClient({
    request: {
      url: `/api/freelancer/training`,
      method: 'POST',
    },
    onSuccess: () => {
      navigate('/profile');
      localStorage.removeItem('selectedLevels');
    },
  });

  useQueryApiClient({
    request: {
      url: '/api/intern-feature/get-all-intern-features',
      method: 'GET',
    },
    onSuccess(res) {
      const item = res.data.find((item: any) => item.id === 2);
      if (getDecoded()) {
        setLearnItPrice(item.priceTitle);
      }
    },
  });
  useEffect(() => {
    localStorage.setItem('selectedLevels', JSON.stringify(selectedLevels));
  }, [selectedLevels]);

  const handleLevelChange = (level: string, title: string) => {
    setSelectedLevels((prevLevels: any) => ({
      ...prevLevels,
      [title]: level,
    }));
  };

  const { refetch: getFreelancer } = useQueryApiClient({
    request: {
      url: `/api/user/profile`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess: (response) => {
      if (!response.data.freelancer) navigate('/create-cv');
      else {
        if (trainigData) {
          appendData({
            trainingLevelId: trainigData?.trainingLevelId,
            trainingId: trainigData?.trainingId,
          });
        }
      }
      return;
    },
  });

  const handleStartTraining = (data: trainigsItem) => {
    if (!hasJwt) {
      navigate('/login/trainings');
    } else {
      setTrainigData({
        trainingId: data.titleId,
        trainingLevelId: data.levelId,
      });
    }
  };

  useEffect(() => {
    if (trainigData) {
      getFreelancer();
    }
  }, [trainigData]);

  return (
    <StyledTrainigsCourseCard>
      <div className="section-paddings">
        {trainings &&
          trainings?.map((filteredItem, index) => {
            const isActive = selectedLevels[filteredItem?.title] === filteredItem?.level;
            return isActive ? (
              <div className="course-card section-margins" key={index}>
                <div className="course-card section-margins" key={index}>
                  <div className="card-header">
                    <div className="pre-title">
                      <h3>
                        {filteredItem?.title &&
                          intl.messages[filteredItem?.title] &&
                          intl.formatMessage({ id: filteredItem?.title })}
                      </h3>
                    </div>
                    <div className="description">
                      {filteredItem?.description &&
                        intl.messages[filteredItem?.description] &&
                        intl.formatMessage({ id: filteredItem?.description })}
                    </div>
                    <div className="level">
                      {filteredItem?.allLevels?.map((btn, btnIndex) => (
                        <Button
                          className={`${selectedLevels[filteredItem?.title] === btn ? 'active' : ''} btn`}
                          onClick={() => handleLevelChange(btn, filteredItem?.title)}
                          label={btn && intl.messages[btn] && intl.formatMessage({ id: btn })}
                          type="primary"
                          key={btnIndex}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="card-inner">
                    <div className="context">
                      <div className="description-block">
                        <h4 className="title">
                          {filteredItem?.level &&
                            intl.messages[filteredItem?.level] &&
                            intl.formatMessage({ id: filteredItem?.level })}
                        </h4>
                        <p>
                          {filteredItem?.content?.levelDescription &&
                            intl.messages[filteredItem?.content?.levelDescription] &&
                            intl.formatMessage({ id: filteredItem?.content?.levelDescription })}
                        </p>
                      </div>
                      <div className="enrolle-block">
                        <h5 className="enroll">
                          {intl.messages.whoShouldEnroll && intl.formatMessage({ id: 'whoShouldEnroll' })}
                        </h5>
                        <ul>
                          {filteredItem?.content?.enroll?.map((enroll, enrollIndex) => (
                            <li className="text-left" key={enrollIndex}>
                              {enroll && intl.messages[enroll] && intl.formatMessage({ id: enroll })}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="outcome-block">
                        <p>
                          {filteredItem?.content?.end &&
                            intl.messages[filteredItem?.content?.end] &&
                            intl.formatMessage({ id: filteredItem?.content?.end })}
                        </p>
                      </div>
                      <div className="action-block">
                        <>
                          {learnItPrice && (
                            <h5>{intl.messages[learnItPrice] && intl.formatMessage({ id: learnItPrice })}</h5>
                          )}
                          <Button
                            loading={isLoading}
                            onClick={() => handleStartTraining(filteredItem)}
                            type="primary"
                            className="btn"
                            label={intl.messages.startTrainig && intl.formatMessage({ id: 'startTrainig' })}
                          />
                        </>
                      </div>
                    </div>
                    <div className="lesson-topics">
                      <h4 className="keyLearning-title">
                        {intl.messages.keyLearningObjectives && intl.formatMessage({ id: 'keyLearningObjectives' })}
                      </h4>
                      <div className="learning-objectives-inner">
                        <div className="learning-objectives-list">
                          {filteredItem &&
                            filteredItem?.objectives?.option?.map((lessons, lessonsIndex) => (
                              <div key={lessonsIndex} className="learning-objectives-card">
                                <h5 className="learning-objectives-title">
                                  {lessons?.id}.{' '}
                                  {lessons?.optionKey &&
                                    intl.messages[lessons?.optionKey] &&
                                    intl.formatMessage({ id: lessons?.optionKey })}
                                </h5>
                                <ul>
                                  {lessons.optionText.map((text, textIndex) => (
                                    <li className="text-left" key={textIndex}>
                                      {text && intl.messages[text] && intl.formatMessage({ id: text })}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })}
      </div>
    </StyledTrainigsCourseCard>
  );
}
