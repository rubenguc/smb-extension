import Browser from "webextension-polyfill";
import BackgroundHandle from "./handler";

const handler = new BackgroundHandle();

Browser.runtime.onMessage.addListener(async (request) => {
  try {
    const result = await handler.handler(request.message, request.params);

    return {
      message: "ok",
      data: result,
      error: false,
    };
  } catch (error: any) {
    const message = error?.toString()?.includes("Error:")
      ? error.toString().split("Error: ")[1]
      : "unknown_error";

    return {
      message,
      data: null,
      error: true,
    };
  }
});
