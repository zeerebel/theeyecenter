#!/usr/bin/env bash
# Auto-install UI/UX Pro Max skills on session start in this project.
# Idempotent — only clones if the skill isn't already present.
set -e
TARGET="$HOME/.claude/skills"
SENTINEL="$TARGET/ui-ux-pro-max/SKILL.md"
if [ -f "$SENTINEL" ]; then exit 0; fi
mkdir -p "$TARGET"
TMP="$(mktemp -d)"
if git clone --depth 1 -q https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git "$TMP/uupm" 2>/dev/null; then
  cp -R "$TMP/uupm/.claude/skills/." "$TARGET/"
  echo "[install-skills] UI/UX Pro Max skills installed to $TARGET" >&2
fi
rm -rf "$TMP"
