import React from 'react';

export type Role = 'admin' | 'editor' | 'teacher' | 'student';

export interface AuthProviderPropsType {
  token: string;
  refreshToken: string;
  expiresIn: number;
  serverTime: number;
  refreshTokenExpiresIn: number;
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
  token: '',
  refreshToken: '',
  expiresIn: 0,
  serverTime: 0,
  refreshTokenExpiresIn: 0,
  isLoggedIn: false,
  role: null,
  isLoaded: false,
  isInitialized: false,
  loginAction: async () => {},
  logoutAction: async () => {},
});

export const { Provider, Consumer } = AuthProviderContext;

export const withAuth = (Component: any) => (props: any) => (
  <Consumer>{value => <Component {...props} auth={value} />}</Consumer>
);

export default AuthProviderContext;
