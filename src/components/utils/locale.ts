import { enUs } from "../locales/en-us";
import { zhCn } from "../locales/zh-cn";
import { zhTw } from "../locales/zh-tw";

const locales = {
  "en-us": enUs,
  "zh-cn": zhCn,
  "zh-tw": zhTw,
};

let currentLocale = "zh-cn";

export const setLocale = (locale: string) => {
  currentLocale = locale;
};

export const i18n = (key: string): string => {
  const keys = key.split(".");
  let result: any = locales[currentLocale];
  
  for (const k of keys) {
    if (result && typeof result === "object") {
      result = result[k];
    } else {
      return key;
    }
  }
  
  return result || key;
};