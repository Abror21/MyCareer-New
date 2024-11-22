// WorkExperienceContext.tsx
import { Dayjs } from 'dayjs';
import { createContext, useContext, useReducer, Dispatch, ReactNode, FC } from 'react';

export interface WorkExperienceInterface {
  id: number;
  companyName: string;
  job: string;
  dateFrom: Date | Dayjs;
  dateTo: Date | Dayjs;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface WorkExperienceState {
  workExperiences: WorkExperienceInterface[];
}

const initialState: WorkExperienceState = {
  workExperiences: [],
};

type WorkExperienceAction =
  | { type: 'ADD_WORK_EXPERIENCE'; payload: WorkExperienceInterface }
  | { type: 'SET_WORK_EXPERIENCE'; payload: WorkExperienceInterface[] }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: WorkExperienceInterface }
  | { type: 'DELETE_WORK_EXPERIENCE'; payload: number };

type WorkExperienceDispatch = Dispatch<WorkExperienceAction>;

const WorkExperienceContext = createContext<
  { state: WorkExperienceState; dispatch: WorkExperienceDispatch } | undefined
>(undefined);

const workExperienceReducer = (state: WorkExperienceState, action: WorkExperienceAction): WorkExperienceState => {
  switch (action.type) {
    case 'ADD_WORK_EXPERIENCE':
      return { ...state, workExperiences: [...state.workExperiences, action.payload] };
    case 'SET_WORK_EXPERIENCE':
      return { ...state, workExperiences: action.payload };
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperiences: state.workExperiences.map((exp) => (exp.id === action.payload.id ? action.payload : exp)),
      };
    case 'DELETE_WORK_EXPERIENCE':
      return { ...state, workExperiences: state.workExperiences.filter((exp) => exp.id !== action.payload) };
    default:
      return state;
  }
};

interface WorkExperienceProviderProps {
  children: ReactNode;
}

const WorkExperienceProvider: FC<WorkExperienceProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(workExperienceReducer, initialState);
  return <WorkExperienceContext.Provider value={{ state, dispatch }}>{children}</WorkExperienceContext.Provider>;
};

const useWorkExperienceContext = () => {
  const context = useContext(WorkExperienceContext);
  if (!context) {
    throw new Error('useWorkExperienceContext must be used within a WorkExperienceProvider');
  }
  return context;
};

export { WorkExperienceProvider, useWorkExperienceContext };
