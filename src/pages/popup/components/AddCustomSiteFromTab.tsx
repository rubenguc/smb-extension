import { FC, useEffect, useState } from "react";
import { backGroundService } from "@src/services";
import Browser from "webextension-polyfill";
import { Button } from "@src/components/ui/button";

interface AddCustomSiteFromTabProps {
  onAddCustomSite: (domain: string) => Promise<void>;
}

export const AddCustomSiteFromTab: FC<AddCustomSiteFromTabProps> = ({
  onAddCustomSite,
}) => {
  const [canAddSite, setCanAddSite] = useState(false);
  const [domain, setDomain] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const tabs = await Browser.tabs.query({
          active: true,
          currentWindow: true,
        });

        const domain = new URL(tabs[0].url!).hostname;

        if (domain) {
          const isDomainBlocked = await backGroundService.isDomainAdded(domain);

          setCanAddSite(!isDomainBlocked);
          setDomain(domain);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleAddSite = async () => {
    try {
      await onAddCustomSite(domain);
      setDomain("");
      setCanAddSite(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!canAddSite) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full p-2 border-t border-t-custom-white/40">
      <Button
        className="border-custom-orange bg-custom-orange hover:bg-custom-orange/80 w-full"
        onClick={handleAddSite}
      >
        Add current site
      </Button>
    </div>
  );
};
