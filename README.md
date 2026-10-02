# cha9rittt

Claude Code setup: plugins and skills that load automatically in every Claude Code session opened on this repo.

## Plugins (`.claude/settings.json`)

| Plugin | Marketplace |
| --- | --- |
| sales, marketing, finance, data, design, product-management | `anthropics/knowledge-work-plugins` |
| searchfit-seo, postiz, desktop-commander, pdf-viewer | `anthropics/knowledge-work-plugins` |
| figma, canva, adobe-for-creativity | `anthropics/claude-plugins-official` |
| humanizer | `blader/humanizer` |
| ui-ux-pro-max | `nextlevelbuilder/ui-ux-pro-max-skill` |

Canva, Figma, Adobe and Postiz connect to their services through MCP, so each one asks you to sign in the first time you use it.

## Skills (`.claude/skills/`)

| Skill | Source |
| --- | --- |
| landing-page-guide-v2 | `bear2u/my-skills` |
| landing-page-generator | `borghei/Claude-Skills` (`marketing/`) |
| brand-guidelines | `anthropics/skills` |
| canvas-design | `anthropics/skills` |

## Not included

`fiverr-gig-optimizer`, `upwork-apply` and `case-study-skill` have no public source. To add them, export each one from claude.ai (Settings → Capabilities → Skills) and drop its folder into `.claude/skills/<name>/`.
