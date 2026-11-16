// Keeps the cursor quiet-retry in place across plugin updates.
//
// magpie updates @magpie-community/opencode-cursor-auth from npm, which
// replaces index.mjs (retry) and native-session.mjs (quiet threshold) and
// drops the helper next to them. This runs from the scheduled task
// (every few minutes and at logon), re-applies both patches when gone, and
// writes only when it had to change something.
import { apply, status, log } from './install.mjs';
import { applyQuiet, statusQuiet } from './patch-quiet.mjs';
import { apply as applyBatchSealed } from '../cursor-batch-sealed/patch-batch-sealed.mjs';
import { apply as applyFastDefault } from '../cursor-fast-default/patch-fast-default.mjs';

let wiringFailed = false;

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

  // Keep the sealed-batch retransmission fix on native-session.mjs: without it a
  // retransmitted exec after a single-call step seals its batch ends the whole
  // turn with "native call arrived after its batch was sealed" (502).
  try {
    const b = applyBatchSealed();
    if (b.changed) log('reapplied sealed-batch retransmission fix on native-session.mjs');
  } catch (e) {
    log(`sealed-batch fix skipped: ${e.message}`);
  }

  // Keep the fast-default on every plugin copy: without it direct API calls
  // without service_tier never run Cursor's fast variant.
  try {
    const f = applyFastDefault();
    if (f.results.some((r) => !r.ok)) {
      wiringFailed = true;
      log(`fast-default fix incomplete: ${f.results.filter((r) => !r.ok).map((r) => `${r.path} (${r.reason})`).join(', ')}`);
    } else if (f.changed) {
      log('reapplied fast-default on plugin index.mjs copy(ies)');
    }
  } catch (e) {
    wiringFailed = true;
    log(`fast-default fix skipped: ${e.message}`);
  }
} catch (error) {
  log(`reapply failed: ${error.message}`);
  process.exitCode = 1;
}
if (wiringFailed) process.exitCode = 1;
