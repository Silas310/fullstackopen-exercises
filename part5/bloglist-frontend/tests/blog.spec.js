import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown by default', async ({ page }) => {
    // open page -> login form should be visible
    // goto is in beforeEach -> get inputs by ? -> expect to be visible
    await expect(page.getByRole('textbox', {name: 'username'})).toBeVisible()
    await expect(page.getByRole('textbox', {name: 'password'})).toBeVisible()
    await expect(page.getByRole('button', {name: 'login'})).toBeVisible()
  })
})