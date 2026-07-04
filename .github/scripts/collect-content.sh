#!/usr/bin/env bash
# Collect published notes + the images they reference from the Obsidian vault
# into Quartz's content directory. Only publish-scoped folders are copied, so
# unpublished notes (and their images) never reach the public site.
#
#   usage: collect-content.sh <vault_dir> <quartz_content_dir>
set -euo pipefail

VAULT="${1:?usage: collect-content.sh <vault_dir> <content_dir>}"
CONTENT="${2:?usage: collect-content.sh <vault_dir> <content_dir>}"

# Copy every .md in <src> into <dst>, plus only the images those notes embed
# (Obsidian ![[image]] syntax), located by filename anywhere under _Attachments.
collect_folder() {
  local src="$1" dst="$2"
  if [ ! -d "$src" ]; then
    echo "  skip (no source): $src"
    return 0
  fi
  mkdir -p "$dst" "$dst/attachments"
  find "$src" -maxdepth 1 -type f -name '*.md' -exec cp {} "$dst"/ \;
  grep -rhoE '!\[\[[^]|#]+' "$dst" 2>/dev/null \
    | sed -E 's/^!\[\[//' \
    | sort -u \
    | while IFS= read -r name; do
        case "${name,,}" in
          *.png|*.jpg|*.jpeg|*.webp|*.gif|*.svg)
            found=$(find "$VAULT/_Attachments" -type f -name "$name" 2>/dev/null | head -1)
            if [ -n "$found" ]; then cp "$found" "$dst/attachments/"; fi
            ;;
        esac
      done
  echo "  $dst -> $(find "$dst" -maxdepth 1 -name '*.md' | wc -l) notes, $(ls "$dst/attachments" 2>/dev/null | wc -l) images"
}

echo "collecting published content from vault: $VAULT"
collect_folder "$VAULT/03_Study/Completed" "$CONTENT/study"
# Add research / projects once you decide which vault folders publish, e.g.:
# collect_folder "$VAULT/03_Research/Published" "$CONTENT/research"
# collect_folder "$VAULT/02_Projects/Published"  "$CONTENT/projects"
echo "done."
