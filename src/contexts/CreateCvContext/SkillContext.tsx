import { createContext, useContext, useReducer, Dispatch, ReactNode, FC, useEffect } from 'react';
const LOCAL_STORAGE_KEY = 'selectedSkills';
interface Skill {
  id: number;
  content: string;
}

export interface SelectedSkills {
  skillId?: number;
  level: string;
  verified?: boolean;
}

interface SkillState {
  skills: Skill[];
  selectedSkills: SelectedSkills[];
}

type SkillAction =
  | { type: 'ADD_SKILL'; payload: any }
  | { type: 'ADD_SKILL_DATA'; payload: SelectedSkills }
  | { type: 'SET_SKILL_DATA'; payload: SelectedSkills[] }
  | { type: 'DELETE_SKILL_DATA'; payload: number };

type SkillDispatch = Dispatch<SkillAction>;

const SkillContext = createContext<{ state: SkillState; dispatch: SkillDispatch } | undefined>(undefined);

const skillInitialState: SkillState = {
  skills: [],
  selectedSkills: [],
};

const skillReducer = (state: SkillState, action: SkillAction): SkillState => {
  switch (action.type) {
    case 'ADD_SKILL':
      return { ...state, skills: action.payload };
    case 'ADD_SKILL_DATA':
      return { ...state, selectedSkills: [...state.selectedSkills, action.payload] };
    case 'SET_SKILL_DATA':
      return { ...state, selectedSkills: action.payload };
    case 'DELETE_SKILL_DATA':
      let filteredData = state.selectedSkills.filter((m) => m.skillId !== action.payload);
      return { ...state, selectedSkills: filteredData };
    default:
      return state;
  }
};

interface SkillProviderProps {
  children: ReactNode;
}

const SkillProvider: FC<SkillProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(skillReducer, skillInitialState);

  return <SkillContext.Provider value={{ state, dispatch }}>{children}</SkillContext.Provider>;
};

const useSkillContext = () => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkillContext must be used within a SkillProvider');
  }
  return context;
};

export { SkillProvider, useSkillContext };
