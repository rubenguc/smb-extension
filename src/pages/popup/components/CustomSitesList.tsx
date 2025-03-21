import { FC } from "react";
import { Button } from "@src/components/ui/button";
import { Label } from "@src/components/ui/label";
import { BlockedSite } from "@src/interfaces";
import { Globe, Trash } from "lucide-react";

interface CustomSitesListProps {
  blockedSites: BlockedSite[];
  onRemove: (domain: string) => void;
}

export const CustomSitesList: FC<CustomSitesListProps> = ({
  blockedSites,
  onRemove,
}) => {
  return (
    <>
      {blockedSites.map(({ domain, isBlocked }) => (
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-1">
            <Globe className="text-custom-white" size={16} />
            <div className="grid gap-1.5 leading-none overflow-hidden text-ellipsis">
              <Label
                htmlFor={domain}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              >
                {domain}
              </Label>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onRemove(domain)}
            className="bg-transparent border-none hover:bg-custom-white/20"
          >
            <Trash color="red" />
          </Button>
        </div>
      ))}
    </>
  );
};
