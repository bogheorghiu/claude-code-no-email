import { expect, test } from 'claude-code/testing';

const CLAUDE_MD = { name: 'claudeMd', text: 'Contents of CLAUDE.md' };
const USER_EMAIL = {
  name: 'userEmail',
  text: "The user's email address is someone@example.com.",
};
const CURRENT_DATE = { name: 'currentDate', text: "Today's date is 2026-10-05." };

test('drops userEmail and keeps the other blocks in order', async ($, on) => {
  const blocks = [CLAUDE_MD, USER_EMAIL, CURRENT_DATE];
  on('prompt.context', () => ({ blocks }));

  const context = await $.prompt.context({ blocks });

  expect(context.blocks).toEqual([CLAUDE_MD, CURRENT_DATE]);
});

test('leaves a context without userEmail unchanged', async ($, on) => {
  const blocks = [CLAUDE_MD, CURRENT_DATE];
  on('prompt.context', () => ({ blocks }));

  const context = await $.prompt.context({ blocks });

  expect(context.blocks).toEqual(blocks);
});

test('still drops userEmail when the hook fails', async ($, on) => {
  const blocks = [CLAUDE_MD, USER_EMAIL, CURRENT_DATE];
  // A result with no `blocks` makes the hook throw, so its `.catch` answers.
  on('prompt.context', () => ({}) as never);

  const context = await $.prompt.context({ blocks });

  expect(context.blocks).toEqual([CLAUDE_MD, CURRENT_DATE]);
});
