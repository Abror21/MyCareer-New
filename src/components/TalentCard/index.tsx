import React, { useEffect, useState } from 'react';
import { Avatar, Typography } from 'antd';
import { useIntl } from 'react-intl';

import { StyledTalentCard } from './style';
import { Tag } from 'ui';
import SvgSelector from 'assets/icons/SvgSelector';
import { Talent } from 'types/Talent';
import { experienceOptions } from 'utils/consts';
import { routes } from 'config/config';
import { VerifiedSkills } from '../../types/Skill';

const { Paragraph } = Typography;

type TalentProps = {
  talent: Talent;
  isRealDataCv?: boolean;
};

export const TalentCard = ({
  talent: { image, firstName, lastName, desiredPosition, jobExperience, about, skills },
  isRealDataCv,
}: TalentProps) => {
  const intl = useIntl();
  const [experiencePeriod, setExperiencePeriod] = useState('');

  useEffect(() => {
    if (jobExperience) {
      const [matchingOption] = experienceOptions.filter((option) => option.value === jobExperience);
      setExperiencePeriod(matchingOption.value);
    }
  }, [jobExperience]);

  return (
    <StyledTalentCard>
      <div className="talent-card-header">
        {isRealDataCv && (
          <div className="avatar">
            {image ? (
              <Avatar src={`${routes.api.baseUrl}/${image.resizedPath200}`} />
            ) : (
              <Avatar className="avatar-cv-icon" icon={<SvgSelector id="avatar-cv-icon" />} />
            )}
          </div>
        )}

        {!isRealDataCv && (
          <div className="avatar">
            <Avatar className="avatar-cv-icon" icon={<SvgSelector id="avatar-cv-icon" />} />
          </div>
        )}

        <div className="personal-details">
          <h5 className="fullname">{isRealDataCv && `${firstName} ${lastName}`}</h5>
          <h3 className="position">{desiredPosition && desiredPosition.name}</h3>
        </div>

        {experiencePeriod && (
          <div className="experience">
            <h5 className="experience-label">
              {intl.messages.experience && intl.formatMessage({ id: 'experience' })}
            </h5>
            <div className="experience-period">
              {intl.messages[`${experiencePeriod}`] && intl.formatMessage({ id: experiencePeriod })}
            </div>
          </div>
        )}
      </div>

      <div className="talent-card-body">
        <Paragraph ellipsis={{ rows: 2 }}>{about || ''}</Paragraph>
      </div>

      <div className="talent-card-footer">
        <div className="tags-wrapper">
          {skills &&
            skills.map((skill: VerifiedSkills, index: number) => (
              <div className="tag-body" key={index}>
                {skill.verified && (
                  <div className="verified">
                    <SvgSelector id="addverified" />
                  </div>
                )}

                <Tag className="skills-tag" key={index}>
                  <div className="skill-name">{skill.skill.content}</div>
                  <div className="skill-level">
                    {intl.messages[skill.level] && intl.formatMessage({ id: skill.level })}
                  </div>
                </Tag>
              </div>
            ))}
        </div>
      </div>
    </StyledTalentCard>
  );
};
