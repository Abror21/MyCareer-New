import { Button, Form } from 'antd';
import { FormInstance } from 'antd/lib';
import SvgSelector from 'assets/icons/SvgSelector';
import { useSkillContext, SelectedSkills } from 'contexts/CreateCvContext/SkillContext';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Select, SelectOption } from 'ui';
import { skillLevels } from 'utils/consts';
import { openNotification } from 'utils/globalFunctions';
import useQueryApiClient from 'utils/useQueryApiClient';

export const SkillsForm = ({ skillForm }: { skillForm: FormInstance<any> }) => {
  const intl = useIntl();
  const { state, dispatch } = useSkillContext();
  const onFinish = (values: SelectedSkills) => {
    if (state.selectedSkills.length >= 15) {
      openNotification('warning', intl.messages.addSkillsGreaterThanError && intl.formatMessage({ id: 'addSkillsGreaterThanError' }));
      return;
    }
    const selectedSkill = state.skills.find((skill) => skill.id === values.skillId);
    if (selectedSkill) {
      dispatch({ type: 'ADD_SKILL_DATA', payload: values });
      skillForm.resetFields();
    }
  };

  const { data: skillData, isLoading: skillLoading } = useQueryApiClient({
    request: {
      url: '/api/skill',
      method: 'GET',
    },
  });

  useEffect(() => {
    if (!skillLoading && skillData?.data?.length) {
      dispatch({ type: 'ADD_SKILL', payload: skillData.data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillData, skillLoading]);

  return (
    <Form
      form={skillForm}
      name="skill"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 1000 }}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      autoComplete="off"
      className="skills-form"
    >
      <div className="select-box">
        <div className="select">
          <label htmlFor="skills">
            <span>*</span> {intl.messages.skills && intl.formatMessage({ id: 'skills' })}
          </label>
          <Select
            name="skillId"
            placeholder={intl.messages.addSkillsPlaceholder && intl.formatMessage({ id: 'addSkillsPlaceholder' })}
            rules={[{ required: true, message: intl.messages.SkillInputError && intl.formatMessage({ id: 'SkillInputError' }) }]}
            loading={skillLoading}
          >
            {state?.skills.map((option) => {
              const isSkillSelected = state?.selectedSkills?.some((m) => m.skillId === option.id);
              if (!isSkillSelected) {
                return (
                  <SelectOption key={option?.id} value={option?.id}>
                    {option?.content}
                  </SelectOption>
                );
              }
            })}
          </Select>
        </div>
        <div className="select">
          <label htmlFor="levels">
            <span>*</span> {intl.messages.levels && intl.formatMessage({ id: 'levels' })}
          </label>
          <Select
            name="level"
            placeholder={intl.messages.addSkillsLevelPlaceholder && intl.formatMessage({ id: 'addSkillsLevelPlaceholder' })}
            rules={[{ required: true, message: intl.messages.SkillAddLevelInputError && intl.formatMessage({ id: 'SkillAddLevelInputError' }) }]}
          >
            {skillLevels.map((option) => (
              <SelectOption key={option.value} value={option.value}>
                {option.label}
              </SelectOption>
            ))}
          </Select>
        </div>
      </div>
      <Button className="add-btn" htmlType="submit">
        <SvgSelector id="plus-svg" />
      </Button>
    </Form>
  );
};
