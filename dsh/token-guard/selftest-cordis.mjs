// 真 cordis 集成验证（计划验证计划第 2 步，reviewer 建议 #2）：
// 用 @deepseek-ai/dsh 自带的 cordis 4.1.0 加载 token-guard，确认无激活报错且 p0LogReader 可读回。
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert';
import { apply, name, inject } from './lib/index.js';

const require = createRequire('file:///D:/nvm/v22.23.2/node_modules/@deepseek-ai/dsh/package.json');
const cordis = await import(pathToFileURL(require.resolve('@deepseek-ai/cordis')).href);
assert.ok(cordis.Context, 'cordis exports Context');

const root = new cordis.Context();
root.provide('tools', { register() {} }); // 满足 inject ['tools']，模拟宿主
root.plugin({ name, inject, apply }, { enabled: true });
await new Promise((r) => setImmediate(r)); // 等 fiber 激活
assert.equal(typeof root.p0LogReader, 'function', 'p0LogReader readable via provide after activation');
console.log('token-guard cordis integration: OK (no activate error, reader provided)');
process.exit(0);
