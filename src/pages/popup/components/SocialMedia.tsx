import { FC } from "react";
import { BlockedSite } from "@src/interfaces";
import { Checkbox } from "@src/components/ui/checkbox";
import { Label } from "@src/components/ui/label";
import { DEFAULT_SOCIAL_MEDIA } from "@src/constants";

interface SocialMediaProps extends BlockedSite {
  onToggle: (domain: string) => void;
}

export const SocialMedia: FC<SocialMediaProps> = ({
  domain,
  isBlocked,
  onToggle,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={domain}
        checked={isBlocked}
        onCheckedChange={() => onToggle(domain)}
        className="data-[state=checked]:bg-custom-orange"
      />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={domain}
          className="text-sm font-medium leading-none cursor-pointer text-gray-100"
        >
          {DEFAULT_SOCIAL_MEDIA[domain] || domain}
        </Label>
      </div>
    </div>
  );
};
