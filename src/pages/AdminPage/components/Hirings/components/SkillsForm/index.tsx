import React, { useEffect, useState } from 'react';
import { StyledSkillsForm } from './style';
import { useIntl } from 'react-intl';
import { Form } from 'antd';
import { AddMoreButton, IconButton, Select, SelectOption } from 'ui';
import { skillLevels } from 'utils/consts';
import useQueryApiClient from 'utils/useQueryApiClient';

export function SkillsForm({ form, actionFormData, disable }: any) {
  const intl = useIntl();
  const [selectedSkills, setSelectedSkills] = useState<any>([]);

  useEffect(() => {
    form.setFieldsValue({
      hiringSkills: [{ skillsId: undefined, level: 'Beginner' }],
    });
  }, [form]);

  const handleAddField = (addFn: any) => {
    addFn({ skillsId: undefined, level: 'Beginner' });
  };

  useEffect(() => {
    if (actionFormData?.skillsField !== undefined && actionFormData?.skillsField?.length > 0) {
      form.setFieldsValue({
        hiringSkills: actionFormData?.skillsField,
      });
    }
  }, [actionFormData?.skillsField]);

  const handleRemoveOrClearField = (fieldName: number, fieldCount: number, removeFn: any) => {
    if (fieldCount > 1) {
      removeFn(fieldName);
      if (fieldCount === selectedSkills.length) {
        setSelectedSkills((prevState: any) => prevState.filter((_: any, index: any) => index !== fieldName));
      }
    } else {
      form.setFieldsValue({
        hiringSkills: [{ skillsId: undefined, level: 'Beginner' }],
      });

      setSelectedSkills([]);
    }
  };

  const { isLoading, data: skillsData } = useQueryApiClient({
    request: {
      url: '/api/skill',
      method: 'GET',
    },
  });

  const handleSkillChange = (value: any, name: number, option: any) => {
    const currentHiringSkills = form.getFieldValue('hiringSkills') || [];
    const updatedHiringSkills = [...currentHiringSkills];

    updatedHiringSkills[name] = {
      ...updatedHiringSkills[name],
      skillsId: option.children,
      level: updatedHiringSkills[name]?.level || 'Beginner',
      value: option.value,
    };

    setSelectedSkills((prevState: any) => {
      const newSelectedSkills = [...prevState];
      newSelectedSkills[name] = option;
      return newSelectedSkills;
    });

    form.setFieldsValue({
      hiringSkills: updatedHiringSkills,
    });
  };

  const filteredSkills = skillsData?.data?.filter(
    (option: any) => !selectedSkills.some((skill: any) => skill?.value === option?.id)
  );

  return (
    <StyledSkillsForm>
      <hr style={{ background: 'gray', margin: '10px 0 20px 0' }} />
      <div className="languages-form-wrapper">
        <div className="labels">
          <h2>{intl.messages.skills && intl.formatMessage({ id: 'skills' })}</h2>
          <h2>{intl.messages.skill_level_hiring && intl.formatMessage({ id: 'skill_level_hiring' })}</h2>
        </div>
        <Form.List name="hiringSkills">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div className="select-wrapper" key={key}>
                  <div className="select-box">
                    <div className="select">
                      <Select
                        disabled={disable}
                        loading={isLoading}
                        {...restField}
                        name={[name, 'skillsId']}
                        placeholder={intl.formatMessage({ id: 'addSkillsPlaceholder' })}
                        onChange={(value: any, option: any) => handleSkillChange(value, name, option)}
                      >
                        {filteredSkills?.map((option: any) => (
                          <SelectOption key={option.id} value={option.id}>
                            {option.content}
                          </SelectOption>
                        ))}
                      </Select>
                    </div>
                    <div className="level-select-wrapper">
                      <div className="select">
                        <Select
                          disabled={disable}
                          {...restField}
                          name={[name, 'level']}
                          placeholder={intl.formatMessage({ id: 'skill_level_hiring' })}
                        >
                          {skillLevels.map((option) => (
                            <SelectOption key={option.value} value={option.value}>
                              {option.label}
                            </SelectOption>
                          ))}
                        </Select>
                      </div>
                      <div className="mobile-hidden">
                        <IconButton
                          disable={disable}
                          iconId="close-svg"
                          onClick={() => handleRemoveOrClearField(name, fields.length, remove)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="more-btn">
                <Form.Item>
                  <AddMoreButton
                    disabled={disable}
                    label={intl.formatMessage({ id: 'addSkillsBtn' })}
                    onClick={() => handleAddField(add)}
                  />
                </Form.Item>
              </div>
            </>
          )}
        </Form.List>
      </div>
    </StyledSkillsForm>
  );
}
