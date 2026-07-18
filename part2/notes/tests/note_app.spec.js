import { test, expect } from '@playwright/test'

test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const locator = page.getByText('Notes')
  await expect(locator).toBeVisible()
  await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
})

test.describe('Note app', () => {
  test('user can log in', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('button', { name: 'log in' }).click()
    
    await page.getByLabel('username').fill('admin')
    await page.getByLabel('password').fill('12345')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Silas logged in')).toBeVisible()
  })
})