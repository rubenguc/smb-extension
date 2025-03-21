import { FC } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@src/components/ui/button";

interface BlockActiveProps {
  onFinishBlock: () => void;
}

export const BlockActive: FC<BlockActiveProps> = ({ onFinishBlock }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-center p-6 bg-custom-white rounded-full">
        <ShieldCheck size={60} />
      </div>
      <p>Focus activated</p>
      <Button
        className="bg-custom-orange hover:bg-custom-orange/80 text-gray-200"
        onClick={onFinishBlock}
      >
        End focus
      </Button>
    </div>
  );
};
