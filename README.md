Claude Code fn hook/mod to block your email from the system prompt https://www.reddit.com/r/ClaudeAI/comments/1wyiw3k/you_put_my_what/

Else Opus loves to put it in request headers.

## Install

```
/plugin install no-email --marketplace AlexErrant/claude-code-no-email
```

Run it at a terminal session's prompt, answer `y` to add the marketplace, and keep the user scope (the default) so it applies in every project; a project or local scope covers only that project. From a shell: `claude plugin install no-email --marketplace AlexErrant/claude-code-no-email`. In the desktop app: + next to the prompt box, Plugins, Add marketplace `AlexErrant/claude-code-no-email`, then Add plugin.

The block is computed once per conversation, so the mod takes effect from the next conversation (or after `/clear` or a compaction); an email already sent in the current one stays there.

Note: on Team/Enterprise logins or machines with managed settings, an organization's policy may skip this mod's hooks. Run `claude --debug` and look for a `no-email: prompt.context bypassed by ...` line to check. (See [#1](https://github.com/AlexErrant/claude-code-no-email/issues/1).)
