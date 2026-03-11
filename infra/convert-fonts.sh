#!/usr/bin/env bash
# ============================================================
# convert-fonts.sh
# Converts Mont OTF files to WOFF2/WOFF using fonttools (pyftsubset)
# Requires: pip install fonttools brotli
#
# Usage: FONT_DIR=/path/to/mont/otf/files ./infra/convert-fonts.sh
# ============================================================
set -euo pipefail

FONT_DIR="${FONT_DIR:-$HOME/Downloads/Mont}"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/fonts"

mkdir -p "$OUT_DIR"

declare -A FONTS=(
  ["Mont-Regular"]="Mont-Regular.otf"
  ["Mont-SemiBold"]="Mont-SemiBold.otf"
  ["Mont-Bold"]="Mont-Bold.otf"
  ["Mont-Heavy"]="Mont-Heavy.otf"
)

for NAME in "${!FONTS[@]}"; do
  OTF="$FONT_DIR/${FONTS[$NAME]}"
  if [[ ! -f "$OTF" ]]; then
    echo "⚠ Skipping $NAME — not found at $OTF"
    continue
  fi

  echo "→ Converting $NAME ..."

  # WOFF2
  python3 - <<PYEOF
from fontTools.ttLib import TTFont
import fontTools.ttLib.woff2 as w2
font = TTFont("$OTF")
font.flavor = "woff2"
font.save("$OUT_DIR/$NAME.woff2")
print("  ✓ $NAME.woff2")
PYEOF

  # WOFF
  python3 - <<PYEOF
from fontTools.ttLib import TTFont
font = TTFont("$OTF")
font.flavor = "woff"
font.save("$OUT_DIR/$NAME.woff")
print("  ✓ $NAME.woff")
PYEOF
done

echo "✓ Font conversion complete. Files in: $OUT_DIR"
