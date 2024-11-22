declare global {
  interface Window {
    runConfig: {
      frontendUrl: string;
      backendUrl: string;
      nodeEnv: string;
      backendBotUrl: string;
      appDateFormat: string;
      latviaLocationSrc: string;
      uzbekistanLocationSrc: string;
    };
  }
}

export const routes = {
  api: {
    frontendUrl: window?.runConfig?.frontendUrl,
    baseUrl: window?.runConfig?.backendUrl,
    backendBotUrl: window?.runConfig?.backendBotUrl,
    nodeEnv: window.runConfig?.nodeEnv,
    appDateFormat: window.runConfig?.appDateFormat,
    latviaLocationSrc: window.runConfig?.latviaLocationSrc,
    uzbekistanLocationSrc: window.runConfig?.uzbekistanLocationSrc,
  },
};
