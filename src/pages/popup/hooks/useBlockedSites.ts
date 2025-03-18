import { useEffect, useState } from "react";
import { backGroundService } from "@src/services";
import { BlockedSite } from "@src/interfaces";

export const useBlockedSites = () => {
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const blockedSites = await backGroundService.getBlockSites();
        setBlockedSites(blockedSites);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onAddCustomSite = async (domain: string) => {
    try {
      const result = await backGroundService.addCustomSite(domain);

      console.log(result);

      setBlockedSites((state) => [
        ...state,
        {
          domain,
          isBlocked: true,
        },
      ]);
    } catch (error) {
      console.warn(error);
    }
  };

  const onRemoveCustomSite = async (domain: string) => {
    try {
      await backGroundService.removeCustomSite(domain);
      setBlockedSites((state) => state.filter((bs) => bs.domain !== domain));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    blockedSites,
    onAddCustomSite,
    onRemoveCustomSite,
  };
};
