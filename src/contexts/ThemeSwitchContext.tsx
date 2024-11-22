import React from 'react'

interface PayloadType {
  type: string
}

type PayloadAction = {
  type: 'SAVE_PAYLOAD'
  payload: PayloadType
}

type Action = PayloadAction

type Dispatch = (action: Action) => void

type State = {
  type: string
}

type ThemeSwitchProviderProps = { children: React.ReactNode }

const ThemeSwitchStateContext = React.createContext<State>(undefined!)
const ThemeSwitchDispatchContext = React.createContext<Dispatch>(undefined!)

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SAVE_PAYLOAD': {
      let payload = action.payload

      return {
        ...state,
        ...payload,
      }
    }
  }
}

function ThemeSwitchProvider({ children }: ThemeSwitchProviderProps) {
  const initialState = {
    type: 'default',
  }

  const [state, dispatch] = React.useReducer(userReducer, initialState)

  return (
    <ThemeSwitchStateContext.Provider value={state}>
      <ThemeSwitchDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeSwitchDispatchContext.Provider>
    </ThemeSwitchStateContext.Provider>
  )
}

const useThemeSwitchState = () => React.useContext(ThemeSwitchStateContext)
const useThemeSwitchDispatch = () =>
  React.useContext(ThemeSwitchDispatchContext)

export { ThemeSwitchProvider, useThemeSwitchDispatch, useThemeSwitchState }
