import { createContext, useContext, useReducer, Dispatch, ReactNode, FC } from 'react';

export interface UserLanguageInterface {
  id: number;
  languageId: number;
  level?: string;
}

interface UserLanguagetate {
  userlanguage: UserLanguageInterface[];
}

type LanguageAction =
  | { type: 'SET_LANGUAGE'; payload: UserLanguageInterface[] }
  | { type: 'ADD_LANGUAGE'; payload: UserLanguageInterface }
  | { type: 'UPDATE_LANGUAGE'; payload: UserLanguageInterface }
  | { type: 'DELETE_LANGUAGE'; payload: number };

type LanguageDispatch = Dispatch<LanguageAction>;

const LanguageContext = createContext<{ state: UserLanguagetate; dispatch: LanguageDispatch } | undefined>(undefined);

const languageInitialState: UserLanguagetate = {
  userlanguage: [{ id: new Date().getMilliseconds(), languageId: 0 }],
};

const languageReducer = (state: UserLanguagetate, action: LanguageAction): UserLanguagetate => {
  switch (action.type) {
    case 'ADD_LANGUAGE':
      return { ...state, userlanguage: [...state.userlanguage, action.payload] };
    case 'SET_LANGUAGE':
      return { ...state, userlanguage: action.payload };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        userlanguage: state.userlanguage.map((lang) => (lang.id === action.payload.id ? action.payload : lang)),
      };
    case 'DELETE_LANGUAGE':
      return { ...state, userlanguage: state.userlanguage.filter((lang) => lang.id !== action.payload) };
    default:
      return state;
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, languageInitialState);

  return <LanguageContext.Provider value={{ state, dispatch }}>{children}</LanguageContext.Provider>;
};

const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};

export { LanguageProvider, useLanguageContext };
