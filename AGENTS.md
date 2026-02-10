# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-09 10:44:02  
**Commit:** 88de171 (2026-01-04)  
**Branch:** feature/reorder

## OVERVIEW
React component library wrapping Ant Design 4 for SCC OMS. Dual support for moment/dayjs time libraries.

## STRUCTURE
```
scc-oms-components/
├── src/
│   ├── components/    # 10 React components
│   ├── hooks/         # 3 custom hooks
│   ├── utils/         # 4 utility functions
│   └── locale/        # i18n (zh-CN, en-US)
├── .dumi/            # Documentation config
└── docs/             # Static docs
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add/modify component | `src/components/[Name]/` | Each has index.tsx + index.md + demo/ |
| Date/time components | `src/components/*Dayjs/` or `*Picker/` | Dual moment/dayjs implementations |
| Form utilities | `src/hooks/useValidatedFormValues` | Filters extra fields before submit |
| Time zone handling | `src/utils/getTimeZone` | - |
| Transform moment↔dayjs | `src/utils/*Transform` | momentTransform, dayjsTransform |
| Add demo | `src/components/[Name]/demo/` | Interactive demos in Dumi |
| Build config | `.fatherrc.ts` | ESM/CJS/UMD outputs |
| Lint/format | `biome.json` | Biome, NOT ESLint |
| Release flow | `.github/workflows/release.yml` | Auto-release via semantic-release |

## CONVENTIONS

**Differs from standard:**
- **Biome** for linting (not ESLint/Prettier) - line width 120, single quotes for JS, double for JSX
- **Dual time library support** - Both moment and dayjs variants (e.g., FormRangePicker vs FormRangePickerDayjs)
- **Path aliases** - Import via `components/*`, `utils/*`, `hooks/*`, `locale/*` (not relative paths)
- **No test framework** - Documentation-driven testing via Dumi interactive demos
- **Commit messages** - Conventional commits with **Chinese prompts**, 72 char header limit
- **TypeScript** - Strict mode but `strictNullChecks: false`
- **Registry** - Private artifactory.sf-express.com for deps, npmjs.org for publishing

## ANTI-PATTERNS (THIS PROJECT)

**DEPRECATED components:**
- `FormDatePicker`, `FormTimePicker` in FormRangePickerDayjs → Use `FormDateRangePicker`, `FormTimeRangePicker` instead

**FormTable gotchas:**
- Access data via `record.name` NOT `record.key`
- Creates extra fields → Use `useValidatedFormValues` hook to filter before submission

**ProSearchForm DateRangePicker/TimeRangePicker:**
- Set FormItem props in `props` object, NOT top-level

**Data access:**
- Use `record.name` NOT `record.key` in FormTable

## UNIQUE STYLES

**Component organization:**
- Module-per-component: `ComponentName/index.tsx` + `index.md` + `demo/`
- Demo files NOT exported (documentation only, depth 4+)
- Internal sub-components stay private (e.g., ProSearchForm/custom-list-transfer.tsx)

**Dual implementation pattern:**
- DateTimePicker (moment) vs DateTimePickerDayjs (dayjs)
- FormRangePicker (moment) vs FormRangePickerDayjs (dayjs)
- Transform utilities for interop

**Export strategy:**
- Barrel export from `src/index.ts`
- Package.json exports: ESM (`esm/index.js`), CJS (`cjs/index.js`), UMD (`dist/scc-oms-components.min.js`)

## COMMANDS

```bash
# Development
pnpm install          # Install dependencies
pnpm dev              # Start Dumi dev server
pnpm start            # Alias for dev

# Build
pnpm build            # Father build (ESM/CJS/UMD)
pnpm docs:build       # Build documentation site

# Quality
pnpm lint             # Biome check
pnpm format           # Biome format --write

# Release
pnpm release          # Custom release.js (beta versions on feature branches)

# Internal Sync
pnpm sync:sfyun       # Sync registry configuration for SF internal deployment
```

**CI/CD:** Push to master → GitHub Actions → lint → build → semantic-release

## INTERNAL SYNCHRONIZATION WORKFLOW

### Overview
The `sync:sfyun` command enables seamless registry transformation for internal SF deployment while maintaining standard public-facing source code. This workflow allows developers to:
- Develop and test against the public npm registry
- Automatically transform registry references for internal SF Yun deployment
- Maintain a single source of truth without manual registry switching

### Prerequisites
- Access to SF internal network (required for internal deployment)
- Bash shell environment
- `scripts/sync-sfyun.sh` script present in repository root

### Usage
```bash
# Synchronize registry configuration for internal deployment
pnpm sync:sfyun
```

### Workflow Details
The synchronization process performs the following transformations:

1. **Registry Transformation**: Converts public npm registry references to internal SF Yun registry (`https://artifactory.sf-express.com/artifactory/api/npm/npm/`)
2. **Configuration Sync**: Updates relevant configuration files to point to internal registry
3. **Dependency Resolution**: Ensures all dependencies resolve correctly against the internal registry
4. **Validation**: Verifies the transformation completed successfully

### When to Use
- **Before internal deployment**: Run `pnpm sync:sfyun` to prepare the codebase for SF internal systems
- **After public releases**: Ensure public registry is restored before committing to master
- **CI/CD pipelines**: Integrate into deployment workflows targeting internal infrastructure

### Important Notes
- This command is **internal-only** and requires SF network access
- The transformation is **non-destructive** and can be reversed by restoring original configuration
- Always verify the transformation with `pnpm run` to confirm registry changes
- Do NOT commit transformed registry configurations to public branches (master/main)


## NOTES

**Complexity hotspots:**
- `SearchForm/index.tsx` (500 lines) - 87-line switch, 5-level nesting, needs refactoring
- `ProSearchForm/custom-list-transfer.tsx` (378 lines) - 8-level nesting (highest), complex drag-drop

**TODOs in codebase:**
- Modal operation timing in ProSearchForm
- Left list selection issue
- Parameter validation in custom-list-transfer
- Debug console.logs in item-operate-modal.tsx (lines 26-28)

**Browser targets:** Chrome 49+, Firefox 64+, Safari 10+, Edge 14+, iOS 10+

**Husky hooks:** pre-commit (lint-staged), commit-msg (commitlint)
