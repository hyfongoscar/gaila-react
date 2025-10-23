import { useContext } from 'react';

import AlertProviderContext from './context';

const useAlert = () => {
  return useContext(AlertProviderContext);
};

export default useAlert;
