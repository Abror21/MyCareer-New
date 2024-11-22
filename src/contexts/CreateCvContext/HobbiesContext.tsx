import { createContext, useContext, useReducer, Dispatch, ReactNode, FC } from 'react';

export interface SelectedHobbies {
  hobbyName: string;
  id: number;
  hobbyId?: number;
  otherHobby?: string;
}

interface HobbyState {
  selectedHobbies: SelectedHobbies[];
}

type HobbyAction =
  | { type: 'ADD_HOBBY'; payload: SelectedHobbies }
  | { type: 'DELETE_HOBBY'; payload: number | string }
  | { type: 'SET_HOBBY_DATA'; payload: SelectedHobbies[] };

type HobbyDispatch = Dispatch<HobbyAction>;

const HobbyContext = createContext<{ state: HobbyState; dispatch: HobbyDispatch } | undefined>(undefined);

const hobbyInitialState: HobbyState = {
  selectedHobbies: [],
};
const hobbyReducer = (state: HobbyState, action: HobbyAction): HobbyState => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return { ...state, selectedHobbies: [action.payload, ...state.selectedHobbies] };
    case 'SET_HOBBY_DATA':
      return { ...state, selectedHobbies: action.payload };
    case 'DELETE_HOBBY':
      let filteredData = state.selectedHobbies.filter((m) => m.id !== action.payload);
      return { ...state, selectedHobbies: filteredData };
    default:
      return state;
  }
};

interface HobbyProviderProps {
  children: ReactNode;
}

const HobbyProvider: FC<HobbyProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(hobbyReducer, hobbyInitialState);
  return <HobbyContext.Provider value={{ state, dispatch }}>{children}</HobbyContext.Provider>;
};

const useHobbyContext = () => {
  const context = useContext(HobbyContext);
  if (!context) {
    throw new Error('useHobbyContext must be used within a HobbyProvider');
  }
  return context;
};

export { HobbyProvider, useHobbyContext };
