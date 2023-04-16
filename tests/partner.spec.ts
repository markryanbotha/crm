import { test, expect } from "@playwright/test";

test.describe("As a TPM, I can add and store partner contact information, including names, contact details, and roles ", () => {
  test.beforeEach(async ({ page }) => {
    // Sign in as admin, and navigate to project page
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "Log in" }).click();
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("newuser@email.com");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("link", { name: "Partners" }).click();
  });

  test("As an Admin User, I can view the Partner Table", async ({ page }) => {
    // Admin can see the Partner table, including the Name and Phone columns
    await expect(page.getByRole("heading", { name: "Partners" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Name" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Phone" })).toBeVisible();
  });

  test("As an Admin User, I can create a new partner", async ({ page }) => {
    // Fill out partner form
    await page.getByRole("button", { name: "Add partner" }).click();
    await page.locator('input[name="name"]').fill("MockPartner");
    await page.locator('input[name="email"]').fill("mock@partner.com");
    await page.locator('input[name="phone"]').fill("+444444444444");
    await page.locator('input[name="territory"]').fill("TST");
    await page
      .locator('input[name="summary"]')
      .fill("Mock Partner for E2E tests");
    await page.getByRole("button", { name: "Submit" }).click();

    // Expect the data to be visible in the table
    await expect(page.getByRole("cell", { name: "MockPartner" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "mock@partner.com" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "+444444444444" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "mock@partner.com" })
    ).toBeVisible();
  });

  test("As an Admin User, I can edit a partner", async ({ page }) => {
    //Click the edit button for the partner we just created
    await page
      .getByRole("row", {
        name: "MockPartner mock@partner.com +444444444444 TST Mock Partner for E2E tests Edit Delete",
      })
      .getByRole("button", { name: "Edit" })
      .click();

    // Expect the modal to appear correctly
    await expect(
      page.getByRole("heading", { name: "Edit Details" })
    ).toBeVisible();

    // Fill in and submit form with new edited details
    await page.locator('input[name="name"]').fill("MockEditedPartner");
    await page.locator('input[name="email"]').fill("edited-mock@partner.com");
    await page.locator('input[name="phone"]').fill("+55555555555");
    await page.locator('input[name="territory"]').fill("EST");
    await page.locator('input[name="summary"]').click();
    await page
      .locator('input[name="summary"]')
      .fill("Edited Summary for E2E tests");
    await page.getByRole("button", { name: "Submit" }).click();

    // Expect the old data to not be visible in the table
    await expect(
      page.getByRole("cell", { name: "MockEditedPartner" })
    ).not.toBeVisible();

    // Expect the edited details to be visible in the table
    await expect(
      page.getByRole("cell", { name: "MockEditedPartner" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "edited-mock@partner.com" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "+55555555555" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "EST", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Edited Summary for E2E tests" })
    ).toBeVisible();
  });

  test("As an Admin User, I can delete a partner", async ({ page }) => {
    // Delete the project edited in the previous test
    await page
      .getByRole("row", {
        name: "MockEditedPartner edited-mock@partner.com +55555555555 EST Edited Summary for E2E tests Edit Delete",
      })
      .getByRole("button", { name: "Delete" })
      .click();

    // Expect the confirmation modal to appear
    await expect(
      page.getByText("Are you sure you want to delete partner")
    ).toBeVisible();

    // Accept deletion
    await page.getByRole("button", { name: "Accept" }).click();

    // Expect the project we deleted to not be visible
    await expect(
      page.getByRole("cell", { name: "MockEditedPartner" })
    ).not.toBeVisible();
  });
});
