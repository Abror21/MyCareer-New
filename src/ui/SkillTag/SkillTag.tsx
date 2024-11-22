import React from 'react';
import { StyledSkillTag } from './style';

type SkillTagProps = {
  closable?: boolean;
  skillName?: string;
  skillLevel?: string;
  onClose?: any;
  verified?: boolean;
};

export const SkillTag = ({ closable = false, onClose, skillName, skillLevel, verified }: SkillTagProps) => {
  
  return (
    <StyledSkillTag closable={!verified ? closable : false} onClose={onClose}>
      <span className="skill-name">{skillName}</span>
      <span className="skill-level">&nbsp;{skillLevel}</span>
    </StyledSkillTag>
  );
};
