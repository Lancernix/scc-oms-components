#!/bin/bash

# Synchronization script for internal deployment to sfyun remote
# Transforms repository for SF Artifactory registry and pushes to sfyun master
# 
# This script:
# 1. Ensures we're on master branch
# 2. Validates clean working tree
# 3. Pulls latest from origin
# 4. Creates temporary branch for transformation
# 5. Replaces npm registry with internal SF Artifactory
# 6. Regenerates lock file for internal registry
# 7. Force pushes to sfyun master
# 8. Cleans up temporary changes and branches

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
OFFICIAL_REGISTRY="https://registry.npmjs.org/"
INTERNAL_REGISTRY="https://artifactory.sf-express.com/artifactory/api/npm/npm/"
TEMP_BRANCH="tmp-sfyun-sync"
MASTER_BRANCH="master"
SFYUN_REMOTE="sfyun"

# Cleanup function - runs on exit or error
cleanup() {
  local exit_code=$?
  
  if [ $exit_code -ne 0 ]; then
    echo -e "${RED}[ERROR] Script failed with exit code $exit_code${NC}"
    echo -e "${YELLOW}[CLEANUP] Attempting to restore environment...${NC}"
  fi
  
  # Switch back to master branch if we're on temp branch
  if [ "$(git rev-parse --abbrev-ref HEAD)" = "$TEMP_BRANCH" ]; then
    echo -e "${YELLOW}[CLEANUP] Switching back to $MASTER_BRANCH...${NC}"
    git checkout "$MASTER_BRANCH" 2>/dev/null || true
  fi
  
  # Delete temporary branch if it exists
  if git rev-parse --verify "$TEMP_BRANCH" >/dev/null 2>&1; then
    echo -e "${YELLOW}[CLEANUP] Deleting temporary branch $TEMP_BRANCH...${NC}"
    git branch -D "$TEMP_BRANCH" 2>/dev/null || true
  fi
  
  # Restore .npmrc to official registry
  if [ -f ".npmrc" ]; then
    echo -e "${YELLOW}[CLEANUP] Restoring .npmrc to official registry...${NC}"
    echo "registry=$OFFICIAL_REGISTRY" > .npmrc
  fi
  
  # Restore pnpm-lock.yaml if it was stashed
  if git stash list | grep -q "pnpm-lock.yaml"; then
    echo -e "${YELLOW}[CLEANUP] Restoring pnpm-lock.yaml...${NC}"
    git stash pop || true
  fi
  
  if [ $exit_code -ne 0 ]; then
    echo -e "${RED}[CLEANUP] Environment restored. Please review and retry.${NC}"
    exit $exit_code
  fi
}

# Set trap to run cleanup on exit or error
trap cleanup EXIT

# Step 1: Verify we're on master branch
echo -e "${YELLOW}[1/8] Verifying current branch is $MASTER_BRANCH...${NC}"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "$MASTER_BRANCH" ]; then
  echo -e "${RED}[ERROR] Not on $MASTER_BRANCH branch. Current branch: $CURRENT_BRANCH${NC}"
  exit 1
fi
echo -e "${GREEN}[OK] On $MASTER_BRANCH branch${NC}"

# Step 2: Check for clean working tree
echo -e "${YELLOW}[2/8] Checking for clean working tree...${NC}"
if ! git diff-index --quiet HEAD --; then
  echo -e "${RED}[ERROR] Working tree is not clean. Please commit or stash changes.${NC}"
  exit 1
fi
echo -e "${GREEN}[OK] Working tree is clean${NC}"

# Step 3: Pull latest from origin master
echo -e "${YELLOW}[3/8] Pulling latest from origin $MASTER_BRANCH...${NC}"
git pull origin "$MASTER_BRANCH"
echo -e "${GREEN}[OK] Pulled latest changes${NC}"

# Step 4: Create temporary branch for transformation
echo -e "${YELLOW}[4/8] Creating temporary branch $TEMP_BRANCH...${NC}"
git checkout -b "$TEMP_BRANCH"
echo -e "${GREEN}[OK] Created and switched to $TEMP_BRANCH${NC}"

# Step 5a: Replace .npmrc with internal registry
echo -e "${YELLOW}[5a/8] Replacing .npmrc with internal registry...${NC}"
if [ ! -f ".npmrc" ]; then
  echo -e "${RED}[ERROR] .npmrc file not found${NC}"
  exit 1
fi
echo "registry=$INTERNAL_REGISTRY" > .npmrc
echo -e "${GREEN}[OK] .npmrc updated to internal registry${NC}"

# Step 5b: Remove pnpm-lock.yaml
echo -e "${YELLOW}[5b/8] Removing pnpm-lock.yaml...${NC}"
if [ -f "pnpm-lock.yaml" ]; then
  rm pnpm-lock.yaml
  echo -e "${GREEN}[OK] Removed pnpm-lock.yaml${NC}"
else
  echo -e "${YELLOW}[WARN] pnpm-lock.yaml not found${NC}"
fi

# Step 5c: Regenerate lock file for internal registry
echo -e "${YELLOW}[5c/8] Regenerating lock file with internal registry...${NC}"
pnpm install --lockfile-only
echo -e "${GREEN}[OK] Lock file regenerated${NC}"

# Step 6: Create temporary commit
echo -e "${YELLOW}[6/8] Creating temporary commit...${NC}"
git add .npmrc pnpm-lock.yaml
git commit -m "chore: internal deployment sync [skip ci]"
echo -e "${GREEN}[OK] Temporary commit created${NC}"

# Step 7: Force push to sfyun master
echo -e "${YELLOW}[7/8] Force pushing to $SFYUN_REMOTE $MASTER_BRANCH...${NC}"
git push "$SFYUN_REMOTE" "$TEMP_BRANCH:$MASTER_BRANCH" --force
echo -e "${GREEN}[OK] Force pushed to $SFYUN_REMOTE $MASTER_BRANCH${NC}"

# Step 8: Cleanup (handled by trap, but we can add explicit success message)
echo -e "${YELLOW}[8/8] Cleaning up temporary branch and restoring environment...${NC}"
echo -e "${GREEN}[SUCCESS] Synchronization completed successfully!${NC}"
