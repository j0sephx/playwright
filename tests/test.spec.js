// @ts-check
import { test, expect } from '@playwright/test';

test('should navigate to my tasks page', async ({ page }) => {
  await page.goto('https://microsoftedge.github.io/Demos/demo-to-do/');

  // Assert on tasks page
  await expect(page.locator('h1')).toHaveText(/My tasks/);
});

test('should be able to add three tasks to the list and complete', async ({ page }) => {
  test.slow();
  await page.goto('https://microsoftedge.github.io/Demos/demo-to-do/');

  // Add first item & assert it is added
  await page.locator('#new-task').fill('Task 1');
  await page.locator('#new-task').press('Enter');
  await expect(page.locator('#tasks')).toContainText('Task 1');

  // Add second item & assert it is added
  await page.locator('#new-task').fill('Task 2');
  await page.locator('#new-task').press('Enter');
  await expect(page.locator('#tasks')).toContainText('Task 2');
  
  // Add third item & assert it is added
  await page.locator('#new-task').fill('Task 3');
  await page.locator('#new-task').press('Enter');
  await expect(page.locator('#tasks')).toContainText('Task 3');

  // click on the second task and assert it is completed
  await page.locator('#tasks').locator('li', { hasText: 'Task 2' }).click();
  await expect(page.locator('li.task.completed', { hasText: 'Task 2' })).toBeVisible();

  // click on the third and first task and assert they are completed
  await page.locator('#tasks').locator('li', { hasText: 'Task 3' }).click();
  await expect(page.locator('li.task.completed', { hasText: 'Task 3' })).toBeVisible();

  await page.locator('#tasks').locator('li', { hasText: 'Task 1' }).click();
  await expect(page.locator('li.task.completed', { hasText: 'Task 1' })).toBeVisible();
  
});

// could make it a function to avoid code duplication something like this:
// async function addTask(page, taskName: string) {
//   await page.locator('#new-task').fill(taskName);
//   await page.locator('#new-task').press('Enter');
//   await expect(page.locator('#tasks')).toContainText(taskName);
// }