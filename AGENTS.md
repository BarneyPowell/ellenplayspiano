# Ellen Plays Piano - Agent Instructions

## Project Overview

This is an Astro static site for a piano tuition business based in London. The site showcases Ellen's teaching practice, philosophy, lesson offerings, and contact form.

- Tech stack: Astro 6.4.6, TypeScript, pnpm
- Runtime: Node.js >= 22.12.0
- Output: static HTML in `dist/`
- Production URL: https://ellenplayspiano.com
- Hosting/deployments: Cloudflare Pages with a Cloudflare Pages Function for `functions/contact.ts`

## Repository Workflow

- Do not push directly to `main`. Main is branch-protected and changes should go through pull requests.
- Work on a branch and open/update a PR against `main`.
- Cloudflare automatically deploys PRs to a temporary preview site. A PR comment contains the latest deployed preview URL.
- Merging a PR triggers the main production deployment to https://ellenplayspiano.com.
- After pushing changes, use the Cloudflare preview URL for visual checks when available.

## Local Environment

The reliable local environment for this repo is WSL Ubuntu.

- User working checkout: `/home/barney/projects/ellenplayspiano`
- Codex isolated PR clone used during this work: `/home/barney/projects/codex/ellenplayspiano-pr16`
- Windows PowerShell may not have `git` on PATH. Use WSL for git/build tasks.
- If WSL appears unavailable, re-check without shell sandbox restrictions before assuming no distro exists.
- `pnpm` may not be directly on PATH. Use `corepack pnpm ...`.

## Build & Development

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm run build
corepack pnpm run dev
corepack pnpm run preview
```

Use pnpm for dependency work. The repo has migrated away from `package-lock.json` to `pnpm-lock.yaml`.

## Architecture & Conventions

- `src/pages/index.astro` - single-page entry point; orchestrates all major sections
- `src/components/*.astro` - reusable Astro components
- `src/data/site.ts` - central content and site metadata
- `src/layouts/Layout.astro` - root HTML template with fonts, metadata, and client-side scripts
- `src/styles/global.css` - design tokens, base styles, shared animation classes
- `functions/contact.ts` - Cloudflare Pages Function for contact form submissions
- `public/` - static assets referenced from the site root

## Content And Styling Patterns

- Prefer updating copy and lesson data in `src/data/site.ts`.
- Keep component styles scoped in each `.astro` file unless the style is a shared token or global utility.
- Use CSS variables from `src/styles/global.css` for colors and typography.
- Keep the site simple and static. Avoid new frameworks, component libraries, or dynamic routes unless explicitly requested.
- Images in the photo break use responsive `<picture>` sources. Keep mobile portrait crops anchored to the bottom because the focus is at the bottom of the image.

## Verification

- Run `corepack pnpm run build` before finishing code changes.
- For UI changes, check the Cloudflare PR preview URL once its comment is available.
- For PageSpeed-related work, verify against the deployed preview or production URL, not only local output.
- `npm audit fix --force` can introduce breaking changes; do not run it casually.

## Notes From Prior Work

- The old root `index.html` is stale and should not be used as the source of truth. Astro source files under `src/` drive the deployed page.
- The Google Fonts stylesheet is intentionally loaded with `preload` plus an `onload` stylesheet switch to reduce render blocking.
- `public/robots.txt` must exist; otherwise `/robots.txt` can return the app HTML and fail Lighthouse SEO checks.
- The contact form posts to `/contact`, handled by the Cloudflare Function in `functions/contact.ts`.
