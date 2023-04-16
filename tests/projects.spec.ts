import { test, expect } from "@playwright/test";

test.describe("As a Partner or TPM, I can access information about a projects, including links to relevant resources", () => {
  test.beforeEach(async ({ page }) => {
    // Sign in as admin, and navigate to project page
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "Log in" }).click();
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("newuser@email.com");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("link", { name: "Projects" }).click();
  });

  test("As an User, I can view the Partner Table", async ({ page }) => {
    // Admin can see the Project table with all the columns
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Device Type" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Jira Project" })
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Partner" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Principal TPM" })
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Action" })).toBeVisible();
  });

  test("As a User, I can create a new project", async ({ page }) => {
    const streamSpotId = "clfzw1w1s0004t625dffywbkb";
    const newUserId = "clgjf0hry0000t6bgqgru3xyb";

    // Fill out partner form
    await page.getByRole("button", { name: "Create Project" }).click();
    await page.locator('input[name="deviceType"]').fill("Mock TV");
    await page.locator('input[name="jiraProject"]').fill("MOCK-1111");
    await page.locator('select[name="partnerId"]').selectOption(streamSpotId);
    await page.locator('select[name="tpmId"]').selectOption(newUserId);
    await page.getByRole("button", { name: "Submit" }).click();

    // Expect the data to be visible in the table
    await expect(page.getByRole("cell", { name: "Mock TV" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "MOCK-1111" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "StreamSpot" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "newuser@email.com" })
    ).toBeVisible();
  });

  test("As a User, I can edit a project", async ({ page }) => {
    //Click the edit button for the partner we just created
    await page
      .getByRole("row", {
        name: "Mock TV MOCK-1111 StreamSpot newuser@email.com Edit Delete",
      })
      .getByRole("button", { name: "Edit" })
      .click();

    // Expect the modal to appear correctly
    await expect(
      page.getByRole("heading", { name: "Edit Project Details" })
    ).toBeVisible();

    // Fill in and submit form with new edited details
    await page.locator('input[name="deviceType"]').fill("Mock Set-Top");
    await page.locator('input[name="jiraProject"]').fill("MOCK-2222");

    await page.getByRole("button", { name: "Submit" }).click();

    // Expect the old data to not be visible in the table
    await expect(page.getByRole("cell", { name: "Mock TV" })).not.toBeVisible();

    // Expect the edited details to be visible in the table
    await expect(
      page.getByRole("cell", { name: "Mock Set-Top" })
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Mock-2222" })).toBeVisible();
  });

  test("As a User, I can delete a partner", async ({ page }) => {
    // Delete the project edited in the previous test
    await page
      .getByRole("row", {
        name: "Mock Set-Top MOCK-2222 StreamSpot newuser@email.com Edit Delete",
      })
      .getByRole("button", { name: "Delete" })
      .click();

    // Expect the confirmation modal to appear
    await expect(
      page.getByText("Are you sure you want to delete project")
    ).toBeVisible();

    // Accept deletion
    await page.getByRole("button", { name: "Accept" }).click();

    // Expect the project we deleted to not be visible
    await expect(
      page.getByRole("cell", { name: "Mock Set-Top" })
    ).not.toBeVisible();
  });
});
