import type { PromptContextBlock, Register } from 'claude-code';

const withoutEmail = (blocks: readonly PromptContextBlock[]) =>
  blocks.filter(block => block.name !== 'userEmail');

// Claude Code adds a `userEmail` block (from `oauthAccount.emailAddress` in
// ~/.claude.json) whenever you're signed in with claude.ai, and no setting
// turns it off. Filter it out of whatever the rest of the chain returns.
export const register: Register = on => {
  on('prompt.context', async ($, e, next) => {
    const context = await next(e);
    return { ...context, blocks: withoutEmail(context.blocks) };
  }).catch(async ($, e, next) => {
    // Without this handler a hook that throws or times out is skipped, and
    // the email is sent after all. Fall back to the blocks we were given.
    const context = await next(e).catch(() => undefined);
    return { ...context, blocks: withoutEmail(context?.blocks ?? e.blocks) };
  });
};
