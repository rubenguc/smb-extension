import { useEffect, useOptimistic, useState } from "react";
import { useToggle } from "react-use";
import {
  BlockActive,
  CustomSitesTabs,
  Header,
  SocialMediaTab,
} from "./components";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@src/components/ui/tabs";
import { backGroundService } from "@src/services";

export default function Popup() {
  const [isActive, toggleSwitch] = useToggle(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isBlockedActived, setIsBlockedActived] = useOptimistic(
    isActive,
    (_, newStatus: boolean) => newStatus,
  );

  useEffect(() => {
    (async () => {
      try {
        const result = await backGroundService.getActiveMode();
        console.log("activemode:", result);
        toggleSwitch(result);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, []);

  const onToggle = async () => {
    try {
      setIsBlockedActived(true);
      toggleSwitch();
      await backGroundService.toggleActiveMode();
    } catch (error) {
      setIsBlockedActived(false);
      console.error(error);
    }
  };

  return (
    <div className="h-full p-3 flex flex-col">
      {!isLoading && (
        <>
          <Header isBlockActived={isBlockedActived} toggleActive={onToggle} />
          <div className="flex flex-1">
            {isActive ? (
              <BlockActive onFinishBlock={toggleSwitch} />
            ) : (
              <Tabs defaultValue="socialMedia" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="socialMedia">Social media</TabsTrigger>
                  <TabsTrigger value="sites">Sites</TabsTrigger>
                </TabsList>
                <TabsContent value="socialMedia" className="p-2">
                  <SocialMediaTab />
                </TabsContent>
                <TabsContent value="sites" className="p-2">
                  <CustomSitesTabs />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </>
      )}
    </div>
  );
}
