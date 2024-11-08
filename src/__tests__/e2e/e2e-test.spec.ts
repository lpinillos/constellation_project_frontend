import { test, expect } from '@playwright/test';

test('La página principal debe cargarse correctamente', async ({ page }) => {
    await page.goto('https://constellation-project-frontend.vercel.app/');
    await expect(page.locator('h3', { hasText: 'Constellation' })).toContainText('Constellation');
});

test('Debe iniciar sesión con credenciales válidas', async ({ page }) => {
    await page.goto('https://constellation-project-frontend.vercel.app/signin');
    await page.fill('input[name="email"]', 'diegomueses@gmail.com');
    await page.fill('input[name="password"]', 'diego1234');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('https://constellation-project-frontend.vercel.app/dashboard');
});

test('Mostrar error cuando las credenciales son incorrectas', async ({ page }) => {
    await page.goto('https://constellation-project-frontend.vercel.app/signin');
    await page.fill('input[name="email"]', 'diegomueses@gmail.com');
    await page.fill('input[name="password"]', 'incorrecta');
    await page.click('button[type="submit"]');
    await page.waitForSelector('[role="alert"]');
    await expect(page.locator('[role="alert"]', { hasText: 'Email or password is incorrect' })).toBeVisible();
});

test('Debe de iniciar sesión e ir a la página de cursos', async ({ page }) => {
    await page.goto('https://constellation-project-frontend.vercel.app/signin');
    await page.fill('input[name="email"]', 'diegomueses@gmail.com');
    await page.fill('input[name="password"]', 'diego1234');
    await page.click('button[type="submit"]');
    await page.waitForSelector('a[href="/courses"]');
    await page.click('a[href="/courses"]');
    await expect(page).toHaveURL('https://constellation-project-frontend.vercel.app/courses');
});

test('La URL de courses debe de estar protegida', async ({ page }) => {
    await page.goto('https://constellation-project-frontend.vercel.app/courses');
    await expect(page).toHaveURL('https://constellation-project-frontend.vercel.app/signin');
});

test('Cerrar sesión correctamente', async ({ page }) => {
    await page.goto('https://constellation-project-frontend.vercel.app/signin');
    await page.fill('input[name="email"]', 'diegomueses@gmail.com');
    await page.fill('input[name="password"]', 'diego1234');
    await page.click('button[type="submit"]');

    await page.click('[data-sidebar="menu-button"]');

    await page.click('div[role="menuitem"]:has-text("Sign out")');
    
    await expect(page).toHaveURL('https://constellation-project-frontend.vercel.app/signin');
});

test('La URL del actualizar perfil debe estar protegida', async ({ page }) => {
    await page.goto('https://constellation-project-frontend.vercel.app/updateProfile');
    await expect(page).toHaveURL('https://constellation-project-frontend.vercel.app/signin');
});
