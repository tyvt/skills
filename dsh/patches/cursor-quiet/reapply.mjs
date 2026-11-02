// Keeps the cursor quiet-retry in place across plugin updates.
//
// magpie updates @magpie-community/opencode-cursor-auth from npm, which
// replaces index.mjs (retry) and native-session.mjs (quiet threshold) and
// drops the helper next to them. This runs from the scheduled task
// (every few minutes and at logon), re-applies both patches when gone, and
// writes only when it had to change something.
import { apply, status, log } from './install.mjs';
import { applyQuiet, statusQuiet } from './patch-quiet.mjs';

try {
  const before = status();
  const result = apply();
  if (result.changed) log(`reapplied retry after a plugin update: plugin ${result.version} (was ${before})`);
  else if (result.helperRefreshed) log(`helper refreshed on plugin ${result.version}`);

  // Keep the quiet watchdog threshold raised on native-session.mjs so large
  // composer preps don't end the turn. patch-magpie-quiet.ps1 used to target
  // the unloaded install-cache copy, which never took effect; this keeps the
  // loaded copy raised across updates.
  try {
    const q = applyQuiet();
    if (q.changed) log(`reapplied quiet raise on native-session.mjs (${q.from} -> ${q.to})`);
  } catch (e) {
    log(`quiet raise skipped: ${e.message}`);
  }
} catch (error) {
  log(`reapply failed: ${error.message}`);
  process.exitCode = 1;
}
