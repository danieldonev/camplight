import { test, expect } from '@playwright/test';

test.describe('Country Starring and Note Persistence', () => {
  test('should persist starred country and note after page reload', async ({ page }) => {
    const noteText = 'Test note for starred country';
    const countryId = 'country-072';

    // Navigate to the countries page
    await page.goto('/countries');

    // Wait for the first country to be visible
    const firstCountry = await page.getByTestId(countryId);

    //  Verify the country is not starred
    await expect(firstCountry.getByTestId('star-border-icon')).toBeVisible();

    // Click the first country's star button
    await firstCountry.getByTestId('toggle-favorite-button').click();

    // Wait for the modal to appear and be ready
    const modal = await page.getByTestId('note-input-dialog');

    // Add a note in the modal
    await modal.getByTestId('note-text-field').fill(noteText, { force: true });

    // // Click the confirm button
    await modal.getByTestId('save-button').click();

    // Verify the note is visible
    await expect(firstCountry.getByTestId('favorite-note')).toHaveText(`Note: ${noteText}`);

    // Reload the page
    await page.reload();

    // Wait for the first country to be visible
    const firstCountryAfterReload = await page.getByTestId(countryId);

    //  Verify the country is starred
    await expect(firstCountryAfterReload.getByTestId('star-icon')).toBeVisible();

    // Verify the note is present
    await expect(firstCountryAfterReload.getByTestId('favorite-note')).toHaveText(
      `Note: ${noteText}`
    );
  });
});
