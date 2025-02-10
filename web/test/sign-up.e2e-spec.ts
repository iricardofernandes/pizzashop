import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page
    .getByRole('textbox', { name: 'Nome do estabelecimento' })
    .fill('Pizza Shop')

  await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')

  await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .fill('test@example.com')

  await page.getByRole('textbox', { name: 'Seu celular' }).fill('9999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Conta criada com sucesso!')

  await expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page
    .getByRole('textbox', { name: 'Nome do estabelecimento' })
    .fill('Invalid name')

  await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')

  await page
    .getByRole('textbox', { name: 'Seu e-mail' })
    .fill('test@example.com')

  await page.getByRole('textbox', { name: 'Seu celular' }).fill('9999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  await expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
