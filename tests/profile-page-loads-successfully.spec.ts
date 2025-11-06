// spec: tests/profile-ui-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('User Profile Page - Comprehensive Test Plan', () => {
  test('Profile Page Loads Successfully', async ({ page }) => {
    // 1. Navigate to `/profile`.
    await page.goto(process.env.BASE_URL || 'http://localhost:3000/profile');

    // 2. Wait for the page to load by asserting the main headings are visible.
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();

    // Verify the profile page displays the user's avatar, name, role, and location using semantic headings/text.
    const userName = page.getByRole('heading', { name: 'Musharof Chowdhury' });
    await expect(userName).toBeVisible();

    // Scope role and location checks to the profile header area to avoid matching identical text in modals/forms.
    const profileHeader = userName.locator('..');
    await expect(profileHeader.getByText('Team Manager')).toBeVisible();
    await expect(profileHeader.getByText('Arizona, United States')).toBeVisible();

    // Verify "Personal Information" and "Address" section headings are visible.
    await expect(page.getByRole('heading', { name: 'Personal Information' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Address' })).toBeVisible();

    // Verify Sidebar and Header are present using accessible roles.
    await expect(page.getByRole('link', { name: 'User Profile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle Sidebar' })).toBeVisible();
  });
});
