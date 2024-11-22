import { Dayjs } from 'dayjs';

interface Country {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

interface Region {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  countryId: number;
  country: Country;
}

interface Address {
  id: number;
  createdAt: string;
  updatedAt: string;
  regionId: number;
  region: Region;
  otherRegion: boolean;
  countryId: number;
  country: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  street: string;
}

export interface Skill {
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

interface Experience {
  id: number;
  companyName: string;
  job: string;
  dateFrom: Date | Dayjs;
  dateTo: Date | Dayjs;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Education {
  id: number;
  name: string;
  degree: string;
  programme: string;
  location: string;
  dateFrom: Date | Dayjs;
  dateTo?: Date | Dayjs;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
}
interface Certificate {
  id: number;
  createdAt: string;
  updatedAt: string;
  certificateName: string;
  certificateProgramme: string;
  issuingDate?: Dayjs;
  expiringDate?: Dayjs;
}

interface Hobby {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Language {
  id: number;
  createdAt: string;
  updatedAt: string;
  language: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  level: string;
}

interface UiContent {
  id: number;
  createdAt: string;
  updatedAt: string;
  text: string;
  key: string;
}

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  role: string;
}

export interface CvPageInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  bio: string | null;
  address: Address;
  position: string;
  contact: string | null;
  image: {
    id: number;
    createdAt: string;
    updatedAt: string;
    path: string;
  };
  user: User;
  desiredPosition: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  about: string;
  jobExpectations: string;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  certificates: Certificate[];
  hobbies: Hobby[];
  languages: Language[];
  jobExperience: string;
  freelancerStatus: FreelancerStatus;
}

export interface SkillType {
  id: number;
  skill: {
    id: number;
    content: string;
  };
  level: string;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
}
export interface FreelancerStatus {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  text: string;
}

interface DataType {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  bio: string | null;
  jobExperience: string;
  address: {
    id: number;
    createdAt: string;
    updatedAt: string;
    regionId: number;
    region: {
      id: number;
      createdAt: string;
      updatedAt: string;
      name: string;
      countryId: number;
      country: {
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
      };
    };
    otherRegion: boolean;
    countryId: number;
    country: {
      id: number;
      createdAt: string;
      updatedAt: string;
      name: string;
    };
    street: string;
  };
  position: string;
  contact: null | any; // Please replace 'any' with the actual type
  image: null | any; // Please replace 'any' with the actual type
  user: {
    id: number;
    createdAt: string;
    updatedAt: string | null;
    email: string;
    role: string;
    freelancerId: number;
  };
  desiredPosition: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  about: string;
  jobExpectations: string;
  skills: {
    id: number;
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
  }[];
  experiences: {
    id: number;
    createdAt: string;
    updatedAt: string;
    companyName: string;
    job: string;
    dateFrom: string;
    dateTo: string;
    description: string;
  }[];
  educations: {
    id: number;
    name: string;
    degree: string;
    location: string;
    programme: string;
    dateFrom: string;
    dateTo: string;
    createdAt: string;
    updatedAt: string;
  }[];
  hobbies: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  }[];
  languages: {
    id: number;
    createdAt: string;
    updatedAt: string;
    language: {
      id: number;
      createdAt: string;
      updatedAt: string;
      name: string;
    };
    level: string;
  }[];
  freelancerStatus: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    text: null | string;
  };
}

export interface FreelancerListProps {
  data?: DataType[];
  isLoading?: boolean;
  filterRefetch: () => void;
  setFreelancerId: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number | undefined;
}

export interface UiContentProps {
  data?: UiContent[];
  isLoading?: boolean;
}

export interface QueryParams {
  PageIndex: number;
  PageSize: number;
  DesiredPositionId: number | null;
  SkillIds: number[] | null;
  SkillsVerification: boolean | null;
  JobExperience: string | null;
  RegistrationDateFrom: Date | null;
  RegistrationDateTo: Date | null;
  Name: string | null;
  Surname: string | null;
  StatusId: number | null;
  CountryId: number | null;
  LanguageIds: number[] | null;
}

export interface VerifiedItem {
  label: string;
  value: boolean;
}

export type programmDataType = {
  items: {
    id: number;
    name_en: string;
    name_ru: string;
    name_uz: string;
    cloudStudyId: number;
    status: string;
  }[];
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
};

type items = {
  email: string;
}

export type telegramStatistic = {
  data: {
    items: items[]
  }
}
