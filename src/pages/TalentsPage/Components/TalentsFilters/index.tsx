import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';

import { StyledTalentSelect } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Select, SelectOption } from 'ui';
import { DesiredPosition } from 'types/DesiredPosition';
import { Skill } from 'types/Skill';
import { TalentsFilterType } from 'types/Talent';

export type TalentFiltersProps = {
  filter: TalentsFilterType;
  setFilter: (val: TalentsFilterType) => void;
  setReset: (val: boolean) => void;
  reset?: boolean;
  setCurrentPage: (val: number) => void;
  lastPageBeforeFiltering: number;
};

export const TalentsFilters = ({
  reset,
  filter,
  setFilter,
  setCurrentPage,
  lastPageBeforeFiltering,
}: TalentFiltersProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const position = Form.useWatch('position', form);
  const skills = Form.useWatch('skills', form);
  const experiencePeriod = Form.useWatch('experiencePeriod', form);

  useEffect(() => {
    if (reset) {
      setFilter({
        ...filter,
        pageIndex: lastPageBeforeFiltering,
        desiredPositionId: null,
        verifiedSkillIds: null,
        jobExperience: null,
      });
      form.resetFields();
    }
  }, [reset]);

  useEffect(() => {
    if (position) {
      setFilter({
        ...filter,
        pageIndex: 1,
        desiredPositionId: position,
      });
      return;
    }

    setFilter({
      ...filter,
      pageIndex: lastPageBeforeFiltering,
      desiredPositionId: null,
    });
  }, [position]);

  useEffect(() => {
    if (skills) {
      setFilter({
        ...filter,
        pageIndex: 1,
        verifiedSkillIds: skills,
      });
      return;
    }

    setFilter({
      ...filter,
      pageIndex: lastPageBeforeFiltering,
      verifiedSkillIds: null,
    });
  }, [skills]);

  useEffect(() => {
    if (experiencePeriod) {
      setFilter({
        ...filter,
        pageIndex: 1,
        jobExperience: experiencePeriod,
      });
      return;
    }

    setFilter({
      ...filter,
      pageIndex: lastPageBeforeFiltering,
      jobExperience: null,
    });
  }, [experiencePeriod]);

  const { data: allPositions } = useQueryApiClient({
    request: {
      url: `/api/desired-position/filter`,
      method: 'GET',
    },
  });

  const { data: allSkills } = useQueryApiClient({
    request: {
      url: `/api/skill/filter`,
      method: 'GET',
    },
  });

  const { data: allExperiences } = useQueryApiClient({
    request: {
      url: `/api/experience/filter`,
      method: 'GET',
    },
  });

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (allValues.position || allValues.skills || allValues.experiencePeriod) {
      setCurrentPage(1);
    } else {
      setCurrentPage(lastPageBeforeFiltering);
    }
  };

  return (
    <StyledTalentSelect>
      <Form form={form} onValuesChange={onValuesChange}>
        <Select
          size="large"
          name="position"
          className="select-input"
          label={intl.messages.specialist && intl.formatMessage({ id: 'specialist' })}
          showSearch={false}
          allowClear
          placeholder={intl.messages.specialist && intl.formatMessage({ id: 'specialist' })}
        >
          {allPositions.data &&
            allPositions.data.map((option: DesiredPosition) => (
              <SelectOption key={option.id} value={option.id}>
                {option.name}
              </SelectOption>
            ))}
        </Select>

        <Select
          name="skills"
          label={intl.messages.skills && intl.formatMessage({ id: 'skills' })}
          className="select-input"
          allowClear
          placeholder={intl.messages.skills && intl.formatMessage({ id: 'skills' })}
        >
          {allSkills.data &&
            allSkills.data.map((option: Skill) => (
              <SelectOption key={option.id} value={option.id}>
                {option.content}
              </SelectOption>
            ))}
        </Select>

        <Select
          name="experiencePeriod"
          label={intl.messages.experience && intl.formatMessage({ id: 'experience' })}
          showSearch={false}
          allowClear
          className="select-input"
          placeholder={intl.messages.experience && intl.formatMessage({ id: 'experience' })}
        >
          {allExperiences.data &&
            allExperiences.data.map((option: any) => (
              <React.Fragment key={option}>
                {intl.messages[option] && (
                  <SelectOption key={option} value={option}>
                    {intl.formatMessage({ id: option })}
                  </SelectOption>
                )}
              </React.Fragment>
            ))}
        </Select>
      </Form>
    </StyledTalentSelect>
  );
};
