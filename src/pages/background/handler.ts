import { BACKGROUND_MESSAGES, DEFAULT_SOCIAL_MEDIA } from "@src/constants";
import { BlockedSite } from "@src/interfaces";
import Browser from "webextension-polyfill";

export default class BackgroundHandler {
  private isActive: boolean = false;
  private blockedSocialMedia: BlockedSite[] = [];
  private blockedSites: BlockedSite[] = [];

  constructor() {
    this.initData();
  }

  private async saveData(key: string, value: any) {
    await Browser.storage.local.set({ [key]: value });
  }

  private initBlockedSocialMedia(): BlockedSite[] {
    return Object.keys(DEFAULT_SOCIAL_MEDIA).map((domain) => ({
      domain,
      isBlocked: false,
    }));
  }

  private async initData() {
    const data = (await Browser.storage.local.get()) as {
      isActive: boolean;
      blockedSocialMedia: BlockedSite[];
      blockedSites: BlockedSite[];
    };

    this.isActive = data.isActive || false;
    this.blockedSocialMedia =
      data.blockedSocialMedia || this.initBlockedSocialMedia();
    this.blockedSites = data.blockedSites || [];
  }

  private async getBlockedSocialMedia() {
    return this.blockedSocialMedia;
  }

  private async getBlockSites() {
    return this.blockedSites;
  }

  private async getActiveMode() {
    return this.isActive;
  }

  private async toggleActiveMode() {
    this.isActive = !this.isActive;
    await this.saveData("isActive", this.isActive);
  }

  private async addCustomSite(domain: string) {
    const siteAlreadyExists = this.blockedSites.some(
      (blockedSite) => blockedSite.domain === domain,
    );
    if (siteAlreadyExists) {
      throw new Error("domain_already_exists");
    }
    this.blockedSites.push({
      domain,
      isBlocked: true,
    });
    await this.saveData("blockedSites", this.blockedSites);
  }

  private async removeCustomSite(domain: string) {
    const index = this.blockedSites.findIndex(
      (blockedSite) => blockedSite.domain === domain,
    );
    if (index !== -1) {
      this.blockedSites.splice(index, 1);
      await this.saveData("blockedSites", this.blockedSites);
    }
  }

  private async toggleSocialMedia(domain: string) {
    const index = this.blockedSocialMedia.findIndex(
      (bsm) => bsm.domain === domain,
    );
    if (index !== -1) {
      this.blockedSocialMedia[index].isBlocked =
        !this.blockedSocialMedia[index].isBlocked;
      await this.saveData("blockedSocialMedia", this.blockedSocialMedia);
    }
  }

  handler(message: string, props: any) {
    switch (message) {
      case BACKGROUND_MESSAGES.GET_BLOCKED_SOCIAL_MEDIAS:
        return this.getBlockedSocialMedia();
      case BACKGROUND_MESSAGES.GET_BLOCKED_SITES:
        return this.getBlockSites();
      case BACKGROUND_MESSAGES.GET_ACTIVE_MODE:
        return this.getActiveMode();
      case BACKGROUND_MESSAGES.TOGGLE_ACTIVE_MODE:
        return this.toggleActiveMode();
      case BACKGROUND_MESSAGES.ADD_CUSTOM_SITE:
        return this.addCustomSite(props.domain);
      case BACKGROUND_MESSAGES.REMOVE_CUSTOM_SITE:
        return this.removeCustomSite(props.domain);
      case BACKGROUND_MESSAGES.TOGGLE_SOCIAL_MEDIA:
        return this.toggleSocialMedia(props.domain);
      default:
        throw new Error("invalid_method");
    }
  }
}
