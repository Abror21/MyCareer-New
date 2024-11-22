import { FormInstance } from 'antd';
import { SelectedSkills } from './SelectedSkills';
import { SkillsForm } from './SkillsForm';
import { StyledSkills } from './style';

export const Skills = ({ skillForm }: { skillForm:  FormInstance<any> }) => {
  return (
    <StyledSkills>
      <SkillsForm  skillForm={skillForm} />
      <SelectedSkills />
    </StyledSkills>
  );
};
