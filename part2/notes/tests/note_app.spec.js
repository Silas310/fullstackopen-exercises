import { test, expect } from '@playwright/test'


test('front page can be opened', async ({ page }) => {
  // go to front page, locate content and check if it is visible
  await page.goto('http://localhost:5173')

  const locator = page.getByText('Notes')
  await expect(locator).toBeVisible()
  await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
})