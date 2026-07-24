const loginWith = async (page, username, password) => {
  const loginLink = page.getByRole('link', { name: 'login' })
  await loginLink.click()

  const usernameInput = page.getByRole('textbox', { name: 'username' })
  const passwordInput = page.getByRole('textbox', { name: 'password' })
  const loginButton = page.getByRole('button', { name: 'login' })

  await usernameInput.fill(username)
  await passwordInput.fill(password)
  await loginButton.click()
}

const createBlog = async (page, title, author, url) => {
  const newBlogLink = page.getByRole('link', { name: 'new blog' })
  await newBlogLink.click()

  const createNewBlogButton = page
  .getByRole('button', { name: 'create new blog' })
  await createNewBlogButton.click()

  const titleInput = page.getByPlaceholder('Title')
  const authorInput = page.getByPlaceholder('Author')
  const urlInput = page.getByPlaceholder('URL')
  const createButton = page.getByRole('button', { name: 'create' })

  await titleInput.fill(title)
  await authorInput.fill(author)
  await urlInput.fill(url)
  await createButton.click()
}

export { loginWith, createBlog }