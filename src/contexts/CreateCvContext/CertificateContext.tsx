import { Dayjs } from 'dayjs';
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

export interface CertificateInterface {
  id: number;
  certificateName: string;
  certificateProgramme: string;
  issuingDate?: Dayjs;
  expiringDate?: Dayjs;
}

interface CertificateContextState {
  certificates: CertificateInterface[];
}
const initialState: CertificateContextState = {
  // temporary data
  certificates: [],
};

type CertificateAction =
  | { type: 'ADD_CERTIFICATE'; payload: CertificateInterface }
  | { type: 'SET_CERTIFICATE'; payload: CertificateInterface[] }
  | { type: 'UPDATE_CERTIFICATE'; payload: CertificateInterface }
  | { type: 'DELETE_CERTIFICATE'; payload: number };

type CertificateDispatch = Dispatch<CertificateAction>;

const CertificateContext = createContext<
  | {
      state: CertificateContextState;
      dispatch: CertificateDispatch;
    }
  | undefined
>(undefined);

const certificateReducer = (state: CertificateContextState, action: CertificateAction): CertificateContextState => {
  switch (action.type) {
    case 'ADD_CERTIFICATE':
      return {
        ...state,
        certificates: [...state.certificates, action.payload],
      };
    case 'SET_CERTIFICATE':
      return {
        ...state,
        certificates: action.payload,
      };
    case 'UPDATE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.map((certificate) =>
          certificate.id === action.payload.id ? action.payload : certificate
        ),
      };
    case 'DELETE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.filter((certificate) => certificate.id !== action.payload),
      };
    default:
      return state;
  }
};

export const CertificateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(certificateReducer, initialState);

  return <CertificateContext.Provider value={{ state, dispatch }}>{children}</CertificateContext.Provider>;
};

export const useCertificateContext = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificateContext must be used within a CertificateProvider');
  }
  return context;
};
