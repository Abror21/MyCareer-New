import { UserSkill } from './Skill';
import { User } from './User';
import { Language } from './Language';
import { Experience } from './Experience';
import { Education } from './Education';
import { Hobby } from './Hobby';
import { Certificate } from './Certificate';

export type RealCvInterface = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  dateOfBirth?: string;
  bio?: string | null;
  address?: any;
  contact?: string | null;
  image?: {
    id: number;
    createdAt: string;
    updatedAt: string;
    path: string;
    resizedPath200: string;
    resizedPath600: string;
  };
  user?: User;
  desiredPosition?: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  about?: string;
  jobExpectations?: string;
  jobExperience?: string;
  skills?: UserSkill[];
  educations?: Education[];
  hobbies?: Hobby[];
  languages?: Language[];
  experiences?: Experience[];
  certificates?: Certificate[];
  isRealDataCv?: boolean;
};
