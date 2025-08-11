import React from 'react';

export type Role = 'admin' | 'editor' | 'teacher' | 'student';

export interface AuthProviderPropsType {
  accessToken: string;
  username: string;
  role: Role | null;
  isLoggedIn: boolean;
}

export type LoginActionParams = Omit<AuthProviderPropsType, 'isLoggedIn'>;
export interface AuthProviderType extends AuthProviderPropsType {
  loginAction: (auth: LoginActionParams) => Promise<void>;
  logoutAction: () => Promise<void>;
  isLoaded: boolean;
  isInitialized: boolean;
}

const AuthProviderContext = React.createContext<AuthProviderType>({
  accessToken: '',
  username: '',
  role: null,
  isLoggedIn: false,
  isLoaded: false,
  isInitialized: false,
  loginAction: async () => {},
  logoutAction: async () => {},
});

export const { Provider, Consumer } = AuthProviderContext;

export default AuthProviderContext;
