import logger from 'sidelog-client';
import { v4 as uuid } from 'uuid';

const clientUuid = localStorage.getItem('client-id') || uuid();
localStorage.setItem('client-id', clientUuid);

logger.setConfig({
  sidelogUrl: "https://sidelog.sayerscloud.com",
  clientId: "345d5607-d267-40e0-8fc8-9f56e8c8301d",
  logToConsole: import.meta.env.DEV,
});

logger.updateDefaultMeta((currentMeta) => ({
  ...currentMeta,
  clientUuid,
}));

logger.info("Site loaded");

window.onerror = (event, source, lineno, colno, error) => {
  logger.error(
    typeof event === "string" ? event : error?.message ?? "Error",
    {
      source,
      lineno,
      colno,
      stack: error?.stack,
    }
  );
};

window.onunhandledrejection = (err) => {
  logger.error(err.reason);
};
