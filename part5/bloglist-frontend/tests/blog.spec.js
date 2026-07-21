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

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173')
      await loginWith(page, 'silascosta', 'vascodagama')
    })

    test('a new blog can be created', async ({ page }) => {
      // click button for creating new blog
      await page.getByRole('button', {name: 'create new blog'}).click()
      // fill inputs
      await page.getByPlaceholder('title').fill('Test Blog Title')
      await page.getByPlaceholder('author').fill('Test Blog Author')
      await page.getByPlaceholder('url').fill('http://testblog.com')
      // send form -> expect to see new blog in list
      await page.getByRole('button', {name: 'create'}).click()

      await expect(page.getByText('Test Blog Title Test Blog Author')).toBeVisible()
    })

    test('user can like a blog', async ({ page }) => {
      // create a new blog -> click view button
      // get like button and click it -> expect likes to increase
      await createBlog(page, 'Test Blog Title', 'Test Blog Author',
        'http://testblog.com')

      await page.getByRole('button', {name: 'view'}).click()

      const likeButton = page.getByRole('button', {name: 'like'})

      await likeButton.click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })

    test.only('user can delete a blog', async ({ page }) => {
      // create a new blog -> click view button
      // get delete button and click it 
      // expect blog to be removed from list
      await createBlog(page, 'Test Blog Title', 'Test Blog Author',
        'http://testblog.com')

      await page.getByRole('button', {name: 'view'}).click()
      
      
      page.on('dialog', dialog => dialog.accept())

      const deleteButton = page.getByRole('button', {name: 'Remove'})
      await deleteButton.click()

      await expect(page.
        getByText('Test Blog Title Test Blog Author'))
        .not.toBeVisible()
    })
  })
})