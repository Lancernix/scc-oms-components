#!/usr/bin/env node

/**
 * Synchronization script for internal deployment to sfyun remote
 * Transforms repository for SF Artifactory registry and pushes to sfyun master
 *
 * This script:
 * 1. Ensures we're on master branch
 * 2. Validates clean working tree
 * 3. Pulls latest from origin
 * 4. Creates temporary branch for transformation
 * 5. Replaces npm registry with internal SF Artifactory
 * 6. Regenerates lock file for internal registry
 * 7. Force pushes to sfyun master
 * 8. Cleans up temporary changes and branches
 */

import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import { execa } from 'execa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Configuration
const OFFICIAL_REGISTRY = 'https://registry.npmjs.org/';
const INTERNAL_REGISTRY = 'https://artifactory.sf-express.com/artifactory/api/npm/npm/';
const TEMP_BRANCH = 'tmp-sfyun-sync';
const MASTER_BRANCH = 'master';
const SFYUN_REMOTE = 'sfyun';

// State tracking
let currentBranch = '';
let isOnTempBranch = false;

/**
 * Execute git command
 */
async function git(args, options = {}) {
  try {
    const result = await execa('git', args, {
      cwd: projectRoot,
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options,
    });
    return result;
  } catch (error) {
    if (options.ignoreError) {
      return null;
    }
    throw error;
  }
}

/**
 * Get current git branch
 */
async function getCurrentBranch() {
  const result = await git(['rev-parse', '--abbrev-ref', 'HEAD'], { silent: true });
  return result.stdout.trim();
}

/**
 * Check if branch exists
 */
async function branchExists(branchName) {
  const result = await git(['rev-parse', '--verify', branchName], {
    silent: true,
    ignoreError: true,
  });
  return result !== null;
}

/**
 * Cleanup function - runs on exit or error
 */
async function cleanup() {
  console.log(chalk.yellow('\n[CLEANUP] Restoring environment...'));

  try {
    // Switch back to master branch if we're on temp branch
    currentBranch = await getCurrentBranch();
    if (currentBranch === TEMP_BRANCH) {
      console.log(chalk.yellow(`[CLEANUP] Switching back to ${MASTER_BRANCH}...`));
      await git(['checkout', MASTER_BRANCH], { ignoreError: true });
    }

    // Delete temporary branch if it exists
    if (await branchExists(TEMP_BRANCH)) {
      console.log(chalk.yellow(`[CLEANUP] Deleting temporary branch ${TEMP_BRANCH}...`));
      await git(['branch', '-D', TEMP_BRANCH], { ignoreError: true });
    }

    // Restore .npmrc to official registry
    const npmrcPath = join(projectRoot, '.npmrc');
    if (existsSync(npmrcPath)) {
      console.log(chalk.yellow('[CLEANUP] Restoring .npmrc to official registry...'));
      writeFileSync(npmrcPath, `registry=${OFFICIAL_REGISTRY}\n`, 'utf-8');
    }

    console.log(chalk.green('[CLEANUP] Environment restored successfully'));
  } catch (error) {
    console.error(chalk.red('[CLEANUP] Error during cleanup:'), error.message);
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    // Step 1: Verify we're on master branch
    console.log(chalk.yellow(`[1/8] Verifying current branch is ${MASTER_BRANCH}...`));
    currentBranch = await getCurrentBranch();
    if (currentBranch !== MASTER_BRANCH) {
      throw new Error(`Not on ${MASTER_BRANCH} branch. Current branch: ${currentBranch}`);
    }
    console.log(chalk.green(`[OK] On ${MASTER_BRANCH} branch`));

    // Step 2: Check for clean working tree
    console.log(chalk.yellow('[2/8] Checking for clean working tree...'));
    const status = await git(['diff-index', '--quiet', 'HEAD', '--'], {
      silent: true,
      ignoreError: true,
    });
    if (status === null) {
      throw new Error('Working tree is not clean. Please commit or stash changes.');
    }
    console.log(chalk.green('[OK] Working tree is clean'));

    // Step 3: Pull latest from origin master
    console.log(chalk.yellow(`[3/8] Pulling latest from origin ${MASTER_BRANCH}...`));
    await git(['pull', 'origin', MASTER_BRANCH]);
    console.log(chalk.green('[OK] Pulled latest changes'));

    // Step 4: Create temporary branch for transformation
    console.log(chalk.yellow(`[4/8] Creating temporary branch ${TEMP_BRANCH}...`));
    await git(['checkout', '-b', TEMP_BRANCH]);
    isOnTempBranch = true;
    console.log(chalk.green(`[OK] Created and switched to ${TEMP_BRANCH}`));

    // Step 5a: Replace .npmrc with internal registry
    console.log(chalk.yellow('[5a/8] Replacing .npmrc with internal registry...'));
    const npmrcPath = join(projectRoot, '.npmrc');
    if (!existsSync(npmrcPath)) {
      throw new Error('.npmrc file not found');
    }
    writeFileSync(npmrcPath, `registry=${INTERNAL_REGISTRY}\n`, 'utf-8');
    console.log(chalk.green('[OK] .npmrc updated to internal registry'));

    // Step 5b: Remove pnpm-lock.yaml
    console.log(chalk.yellow('[5b/8] Removing pnpm-lock.yaml...'));
    const lockFilePath = join(projectRoot, 'pnpm-lock.yaml');
    if (existsSync(lockFilePath)) {
      unlinkSync(lockFilePath);
      console.log(chalk.green('[OK] Removed pnpm-lock.yaml'));
    } else {
      console.log(chalk.yellow('[WARN] pnpm-lock.yaml not found'));
    }

    // Step 5c: Regenerate lock file for internal registry
    console.log(chalk.yellow('[5c/8] Regenerating lock file with internal registry...'));
    await execa('pnpm', ['install', '--lockfile-only'], {
      cwd: projectRoot,
      stdio: 'inherit',
    });
    console.log(chalk.green('[OK] Lock file regenerated'));

    // Step 6: Create temporary commit
    console.log(chalk.yellow('[6/8] Creating temporary commit...'));
    await git(['add', '.npmrc', 'pnpm-lock.yaml']);
    await git(['commit', '-m', 'chore: internal deployment sync [skip ci]']);
    console.log(chalk.green('[OK] Temporary commit created'));

    // Step 7: Force push to sfyun master
    console.log(chalk.yellow(`[7/8] Force pushing to ${SFYUN_REMOTE} ${MASTER_BRANCH}...`));
    await git(['push', SFYUN_REMOTE, `${TEMP_BRANCH}:${MASTER_BRANCH}`, '--force']);
    console.log(chalk.green(`[OK] Force pushed to ${SFYUN_REMOTE} ${MASTER_BRANCH}`));

    // Step 8: Cleanup
    console.log(chalk.yellow('[8/8] Cleaning up temporary branch and restoring environment...'));
    await cleanup();
    console.log(chalk.green.bold('\n[SUCCESS] Synchronization completed successfully!\n'));
  } catch (error) {
    console.error(chalk.red(`\n[ERROR] ${error.message}\n`));
    await cleanup();
    process.exit(1);
  }
}

// Run main function
main();
