import { test, expect } from "@playwright/test";
import { randomUUID } from "crypto";

test("Can sign up as and Admin, and is redirected to the project page", async ({
  page,
}) => {
  // This is necessary to create unique emails within the tests, until a delete user functionality is added to the application.
  const randomUserId = randomUUID();
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Get started" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill(`newuser+${randomUserId}@email.com`);
  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
});

test("Can sign into existing account, and redirected to projects page", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Get started" }).click();
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("newuser@email.com");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
});

test("Displays correct error message when user tries to sign up with an already existing email address", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Get started" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("newuser@email.com");
  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(
    page.getByText(
      "That email address is already signed up, please sign in instead"
    )
  ).toBeVisible();
});

test("Displays correct error message when a user tries to sign in with an account that does not exists", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Get started" }).click();
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("doesnotexist@email.com");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(
    page.getByText(
      "The email could not be found, please try and sign up instead"
    )
  ).toBeVisible();
});
