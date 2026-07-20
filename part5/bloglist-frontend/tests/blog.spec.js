import { test, expect } from '@playwright/test'

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
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown by default', async ({ page }) => {
    // open page -> login form should be visible
    // goto is in beforeEach -> get inputs by ? -> expect to be visible
    await expect(page.getByRole('textbox', {name: 'username'})).toBeVisible()
    await expect(page.getByRole('textbox', {name: 'password'})).toBeVisible()
    await expect(page.getByRole('button', {name: 'login'})).toBeVisible()
  })

  test.describe('Login', () => {
    test('user can log in', async ({ page }) => {
      // open page -> login form visible -> fill in -> click login
      // expect to see logged in user
      const usernameInput = page.getByRole('textbox', {name: 'username'})
      const passwordInput = page.getByRole('textbox', {name: 'password'})
      const loginButton = page.getByRole('button', {name: 'login'})

      await usernameInput.fill('silascosta')
      await passwordInput.fill('vascodagama')
      await loginButton.click()

      await expect(page.getByText('Silas Costa logged in')).toBeVisible()
    })

    test('user cannot log in with wrong credentials', async ({ page }) => {
      // open page -> login form visible -> fill in wrong credentials ->
      // click login -> expect to see error message
      const usernameInput = page.getByRole('textbox', {name: 'username'})
      const passwordInput = page.getByRole('textbox', {name: 'password'})
      const loginButton = page.getByRole('button', {name: 'login'})

      await usernameInput.fill('silascosta')
      await passwordInput.fill('wrongpassword')
      await loginButton.click()

      await expect(page.getByText('Error logging in: invalid username or password')).toBeVisible()
    })
  })
})