export type Skill = {
  id: number;
  content: string;
  position?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type VerifiedSkills = {
  id: number;
  skill: Skill;
  level: string;
  createdAt?: string;
  updatedAt?: string;
  verified: boolean;
};

export interface UserSkill {
  id: number;
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    role: string;
  };
  skill: {
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
  };
  level: string;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
}
