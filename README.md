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
| fiverr-gig-optimizer | `Ahad690/fiverr-gig-optimizer` |

Canva, Figma, Adobe and Postiz connect to their services through MCP, so each one asks you to sign in the first time you use it.

## Skills (`.claude/skills/`)

| Skill | Source |
| --- | --- |
| landing-page-guide-v2 | `bear2u/my-skills` |
| landing-page-generator | `borghei/Claude-Skills` (`marketing/`) |
| brand-guidelines | `anthropics/skills` |
| canvas-design | `anthropics/skills` |
| upwork-apply | `aiagentwithdhruv/Automation` (`claude-skills/.claude/skills/`) |
| case-study-skill | Written for this repo (no public source found) |

## Setup notes

- **upwork-apply** needs `APIFY_API_TOKEN` and `ANTHROPIC_API_KEY` in a `.env` file, plus Google credentials (`token.json` or `service_account.json`) to write the results to a Google Sheet. Install its Python packages with `pip install requests python-dotenv anthropic gspread pandas google-api-python-client google-auth-oauthlib`. These secret files are listed in `.gitignore`.
- **fiverr-gig-optimizer** runs Python scripts; see its repo for `requirements.txt`.
