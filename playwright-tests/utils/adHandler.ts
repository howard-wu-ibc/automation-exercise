import { Page } from "@playwright/test";

export async function closeAdIfPresent(page: Page) {
  try {
    const frames = page.frames();

    for (const frame of frames) {
      const closeBtn = frame.getByRole("button", { name: /close/i });

      if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await closeBtn.click();
        console.log("Ad closed");
        return;
      }
    }
  } catch (e) {
    console.log("No ad popup found");
  }
}
