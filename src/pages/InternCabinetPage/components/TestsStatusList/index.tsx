import React, { useState } from 'react';
import { StyledTestsStatusList } from './style';
import { Button } from 'ui';
import { useIntl } from 'react-intl';
import { ActionModalDataType } from 'pages/InternCabinetPage/Types';
import { RemoveBtn } from '../RemoveBtn';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useLanguage } from 'contexts/LanguageContext';
import { TestActionModal } from 'components';
import { useTimeExpiration } from 'utils/useTimeExpiration';
import { message } from 'antd';

export function TestsStatusList({ data }: any) {
  const intl = useIntl();
  const [actionModalData, setActionModalData] = useState<ActionModalDataType | undefined>(undefined);
  const { language } = useLanguage();
  const { timeExpiration } = useTimeExpiration();

  const handleOpenModal = (value: string, modalType: string) => {
    if (timeExpiration !== null) message.error(intl.formatMessage({ id: 'you_can_enroll_after_five_minutes_again' }));
    else setActionModalData({ type: value, modal_type: modalType });
  };

  const handleCloseModal = () => {
    setActionModalData(undefined);
  };

  const { data: userProgram, refetch: getUserPrograms } = useQueryApiClient({
    request: {
      url: `/api/learning-programs/user/programs`,
      method: 'GET',
    },
  });

  const { data: userSkills } = useQueryApiClient({
    request: {
      url: '/api/freelancer/real-data-cv',
      method: 'GET',
    },
  });

  const GetProgram = (name: string) => {
    const [programName, degree] = name.split(' ');
    return programName === '.NET' ? `NET_${degree}` : `${programName}_${degree}`;
  };

  const isTestDisabled = (item: any) => {
    const skill = userSkills?.data?.skills?.find(
      (skill: any) =>
        skill?.skill?.content === item?.name_en?.split(' ')[0] &&
        skill?.level === item?.name_en?.split(' ')[1] && 
        skill?.verified
    );
    return !!skill;
  };

  const advancedVerified = (item: any) => userSkills?.data?.skills?.some(
    (skill: any) =>
      skill.skill.content === item.name_en?.split(' ')[0] &&
      skill.level === 'Advanced' &&
      skill.verified
  );

  const intermediateVerified = (item: any) => userSkills?.data?.skills?.some(
    (skill: any) =>
      skill.skill.content === item.name_en?.split(' ')[0] &&
      skill.level === 'Intermediate' &&
      skill.verified
  );

  const isTestAllowed = (item: any) => {
    const level = item.name_en?.split(' ')[1]; 
    if (advancedVerified(item)) {
      return false;
    }
    if (intermediateVerified(item) && level === 'Beginner') {
      return false;
    }
    return true;
  };

  return (
    <StyledTestsStatusList>
      <TestActionModal
        userProgram={userProgram?.data}
        getUserPrograms={getUserPrograms}
        handleCloseModal={handleCloseModal}
        actionModalData={actionModalData}
      />
      <div className="study-status">
        <div className="study-title-inner">
          <h4 className="study-title">{intl.formatMessage({ id: 'appliedTesting' })}</h4>
          <Button
            onClick={() => {
              handleOpenModal('action', 'createTestModal');
            }}
            className="btn"
            label={intl.formatMessage({ id: 'applyForNewTest' })}
          />
        </div>
        <div className="study-list">
          {userProgram?.data &&
            userProgram?.data?.map(
              (item: any, index: number) =>
                item.status !== 'CANCELLED' && (
                  <div key={index} className="study-badge">
                    <div className="study-subject">
                      {language === 'uz' ? item.name_uz : language === 'ru' ? item.name_ru : item.name_en}
                      <div className="status-inner">
                        <div className="study-subject-status">
                          {!isTestDisabled(item)
                            ? intl.formatMessage({ id: item.status })
                            : intl.formatMessage({ id: 'verified' })}
                        </div>
                        {/* Проверяем, можно ли показывать кнопку для теста */}
                        {isTestAllowed(item) && !isTestDisabled(item) && (
                          <a
                            target="_blank"
                            className="btn take_test_btn hidden-desktop"
                            href={`https://t.me/mycareer_virtual_assistant_bot?start=id=${data.id}=${GetProgram(
                              item.name_en
                            )}`}
                          >
                            {intl.formatMessage({ id: 'take_test' })}
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="status-btn-inner">
                      {isTestAllowed(item) && !isTestDisabled(item) && (
                        <a
                          target="_blank"
                          className="btn take_test_btn hidden-mobile"
                          href={`https://t.me/mycareer_virtual_assistant_bot?start=id=${data.id}=${GetProgram(
                            item.name_en
                          )}`}
                        >
                          {intl.formatMessage({ id: 'take_test' })}
                        </a>
                      )}
                      <div className="remove-btn">
                        <RemoveBtn getUserPrograms={getUserPrograms} cloudId={item.cloudStudyId} key={index} />
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </StyledTestsStatusList>
  );
}
