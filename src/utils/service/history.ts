import { type BrowserHistory, createBrowserHistory } from 'history';

let history: BrowserHistory | null = null;

// Only create browser history when window is defined (client-side)
if (typeof window !== 'undefined') {
  history = createBrowserHistory();
}

export default history;
