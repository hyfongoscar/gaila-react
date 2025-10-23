import React, {
  type ReactNode,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import getErrorMessage from 'utils/response/error';

import { type AlertOption, Provider } from './context';

const defaultOption: Partial<AlertOption> = {
  autoHideDuration: 5000,
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
};

function AlertProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState<ReactNode>(null);
  const [options, setOptions] = useState<AlertOption>({});

  const handleClose = useCallback(() => {
    setOpen(false);
    if (options?.onClose) {
      options.onClose();
    }
  }, [options]);

  const handleNewAlert = useCallback(
    (message: ReactNode, opt: AlertOption = {}) => {
      setMessage(message);
      setOpen(true);
      setOptions({
        ...defaultOption,
        type: 'info',
        ...opt,
      });
    },
    [],
  );

  const handleNewSuccess = useCallback(
    (message: ReactNode, opt: AlertOption = {}) => {
      handleNewAlert(message, { ...opt, type: 'success' });
    },
    [handleNewAlert],
  );

  const handleNewWarning = useCallback(
    (message: ReactNode, opt: AlertOption = {}) => {
      handleNewAlert(message, { ...opt, type: 'warning' });
    },
    [handleNewAlert],
  );

  const handleNewError = useCallback(
    (error: unknown, opt: AlertOption = {}) => {
      handleNewAlert(getErrorMessage(error), { ...opt, type: 'error' });
    },
    [handleNewAlert],
  );

  const closeAlert = useCallback(() => {
    setOpen(false);
  }, []);

  const context = useMemo(
    () => ({
      alertMsg: handleNewAlert,
      successMsg: handleNewSuccess,
      warningMsg: handleNewWarning,
      errorMsg: handleNewError,
      closeAlert: closeAlert,
    }),
    [
      handleNewAlert,
      handleNewSuccess,
      handleNewWarning,
      handleNewError,
      closeAlert,
    ],
  );

  return (
    <Provider value={context}>
      {children}
      <Snackbar
        anchorOrigin={options.anchorOrigin}
        autoHideDuration={options.autoHideDuration}
        onClose={handleClose}
        open={open}
      >
        <Alert severity={options.type} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Provider>
  );
}

export default memo(AlertProvider);
