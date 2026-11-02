// Smoke test: the patched plugin module still imports and exposes its API.
import { NATIVE } from './patch-batch-sealed.mjs';
import { pathToFileURL } from 'node:url';
const m = await import(pathToFileURL(NATIVE).href);
console.log('exports:', Object.keys(m).join(', '));
console.log('has NativeSessionPool:', typeof m.NativeSessionPool === 'function');
console.log('limits.batchWait:', m.NATIVE_LIMITS?.batchWait);
console.log('limits.quiet:', m.NATIVE_LIMITS?.quiet);
