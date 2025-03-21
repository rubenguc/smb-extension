import { FC, useState } from "react";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Plus } from "lucide-react";

interface AddCustomSiteProps {
  onAddSite: (site: string) => Promise<void>;
}

export const AddCustomSite: FC<AddCustomSiteProps> = ({ onAddSite }) => {
  const [site, setSite] = useState("");

  const isValidSite = (site: string) => {
    try {
      new URL(site);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleAddSite = async () => {
    if (!isValidSite(site)) return;
    try {
      await onAddSite(new URL(site).host);
      setSite("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Input
          placeholder="https://example.com"
          className="text-white text-sm border-gray-300/60"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <Button
          disabled={!isValidSite(site)}
          variant="outline"
          size="icon"
          onClick={handleAddSite}
          className="border-custom-orange bg-custom-orange hover:bg-custom-orange/80"
        >
          <Plus />
        </Button>
      </div>

      <p className="text-sm text-red-500 h-5">
        {site && !isValidSite(site) && "Invalid url"}
      </p>
    </>
  );
};
