import { createContext } from 'react';

export interface ContextPropsI {
  state: UserDataI,
  dispatch: () => void;
}

export type UserDataI = {
  token: string | undefined,
  user: any,
  isAuthenticated: boolean,
}

export default createContext({} as any);
