import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

export interface FreelancerData {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  certificates: any[];
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
  contact: any;
  image: {
    id: number;
    createdAt: string;
    updatedAt: string;
    path: string;
  };
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    role: string;
    freelancerId: number | null;
  };
  desiredPosition: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  about: string;
  jobExpectations: string;
  skills: Array<{
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
  }>;
  experiences: Array<{
    id: number;
    createdAt: string;
    updatedAt: string;
    companyName: string;
    job: string;
    dateFrom: string;
    dateTo: string | null;
    description: string;
  }>;
  educations: Array<{
    id: number;
    name: string;
    degree: string;
    location: string;
    programme: string;
    dateFrom: string;
    dateTo: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  hobbies: Array<{
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  }>;
  languages: Array<{
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
  }>;
  freelancerStatus: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    text: string | null;
  };
  isRealDataCv: boolean | null;
}

interface FreelancerDataContextState {
  data: FreelancerData | null;
}

const initialState: FreelancerDataContextState = {
  data: null,
};

type FreelancerDataAction =
  | { type: 'SET_FREELANCER_DATA'; payload: FreelancerData | null }
  | { type: 'UPDATE_FREELANCER_DATA'; payload: FreelancerData };

type FreelancerDataDispatch = Dispatch<FreelancerDataAction>;

const FreelancerDataContext = createContext<
  | {
      state: FreelancerDataContextState;
      dispatch: FreelancerDataDispatch;
    }
  | undefined
>(undefined);

const freelancerDataReducer = (
  state: FreelancerDataContextState,
  action: FreelancerDataAction
): FreelancerDataContextState => {
  switch (action.type) {
    case 'SET_FREELANCER_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'UPDATE_FREELANCER_DATA':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const FreelancerDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(freelancerDataReducer, initialState);

  return <FreelancerDataContext.Provider value={{ state, dispatch }}>{children}</FreelancerDataContext.Provider>;
};

export const useFreelancerDataContext = () => {
  const context = useContext(FreelancerDataContext);
  if (!context) {
    throw new Error('useFreelancerDataContext must be used within a FreelancerDataProvider');
  }
  return context;
};
