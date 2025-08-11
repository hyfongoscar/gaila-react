import { clearCache } from 'api/_requestor';
import history from 'utils/service/history';

import { pathnames } from '../../../routes';

const redirectToLoginPage = async (optional = false, apiPath?: string) => {
  try {
    if (optional) return;
    console.warn('401', apiPath);

    let url: string | undefined =
      history.location.pathname +
      history.location.search +
      history.location.hash;
    url = url === '/' ? undefined : url;

    // Clear all auth related cache
    clearCache();

    const injectedLogout = (window as any).gaila.injectedLogout as (
      x: string,
    ) => void;
    if (injectedLogout) {
      injectedLogout(pathnames.login(url));
    }
  } catch (e) {
    // @ts-expect-error assigning window.location
    window.location = `${window.location.origin}${pathnames.login(
      window.location.pathname,
    )}`;
  }
};

export default redirectToLoginPage;
