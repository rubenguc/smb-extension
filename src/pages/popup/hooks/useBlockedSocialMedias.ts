import { BlockedSite } from "@src/interfaces";
import { backGroundService } from "@src/services";
import { useEffect, useState } from "react";

export const useBlockedSocialMedias = () => {
  const [socialMedias, setSocialMedias] = useState<BlockedSite[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await backGroundService.getBlockedSocialMedias();
        setSocialMedias(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const onSocialMediaClick = async (domain: string) => {
    try {
      setSocialMedias((prev) => {
        const index = prev.findIndex((sm) => sm.domain === domain);
        if (index === -1) return [...prev, { domain, isBlocked: true }];
        const newSocialMedias = [...prev];
        newSocialMedias[index].isBlocked = !newSocialMedias[index].isBlocked;
        return newSocialMedias;
      });
      const result = await backGroundService.toggleSocialMedia(domain);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    socialMedias,
    onSocialMediaClick,
  };
};
