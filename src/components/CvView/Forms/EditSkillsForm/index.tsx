import React, { useEffect, useState } from 'react';
import { StyledEditSkillsSide } from './style';
import SvgSelector from 'assets/icons/SvgSelector';
import { RealCvInterface } from 'types/RealCV';
import { Dropdown, Form, MenuProps } from 'antd';
import { Select, SelectOption } from 'ui';
import { skillLevels } from 'utils/consts';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useIntl } from 'react-intl';
import { useUserDispatch, useUserState } from 'contexts/UserContext';
import {  UserSkill } from 'types/Skill';
import { handleAccessDeniedError } from 'utils/globalFunctions';

type RealCVProps = {
  cvData: RealCvInterface;
};

export function EditSkillsForm({ cvData }: RealCVProps) {
  const { skills, user } = cvData;
  const intl = useIntl();
  const [skillForm] = Form.useForm();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const [skillData, setSkillData] = useState<any[]>([]);
  const [changedSkillData, setChangedSkillData] = useState<any>();
  const [userSkills, setUserSkills] = useState<UserSkill[] | undefined>([]);

  const { data: skillApiData } = useQueryApiClient({
    request: {
      url: 'api/skill',
      method: 'GET',
    },
    onSuccess: (response) => {
      setSkillData(response.data || []);
    },
  });

  const { appendData: CreateUserSkillApi } = useQueryApiClient({
    request: {
      url: `/api/user-skill/user/${cvData?.user?.id}`,
      method: 'POST',
    },
    onSuccess(res) {
      if (userSkills !== undefined) {
        setUserSkills([...userSkills, res.data]);
      } else {
        setUserSkills([res.data]);
      }
      setChangedSkillData({});
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { appendData: UpdateSkillLevelApi } = useQueryApiClient({
    request: {
      url: `/api/user-skill/${changedSkillData?.id}`,
      method: 'PUT',
    },
    onSuccess() {
      setChangedSkillData({});
    },
  });

  const { refetch: refechtDeleteSkillApi } = useQueryApiClient({
    request: {
      url: `/api/user-skill/${changedSkillData?.id}`,
      method: 'DELETE',
    },
    onSuccess: (res) => {
      const updatedSkills = userSkills?.filter((skill) => skill.id !== changedSkillData?.id);
      setUserSkills(updatedSkills);
      setChangedSkillData({});
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const handleAddSkill = (selectedSkillId: number) => {
    const selectedSkill = skillApiData?.data?.find((item: any) => item.id === selectedSkillId);

    if (selectedSkill) {
      CreateUserSkillApi({ skillId: selectedSkillId, level: 'Beginner' });
    }
  };

  const handleSkillFormChange = (changedValues: Record<string, string | number>) => {
    Object.entries(changedValues).forEach(([name, value]) => {
      const match = name.match(/(level|verify)\$(\d+)/);

      if (match) {
        const [, type, skillId] = match;
        setChangedSkillData({ id: parseInt(skillId, 10), value, type });
      }
    });
  };

  const handleOpenDeleteModal = (id: number) => {
    setChangedSkillData({ type: 'delete', id });
  };

  const skillMenuItems = skillData?.map((item: any) => ({
    label: <div onClick={() => handleAddSkill(item.id)}>{item.content}</div>,
    key: item.id.toString(),
  }));

  const skillMenuProps: MenuProps = {
    items: skillMenuItems || [],
    style: {
      maxHeight: '200px',
      overflowY: 'auto',
    },
  };

  useEffect(() => {
    if (changedSkillData?.id && changedSkillData?.type === 'level') {
      UpdateSkillLevelApi(changedSkillData.value);
    } else if (changedSkillData?.id && changedSkillData?.type === 'delete') {
      refechtDeleteSkillApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedSkillData]);

  useEffect(() => {
    const getFilteredSkills = () => {
      return (
        skillApiData?.data?.filter((item: any) => {
          const isSkillSelected = isSkillInCV(item);
          return !isSkillSelected;
        }) ?? []
      );
    };
    const isSkillInCV = (item: any) => {
      return userSkills?.some((selectedSkill) => selectedSkill.skill.id === item.id);
    };

    const filteredSkills = getFilteredSkills();
    setSkillData(filteredSkills);
  }, [userSkills, skillApiData?.data]);

  useEffect(() => {
    setUserSkills(cvData?.skills);

    if (cvData && cvData.skills) {
      const initialValues: Record<string, any> = {};
      cvData?.skills?.forEach((item) => {
        initialValues[`level$${item.id}`] = item.level;
        initialValues[`verify$${item.skill.id}`] = item.verified;
      });
      skillForm.setFieldsValue(initialValues);
    }
  }, [cvData, skillForm]);

  return (
    <StyledEditSkillsSide>
      <Form form={skillForm} onValuesChange={(changedValues) => handleSkillFormChange(changedValues)}>
        <ul className="cv-preview-bar-ul ul-left-side">
          {userSkills &&
            userSkills.map((skill: any, index: number) => (
              <li key={index} className="edit-skills">
                <p className="left-side-list-name">{skill.skill.content}</p>
                <Select
                  name={`level$${skill.id}`}
                  disabled={skill.verified && true}
                  defaultValue={skill.level}
                  className="level-select"
                >
                  {skillLevels.map((degree, index) => (
                    <>
                      <SelectOption key={index} value={degree.value}>
                        {degree.label}
                      </SelectOption>
                    </>
                  ))}
                </Select>
                <div className="verified-span">
                  {skill.verified ? (
                    <SvgSelector className="verified" id="addverified" />
                  ) : (
                    <span className="remove-button" onClick={() => handleOpenDeleteModal(skill.id)}>
                      <SvgSelector id="close-svg" />
                    </span>
                  )}
                </div>
              </li>
            ))}
          <li>
            <Dropdown menu={skillMenuProps} trigger={['click']}>
              <div className="add-button">
                <span>+ {intl.messages.addSkill && intl.formatMessage({ id: 'addSkill' })}</span>
              </div>
            </Dropdown>
          </li>
        </ul>
      </Form>
    </StyledEditSkillsSide>
  );
}
