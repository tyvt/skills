import { readFileSync } from 'node:fs';

export const policy = JSON.parse(readFileSync(new URL('./p0-policy.json', import.meta.url), 'utf8'));
export function hasReadRange(args) {
  return Number.isSafeInteger(args?.limit) && args.limit >= 1 && args.limit <= policy.pagination.maxLines
    && (args.offset === undefined || (Number.isSafeInteger(args.offset) && args.offset >= policy.pagination.offsetBase));
}
export function capText(text, max = policy.result.directChars, notice = '\n[budget] 结果已截断，请缩小范围。') {
  text = String(text);
  return text.length <= max ? text : text.slice(0, Math.max(0, max - notice.length)) + notice.slice(0, max);
}
export function redact(text) {
  return String(text)
    .replace(/-----BEGIN [^-]*PRIVATE KEY-----[\s\S]*?-----END [^-]*PRIVATE KEY-----/g, '[REDACTED PRIVATE KEY]')
    .replace(/((?:authorization|password|passwd|token|secret|api[_-]?key)["']?\s*[:=]\s*["']?)(?:Bearer\s+)?[^\s,;"']+/gi, '$1[REDACTED]')
    .replace(/\bBearer\s+[a-z0-9._~+\/-]+=*/gi, 'Bearer [REDACTED]');
}
export function validExecution(args) {
  const execution = args?.execution;
  if (typeof args?.workdir !== 'string' || !/^(?:[a-z]:[\\/]|\/)/i.test(args.workdir) || !execution || Object.keys(execution).some(key => !['program', 'args', 'timeout'].includes(key))) return false;
  const { program, args: argv, timeout = 120 } = execution;
  if (!['npm', 'pnpm', 'bun', 'python', 'git', 'node'].includes(program) || !Array.isArray(argv)
    || !argv.every(arg => typeof arg === 'string' && !/[;&|<>`\r\n\x00]|\$[({]/.test(arg)
      && !['-c', '-e', '--eval', '--print', '-p', '--exec', '-exec', '--command'].includes(arg.toLowerCase()))
    || typeof timeout !== 'number' || !Number.isFinite(timeout) || timeout <= 0 || timeout > 3600) return false;
  if (['npm', 'pnpm', 'bun'].includes(program)) return [['test'], ['build'], ['lint'], ['--version'], ['run', 'test'], ['run', 'build'], ['run', 'lint']].some(value => JSON.stringify(value) === JSON.stringify(argv));
  if (program === 'python') return argv[0] === '-m' && argv[1] === 'pytest';
  if (program === 'node') return argv.length === 1 && argv[0] === '--version';
  return ['status', 'diff', 'log', 'show', 'rev-parse', 'ls-files', '--version'].includes(argv[0]) && !argv.some(arg => ['--ext-diff', '--textconv', '--output', '--config', '--exec-path'].some(prefix => arg.startsWith(prefix)));
}
