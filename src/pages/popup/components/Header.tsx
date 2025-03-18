import { FC } from "react";
import { Label } from "@src/components/ui/label";
import { Switch } from "@src/components/ui/switch";

interface HeaderProps {
  isBlockActived: boolean;
  toggleActive: () => void;
}

export const Header: FC<HeaderProps> = ({ isBlockActived, toggleActive }) => {
  return (
    <header className="flex items-center justify-between text-white">
      <h2 className="text-xl">Focus Mode</h2>
      <div className="flex items-center space-x-2">
        <Label
          htmlFor="block-actived"
          className={`${isBlockActived ? "text-green-500" : "text-gray-500"}`}
        >
          {isBlockActived ? "Active" : "Inactive"}
        </Label>
        <Switch
          id="block-actived"
          checked={isBlockActived}
          onCheckedChange={toggleActive}
        />
      </div>
    </header>
  );
};
