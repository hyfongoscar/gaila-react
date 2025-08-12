declare global {
  interface Window {
    gaila: {
      version: Record<string, string>;
      unloadCount?: number;
      lang?: string;
      god?: boolean;
      injectedLogout?: (url: string) => void;
      [key: string]: any;
    };
  }
}

if (typeof window !== 'undefined') {
  window.gaila = {
    version: {},
  };
}

export {};
