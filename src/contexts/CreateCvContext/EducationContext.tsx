// EducationContext.tsx
import { Dayjs } from 'dayjs';
import { createContext, useContext, useReducer, Dispatch, ReactNode, FC } from 'react';

export interface EducationInterface {
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

interface EducationState {
  educations: EducationInterface[];
}

const initialState: EducationState = {
  educations: [],
};

type EducationAction =
  | { type: 'SET_EDUCATIONS'; payload: EducationInterface[] }
  | { type: 'ADD_EDUCATION'; payload: EducationInterface }
  | { type: 'UPDATE_EDUCATION'; payload: EducationInterface }
  | { type: 'DELETE_EDUCATION'; payload: number };

type EducationDispatch = Dispatch<EducationAction>;

const EducationContext = createContext<{ state: EducationState; dispatch: EducationDispatch } | undefined>(undefined);

const educationReducer = (state: EducationState, action: EducationAction): EducationState => {
  switch (action.type) {
    case 'SET_EDUCATIONS':
      return { ...state, educations: action.payload };
    case 'ADD_EDUCATION':
      return { ...state, educations: [...state.educations, action.payload] };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        educations: state.educations.map((edu) => (edu.id === action.payload.id ? action.payload : edu)),
      };
    case 'DELETE_EDUCATION':
      return { ...state, educations: state.educations.filter((edu) => edu.id !== action.payload) };

    default:
      return state;
  }
};

interface EducationProviderProps {
  children: ReactNode;
}

const EducationProvider: FC<EducationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(educationReducer, initialState);

  return <EducationContext.Provider value={{ state, dispatch }}>{children}</EducationContext.Provider>;
};

const useEducationContext = () => {
  const context = useContext(EducationContext);
  if (!context) {
    throw new Error('useEducationContext must be used within an EducationProvider');
  }
  return context;
};

export { EducationProvider, useEducationContext };
