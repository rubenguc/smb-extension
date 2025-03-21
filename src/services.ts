import Browser from "webextension-polyfill";
import { BlockedSite } from "./interfaces";
import { BACKGROUND_MESSAGES } from "./constants";

const sendMessage = async (message: string, params?: any): Promise<any> => {
  const result = await Browser.runtime.sendMessage({
    message,
    params,
  });

  if (result.error) throw new Error(result.message);

  return result.data;
};

export const backGroundService = {
  getBlockedSocialMedias: (): Promise<BlockedSite[]> =>
    sendMessage(BACKGROUND_MESSAGES.GET_BLOCKED_SOCIAL_MEDIAS),

  toggleSocialMedia: (domain: string): Promise<void> =>
    sendMessage(BACKGROUND_MESSAGES.TOGGLE_SOCIAL_MEDIA, { domain }),

  toggleActiveMode: (): Promise<void> =>
    sendMessage(BACKGROUND_MESSAGES.TOGGLE_ACTIVE_MODE),

  getActiveMode: (): Promise<boolean> =>
    sendMessage(BACKGROUND_MESSAGES.GET_ACTIVE_MODE),

  addCustomSite: (domain: string): Promise<void> =>
    sendMessage(BACKGROUND_MESSAGES.ADD_CUSTOM_SITE, { domain }),

  removeCustomSite: (domain: string): Promise<void> =>
    sendMessage(BACKGROUND_MESSAGES.REMOVE_CUSTOM_SITE, { domain }),

  getBlockSites: (): Promise<BlockedSite[]> =>
    sendMessage(BACKGROUND_MESSAGES.GET_BLOCKED_SITES),

  isDomainBlocked: (domain: string): Promise<boolean> =>
    sendMessage(BACKGROUND_MESSAGES.IS_DOMAIN_BLOCKED, { domain }),

  isDomainAdded: (domain: string): Promise<boolean> =>
    sendMessage(BACKGROUND_MESSAGES.IS_DOMAIN_ADDED, { domain }),
};
