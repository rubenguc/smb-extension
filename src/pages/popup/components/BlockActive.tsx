import { FC } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@src/components/ui/button";

interface BlockActiveProps {
  onFinishBlock: () => void;
}

export const BlockActive: FC<BlockActiveProps> = ({ onFinishBlock }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-center p-4 bg-gray-500 rounded-full">
        <ShieldCheck size={50} />
      </div>
      <p>Focus activated</p>
      <Button className="hover:bg-gray-900" onClick={onFinishBlock}>
        End focus
      </Button>
    </div>
  );
};
