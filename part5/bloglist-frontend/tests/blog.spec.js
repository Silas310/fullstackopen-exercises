import { test, expect } from '@playwright/test'
import { loginWith, createBlog } from './helper.js'


test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    // empty db and create user - done
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/testing/users',{
      data: {
        username: 'silascosta',
        name: 'Silas Costa',
        password: 'vascodagama',
      }
    })
    await request.post('http://localhost:3001/api/testing/users',{
        data: {
          username: 'anotheruser',
          name: 'Another User',
          password: 'anotherpassword',
        }
      })
    await page.goto('http://localhost:5173')
  })

  test('login fails with wrong credentials', async ({ page }) => {
      await loginWith(page, "silascosta", "wrongpassword");

      await expect(page
        .getByText('Error logging in: invalid username or password'))
        .toBeVisible();
    });

  test.describe("when logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "silascosta", "vascodagama");
    });

    test('user can login', async ({ page }) => {
      const userInfo = await page
      .getByRole('button', { name: 'logout' })

      await expect(userInfo).toBeVisible();
    });

    test.describe("and a blog exists", () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(page, "Test ", "Silas", "www.testblog.com");
      });

      test("create new blog", async ({ page }) => {
        await page.getByRole("link", { name: "Test  by: 'Silas'" }).click();
      });

      test("like a blog", async ({ page }) => {
        await page.getByRole("link", { name: "Test  by: 'Silas'" }).click();
        await page.getByRole("button", { name: "like" }).click();

        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("delete a blog", async ({ page }) => {
        await page.getByRole("link", { name: "Test  by: 'Silas'" }).click();
        await page.getByRole("button", { name: "Remove" }).click();

        await expect(page.getByText("Test  by: 'Silas'")).not.toBeVisible();
      });
    });
  });
})