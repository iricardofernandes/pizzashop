import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByText('Perfil da loja').click()

  await page.getByRole('textbox', { name: 'Nome' }).fill('Pizza Mock')
  await page
    .getByRole('textbox', { name: 'Descrição' })
    .fill('Another Description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso.')

  expect(toast).toBeVisible()
})
