import { User } from './User';
import { DesiredPosition } from './DesiredPosition';

export type Talent = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  dateOfBirth?: string;
  bio?: string | null;
  jobExperience?: string;
  address?: any; //temp
  position?: string;
  contact?: string | null;
  image?: any; //temp
  user?: User;
  desiredPosition?: DesiredPosition | number | any;
  about?: string;
  jobExpectations?: string;
  skills?: any;
  experiences?: any;
  educations?: any;
  hobbies?: any;
  languages?: any;
  isRealDataCv?: boolean;
};

export type TalentsFilterType = {
  pageIndex: number;
  pageSize: number;
  desiredPositionId?: number | null;
  verifiedSkillIds?: number | null;
  jobExperience?: string | null;
};
