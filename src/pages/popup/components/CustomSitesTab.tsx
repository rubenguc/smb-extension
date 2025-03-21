import { FC } from "react";
import { AddCustomSite } from "./AddCustomSite";
import { CustomSitesList } from "./CustomSitesList";
import { useBlockedSites } from "../hooks/useBlockedSites";
import { AddCustomSiteFromTab } from "./AddCustomSiteFromTab";

export const CustomSitesTabs: FC = () => {
  const { blockedSites, onAddCustomSite, onRemoveCustomSite } =
    useBlockedSites();

  return (
    <>
      <AddCustomSite onAddSite={onAddCustomSite} />
      <CustomSitesList
        blockedSites={blockedSites}
        onRemove={onRemoveCustomSite}
      />
      <AddCustomSiteFromTab onAddCustomSite={onAddCustomSite} />
    </>
  );
};
