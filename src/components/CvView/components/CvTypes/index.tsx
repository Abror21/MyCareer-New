interface Address {
  id: number;
  createdAt: string;
  updatedAt: string;
  countryId: number;
  country: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  street: string;
}

interface Skill {
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
  createdAt: string;
  updatedAt: string;
  companyName: string;
  job: string;
  dateFrom: string;
  dateTo: string;
  description: string;
}

interface Education {
  id: number;
  name: string;
  degree: string;
  location: string;
  programme: string;
  dateFrom: string;
  dateTo: string;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
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

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  role: string;
}

export interface RealCvInterface {
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
  jobExperience: string;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  hobbies: Hobby[];
  languages: Language[];
}
export interface RealCvProps {
  cvData?: RealCvInterface | undefined;
}
