#!/usr/bin/env bash
# ============================================================
# deploy.sh — Sync N+H wedding site to S3 + CloudFront invalidation
# Usage: CF_DIST_ID=EXXXXXXXXX ./infra/deploy.sh
# ============================================================
set -euo pipefail

BUCKET="nh-wedding-2026"
REGION="eu-central-1"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [[ -z "${CF_DIST_ID:-}" ]]; then
  echo "ERROR: Set CF_DIST_ID environment variable to your CloudFront distribution ID"
  exit 1
fi

echo "→ Syncing to s3://$BUCKET ..."
aws s3 sync "$ROOT_DIR" "s3://$BUCKET" \
  --region "$REGION" \
  --exclude ".git/*" \
  --exclude "infra/*" \
  --exclude ".DS_Store" \
  --exclude "*.sh" \
  --cache-control "max-age=86400, public" \
  --delete

# HTML files should not be cached aggressively (allow CDN to serve updated content)
aws s3 cp "$ROOT_DIR/index.html" "s3://$BUCKET/index.html" \
  --region "$REGION" \
  --cache-control "max-age=300, public" \
  --content-type "text/html; charset=utf-8"

echo "→ Invalidating CloudFront distribution $CF_DIST_ID ..."
aws cloudfront create-invalidation \
  --distribution-id "$CF_DIST_ID" \
  --paths "/*"

echo "✓ Deploy complete."
