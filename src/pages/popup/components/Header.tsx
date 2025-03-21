import { FC } from "react";
import { Label } from "@src/components/ui/label";
import { Switch } from "@src/components/ui/switch";

interface HeaderProps {
  isBlockActived: boolean;
  toggleActive: () => void;
}

export const Header: FC<HeaderProps> = ({ isBlockActived, toggleActive }) => {
  return (
    <header className="flex items-center justify-between text-white p-2">
      <h2 className="text-xl">Focus Mode</h2>
      <div className="flex items-center space-x-2">
        <Label
          htmlFor="block-actived"
          className={`${isBlockActived ? "text-green-500" : "text-gray-500"}`}
        >
          {isBlockActived ? "Active" : "Inactive"}
        </Label>
        <Switch
          color="green"
          id="block-actived"
          checked={isBlockActived}
          onCheckedChange={toggleActive}
          className="data-[state=unchecked]:bg-custom-white data-[state=checked]:bg-custom-orange"
        />
      </div>
    </header>
  );
};
