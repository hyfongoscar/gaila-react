import React from 'react';

export type Role = 'admin' | 'teacher' | 'student';

export interface AuthProviderPropsType {
  isLoggedIn: boolean;
  token: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  role: Role | null;
  lang: string;
  serverTime: number;
}

export type LoginActionParams = Omit<AuthProviderPropsType, 'isLoggedIn'>;
export interface AuthProviderType extends AuthProviderPropsType {
  loginAction: (auth: LoginActionParams) => Promise<void>;
  logoutAction: (redirect?: string) => Promise<void>;
  isLoaded: boolean;
  isInitialized: boolean;
}

const AuthProviderContext = React.createContext<AuthProviderType>({
  token: '',
  role: 'student',
  lang: '',
  refreshToken: '',
  expiresIn: 0,
  refreshTokenExpiresIn: 0,
  serverTime: 0,
  isLoggedIn: false,
  isLoaded: false,
  isInitialized: false,
  loginAction: async () => {},
  logoutAction: async () => {},
});

export const { Provider, Consumer } = AuthProviderContext;

export default AuthProviderContext;
