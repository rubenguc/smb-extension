import { createRoot } from "react-dom/client";
import { backGroundService } from "@src/services";

async function init() {
  try {
    const domain = window.location.hostname;
    const isDomainBlocked = await backGroundService.isDomainBlocked(domain);

    if (isDomainBlocked) {
      document.body.innerHTML = "";
      const scripts = document.querySelectorAll("script");
      scripts.forEach((script) => script.remove());

      const div = document.createElement("div");
      div.id = "__root";
      document.body.appendChild(div);

      // const link = document.createElement("link");
      // link.rel = "stylesheet";
      // link.href = "./style.css";
      // document.head.appendChild(link);

      const rootContainer = document.querySelector("#__root");
      if (!rootContainer) throw new Error("Can't find Content root element");
      const root = createRoot(rootContainer);
      root.render(
        <div className="h-dvh w-dvh flex items-center justify-center">
          <p>blocked papu</p>
        </div>,
      );
    }
  } catch (e) {
    console.error(e);
  }
}

init();
