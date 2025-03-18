import { SocialMedia } from "./SocialMedia";
import { useBlockedSocialMedias } from "../hooks/useBlockedSocialMedias";

export const SocialMediaTab: FC = () => {
  const { onSocialMediaClick, socialMedias } = useBlockedSocialMedias();

  return (
    <div className="flex flex-col gap-4">
      {socialMedias.map((sm) => (
        <SocialMedia key={sm.domain} {...sm} onToggle={onSocialMediaClick} />
      ))}
    </div>
  );
};
