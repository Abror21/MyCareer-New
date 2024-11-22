import { DesiredPosition } from './DesiredPosition';
import { Skill } from './Skill';

export type AvatarCvType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  desiredPosition: DesiredPosition;
  about: string;
  jobExpectations: string;
  skills: Skill[];
  experiences: any;
  educations: any;
  hobbies: any;
  languages: any;
  // experiences: Experience[];
  // educations: Education[];
  // hobbies: Hobby[];
  // languages: Language[];
  jobExperience: string;
};
