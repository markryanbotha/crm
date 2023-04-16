import { test, expect, type Page } from "@playwright/test";

test.describe("As a Partner or user I can log and track interactions with partners, including notes from meetings, emails, and other types of communication", () => {
  const signInAndGoToCommunications = async (
    page: Page,
    role: "admin" | "user"
  ) => {
    // Sign in as admin, and navigate to communication page
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "Log in" }).click();
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("textbox").click();
    if (role === "admin") {
      await page.getByRole("textbox").fill("admin@email.com");
    } else {
      await page.getByRole("textbox").fill("user@email.com");
    }
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("link", { name: "Communications" }).click();
  };

  test("As an User, I can view messages and communications that have been logged", async ({
    page,
  }) => {
    await signInAndGoToCommunications(page, "admin");

    // Admin can see the communication board with relevant tabs with all the columns
    await expect(
      page.getByText(
        "All MessagesView all the communication between Partners and Project Managers"
      )
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "All" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sent" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Received" })).toBeVisible();
  });

  test("As an User, I can log messages I have sent to other users", async ({
    page,
  }) => {
    const recipientUserId = "clfzy4eoo0004t6s6m3lcysk2";
    await signInAndGoToCommunications(page, "admin");

    // Fill out form to send message
    await page.getByRole("button", { name: "Send Message" }).click();
    await page
      .locator('select[name="recipientId"]')
      .selectOption(recipientUserId);
    await page.locator('input[name="header"]').fill("Test Message");
    await page.locator('textarea[name="content"]').fill("E2E test message");
    await page.getByRole("button", { name: "Submit" }).click();

    // Expect the card to be present in the All messages tab
    await page
      .getByRole("listitem")
      .filter({
        hasText: "Test MessageE2E test message",
      })
      .click();
  });

  test("As a User, I can view all the messages that I have sent", async ({
    page,
  }) => {
    await signInAndGoToCommunications(page, "admin");

    // Navigate to sent page
    await page.getByRole("button", { name: "Sent" }).click();

    // Expect the message that was sent in the previous test to be visible
    await expect(
      page.getByRole("listitem").filter({
        hasText: "Test MessageE2E test message",
      })
    ).toBeVisible();
  });

  test("As a User, I can view all the messages that I have received", async ({
    page,
  }) => {
    // Signing in as a user, which is the the account that the message was sent to in the previous tests
    await signInAndGoToCommunications(page, "user");

    // Navigate to received page
    await page.getByRole("button", { name: "Received" }).click();

    // Expect the message that was sent in the previous test to be visible
    await expect(
      page.getByRole("listitem").filter({
        hasText: "Test MessageE2E test message",
      })
    ).toBeVisible();
  });
});
