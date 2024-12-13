import { StatusType, datadogLogs } from "@datadog/browser-logs";
import AppUser from "@/models/appUser";

interface Dict {
  [key: string]: any;
}

export interface LogItem {
  data?: Dict;
  error?: Error;
}

export const initLogger = () => {
  try {
    const env = process.env.NODE_ENV ?? "development";
    datadogLogs.init({
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? "",
      site: process.env.NEXT_PUBLIC_DATADOG_SITE ?? "",
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
      service: process.env.NEXT_PUBLIC_DATADOG_SERVICE ?? "",
      env,
    });
  } catch (error: any) {
    Logger.error("Error initializing logger", {
      error,
    });
  }
};

export const setUserLogger = (user?: AppUser | null) => {
  datadogLogs.setUser({
    id: user?.userId,
    name: user?.displayName || "",
    email: user?.email || "",
  });
};

const log = (
  type: StatusType,
  message: string,
  error: any,
  logItem?: LogItem,
) => {
  printLog(type, message, error, logItem);
  try {
    datadogLogs.logger.log(message, logItem?.data, type, logItem?.error);
  } catch (error: any) {}
};

const printLog = (
  type: StatusType,
  message?: string,
  error?: any,
  logItem?: LogItem,
) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  const logText = `${`${type || ""}: `}${message ?? ""} ${
    logItem?.data ? JSON.stringify(logItem.data) : ""
  } ${logItem?.error ? JSON.stringify(logItem.error) : ""}
  }`;
  switch (type) {
    case StatusType.info:
      console.info(logText);
      break;
    case StatusType.warn:
      console.warn(logText);
      break;
    case StatusType.error:
      console.error(logText);
      break;
    case StatusType.debug:
      console.log(logText);
      break;
    default:
      console.log(message, logItem);
      break;
  }
};

export class Logger {
  static info(message: string, error: any, logItem?: LogItem) {
    log(StatusType.info, message, logItem);
  }

  static warn(message: string, error: any, logItem?: LogItem) {
    log(StatusType.warn, message, logItem);
  }

  static error(message: string, error: any, logItem?: LogItem) {
    log(StatusType.error, message, logItem);
  }

  static debug(message: string, error: any, logItem?: LogItem) {
    log(StatusType.debug, message, logItem);
  }
}
