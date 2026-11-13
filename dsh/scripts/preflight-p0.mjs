// Explicit, offline environment precheck. Does not infer a framework default.
import fs from 'node:fs';
import path from 'node:path';
export function preflight({ workdir, packageScript, testUrl, expectedOrigin, environment } = {}) {
  const errors = [];
  if (!workdir || !path.isAbsolute(workdir) || !fs.existsSync(workdir) || !fs.statSync(workdir).isDirectory()) {
    return { ok: false, errors: ['WORKDIR_NOT_FOUND'], checks: [] };
  }
  const checks = ['workdir'];
  if (packageScript !== undefined) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(workdir, 'package.json'), 'utf8'));
      if (typeof packageScript !== 'string' || typeof pkg.scripts?.[packageScript] !== 'string') errors.push('SCRIPT_NOT_FOUND');
      checks.push('packageScript');
    } catch { errors.push('PACKAGE_JSON_INVALID'); }
  }
  if (testUrl !== undefined || expectedOrigin !== undefined) {
    try {
      if (!testUrl || !expectedOrigin || new URL(testUrl).origin === 'null'
          || new URL(testUrl).origin !== new URL(expectedOrigin).origin) errors.push('TEST_ORIGIN_MISMATCH');
      checks.push('testOrigin');
    } catch { errors.push('TEST_URL_INVALID'); }
  }
  if (environment !== undefined) {
    if (!['node', 'jsdom', 'happy-dom', 'browser'].includes(environment)) errors.push('TEST_ENVIRONMENT_UNKNOWN');
    checks.push('environment');
  }
  return { ok: errors.length === 0, errors, checks };
}
