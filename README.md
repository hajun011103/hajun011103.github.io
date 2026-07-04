# hajun011103.github.io

Personal site, deployed to GitHub Pages. Two build systems merged into one site:

| Path | Built by | Source |
| --- | --- | --- |
| `/` | **Astro** (`landing/`) | Custom landing page |
| `/research/`, `/projects/` | **Astro** (`landing/`) | Curated overview pages |
| `/study/`, `/research/<note>`, `/projects/<note>` | **Quartz** (`notes/`) | Markdown notes, pulled from the private `hajun-vault` repo at build time |

## Layout

- `landing/` — Astro project (the landing page + section overview pages)
- `notes/` — Quartz 4 project (engine + config). `notes/content/` is filled from the vault by CI; it is not committed here.
- `.github/workflows/` — builds both, merges them (Astro overlays Quartz), and deploys to GitHub Pages.

## How it deploys

On push to `main`, GitHub Actions: pulls the private vault → copies published notes into `notes/content/` → builds Quartz → builds Astro → overlays Astro over Quartz → deploys the merged site.

Local editing of notes happens in Obsidian against the `hajun-vault` repo, not here.
