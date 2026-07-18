import { test, expect } from "@playwright/test";
import { loginWith, createNote } from "./helper";

test.setTimeout(6000);

test.describe("Note app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Silas",
        username: "admin",
        password: "12345",
      },
    });

    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2025",
      ),
    ).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await loginWith(page, "admin", "12345");
    await expect(page.getByText("Silas logged in")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "admin", "wrong");

    const errorDiv = page.locator(".error");
    await expect(errorDiv).toContainText("wrong credentials");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(page.getByText("Silas logged in")).not.toBeVisible();
  });

  test.describe("when logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "admin", "12345");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright");
      await expect(
        page.getByText("a note created by playwright"),
      ).toBeVisible();
    });

    test.describe("and a note exists", () => {
      test.beforeEach(async ({ page }) => {
        await createNote(page, "another note by playwright");
        await expect(
          page.getByText("another note by playwright"),
        ).toBeVisible();
      });

      test("importance can be changed", async ({ page }) => {
        const note = page
          .getByRole("listitem")
          .filter({ hasText: "another note by playwright" });

        await note.getByRole("button", { name: "make not important" }).click();

        await expect(
          note.getByRole("button", { name: "make important" }),
        ).toBeVisible();
      });
    });
  });
});
