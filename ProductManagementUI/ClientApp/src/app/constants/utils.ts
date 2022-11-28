import { environment } from "src/environments/environment";

export const Utils = {
    getBaseUrl() {
      return document.getElementsByTagName('base')[0].href;
    }
  }
  