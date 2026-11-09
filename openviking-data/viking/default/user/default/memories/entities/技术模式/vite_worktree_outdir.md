# Vite Build Worktree OutDir & Tee-Object Masking
The zhi2-web-admin vite build writes dist outside the worktree, and PowerShell Tee-Object can mask npm's real exit code.

## Problem Symptoms
- `npm run build` pipeline `2>&1 | Tee-Object` returns exit 0 from Tee-Object (last pipeline command), masking npm/vite's real exit code
- `--logLevel error` suppresses vite's `✓ built` summary, so its absence is not proof of build failure
- `dist` directory missing inside the worktree despite the job reporting exit 0

## Root Cause
- vite config sets `rootDir = path.resolve(__dirname, "../")` where `__dirname` is the worktree root, so `outDir = rootDir + "/dist"` resolves to `D:\repository\门户\dist` (parent of worktree, outside it)
- The build actually succeeded: it transformed 5514 modules, emitted `../dist/assets/...js` chunks, and `VITE_EXIT=0`; output simply landed outside the worktree

## Diagnosis Method
- Re-run the build directly with `npx vite build` (bypass the wrapper) using `info` log level to see real progress and errors
- Read the tail of the verbose log past the module-transform lines to find chunk-emission paths that reveal the true outDir
- Strip ANSI color codes from logs (PowerShell reads them as binary) before inspecting content

## Verification & Attribution
- Verified on 2026-11-09: direct vite build with info logging transformed 5514 modules and emitted to `../dist/assets/`, confirming success outside the worktree
- Project: 门户 / zhi2-web-admin; source: gitlab agent debug session 2026-11-09

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_worktree_outdir",
  "source_extraction_id": "c84f619bfe814f09a4f747b0e5e53a99",
  "version": 1,
  "memory_type": "entities"
}
-->