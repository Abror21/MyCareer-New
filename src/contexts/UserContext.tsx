import React from 'react';
import { UserAddress } from '../types/UserAddress';

interface PayloadType {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  cvEmail?: string;
  address?: UserAddress | null;
  desiredPositionId?: number | null;
  jobExperience?: string | null;
  personalCode?: string;
  regNr?: string;
  lastLogin?: string;
  userType?: string;
  selectedRole?: number;
  role?: string;
  refetch?: Function;
  loggingOut: boolean;
  sendEmail?: boolean;
  userNotifications?: number;
  userEmbeds?: number;
  refresh?: boolean;
  allowedPages?: string[];
}

interface UserType {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  cvEmail?: string;
  address?: UserAddress | null;
  desiredPositionId?: number | null;
  jobExperience?: string | null;
  loggingOut?: boolean;
  image?: string | null;
  refresh?: boolean;
  allowedPages?: string[];
  role?: string;
  isUploadCv?: number;
}

export interface UserRole {
  id: number;
  firstName: string;
  lastName: string;
  code: string;
  institutionName: string;
  institutionClassifierId: number;
  email: string;
  emailVerified: boolean;
}

type PayloadAction =
  | { type: 'SET_USER_DATA'; payload: UserType }
  | { type: 'SAVE_PAYLOAD'; payload: PayloadType }
  | { type: 'SELECT_ROLE'; payload: PayloadType };

type RefetchAction = {
  type: 'REFETCH';
};

type SelectRoleAction = {
  type: 'SELECT_ROLE';
  payload: {
    selectedRole?: number;
    loggingOut: boolean;
  };
};

type Action = PayloadAction | RefetchAction | SelectRoleAction;

type Dispatch = (action: Action) => void;

type State = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cvEmail: string;
  address?: UserAddress | null;
  desiredPositionId?: number | null;
  jobExperience?: string | null;
  image?: string | null;
  personalCode: string;
  regNr: string;
  lastLogin: string;
  userType: string;
  selectedRole?: number;
  role: string;
  refetch: Function;
  logout: Function;
  loggingOut: boolean;
  sendEmail: boolean;
  userNotifications: number;
  userEmbeds: number;
  refresh: boolean;
  allowedPages?: string[] | null;
};

type UserProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<State>(undefined!);
const UserDispatchContext = React.createContext<Dispatch>(undefined!);

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_USER_DATA': {
      let { payload } = action;

      const user = window.localStorage.getItem('user');

      if (!user) {
        window.localStorage.setItem('user', JSON.stringify(payload));
      } else {
        const userData = JSON.parse(user);
        const newData = { ...userData, ...payload };
        window.localStorage.setItem('user', JSON.stringify(newData));
      }

      return {
        ...state,
        ...payload,
      };
    }
    case 'SAVE_PAYLOAD': {
      let payload = action.payload;
      // if (payload.roles.length === 1) {
      //   payload.selectedRole = payload.roles[0].id;
      //   window.localStorage.setItem('selected-role', payload.roles[0].id.toString());
      // }

      return {
        ...state,
        ...payload,
      };
    }
    case 'REFETCH': {
      state.refetch();
      return {
        ...state,
      };
    }
    case 'SELECT_ROLE': {
      let payload = action.payload.selectedRole;
      let loggingOut = action.payload.loggingOut;
      window.localStorage.setItem('selected-role', payload?.toString() || '');

      return {
        ...state,
        loggingOut,
        selectedRole: payload,
      };
    }
  }
}

let storedUserData: string | null = window.localStorage.getItem('user');
if (!storedUserData) {
  window.localStorage.setItem('user', '');
}
let user: UserType = storedUserData ? JSON.parse(storedUserData) : '';

function UserProvider({ children }: UserProviderProps) {
  const initialState = {
    id: user.id || 0,
    isUploadCv: user.isUploadCv || 0,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    cvEmail: user.cvEmail || '',
    address: user.address || null,
    image: user.image || null || '',
    desiredPositionId: user.desiredPositionId || null,
    jobExperience: user.jobExperience || null,
    personalCode: '',
    regNr: '',
    lastLogin: '',
    userType: '',
    selectedRole: parseInt(window.localStorage.getItem('selected-role') || ''),
    role: user.role || '',
    sendEmail: false,
    userNotifications: 0,
    userEmbeds: 0,
    loggingOut: user.loggingOut || false,
    refetch: () => null,
    logout: () => null,
    refresh: false,
    allowedPages: user.allowedPages || null || [] || undefined,
  };

  const [state, dispatch] = React.useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

const useUserState = () => React.useContext(UserStateContext);
const useUserDispatch = () => {
  const dispatch = React.useContext(UserDispatchContext);
  return { dispatch };
};

export { UserProvider, useUserDispatch, useUserState };
