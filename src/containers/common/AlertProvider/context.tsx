import React, { type ComponentProps, type JSX, type ReactNode } from 'react';

import type Alert from '@mui/material/Alert';
import type Snackbar from '@mui/material/Snackbar';

export type AlertType = ComponentProps<typeof Alert>['severity'];

export interface AlertOption extends Partial<ComponentProps<typeof Snackbar>> {
  onClose?: () => void;
  type?: AlertType;
}

export interface AlertProviderType {
  alertMsg: (message: ReactNode, options?: AlertOption) => void;
  successMsg: (message: ReactNode, options?: AlertOption) => void;
  warningMsg: (message: ReactNode, options?: AlertOption) => void;
  errorMsg: (error: unknown, options?: AlertOption) => void;
  closeAlert: () => void;
}

const AlertProviderContext = React.createContext<AlertProviderType>({
  alertMsg: () => {},
  successMsg: () => {},
  warningMsg: () => {},
  errorMsg: () => {},
  closeAlert: () => {},
});

export const { Provider, Consumer } = AlertProviderContext;

export const withAlert = Component => (props: JSX.IntrinsicAttributes) => (
  <Consumer>{value => <Component {...props} alerter={value} />}</Consumer>
);

export default AlertProviderContext;
