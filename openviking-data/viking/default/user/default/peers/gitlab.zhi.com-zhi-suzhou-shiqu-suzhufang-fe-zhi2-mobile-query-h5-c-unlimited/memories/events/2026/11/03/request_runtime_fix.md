# Summary
On 2026-11-03, the assistant identified the root cause and fixed `src/utils/request.ts`: `.env.test` pinned `VITE_API_BASE_URL=/api` into a module-level constant so `vi.stubEnv` could not flip `isConfigured()` to false. The fix reads `VITE_API_BASE_URL` and project id at runtime via `import.meta.env` (added `getApiBase()`/`getProjectId()`). Local Vitest then passed 20/20.
# 2026-11-03 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: ...[41m[1m FAIL [22m[49m tests/flood.test.ts[2m > [22m选择真实模式但尚未接入接口时明确拒绝本地模拟提交
[31m[1mAssertionError[22m: expected [Function] to throw error including '真实接口' but got '缺少预警事件'[39m

Expected: [32m"真实接口"[39m
Received: [31m"缺少预警事件"[39m

[36m [2m❯[22m tests/flood.test.ts:[2m116:72[22m[39m
    [90m114|[39m   try {
    [90m115|[39m     const store = createFloodStore(storage, 'remote')()
    [90m116|[39m     await expect(store.submitInspection('pre', { date: '2026-10-28' })…
    [90m   |[39m                                                                        [31m^[39m
    [90m117|[39m     expect(memory.size).toBe(0)
    [90m118|[39m   } finally {

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m

[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m3 passed[39m[22m[90m (4)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m19 passed[39m[22m[90m (20)[39m
[2m   Start at [22m 16:29:19
[2m   Duration [22m 1.02s[2m (environment 61%, transform 20%, import 15%, tests 3%, worker 1%)[22m

section_end:1793694560:step_script
[0K[31;1mERROR: Job failed: exit status 1
[0;m
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: CI 失败：`flood.test.ts` 在 remote 模式下期望抛出含「真实接口」的错误，实际先抛「缺少预警事件」。正在定位校验顺序与测试 setup。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 根因：`.env.test` 在加载时把 `VITE_API_BASE_URL=/api` 写进模块级常量，`vi.stubEnv` 无法让 `isConfigured()` 生效。将改为运行时读取 `import.meta.env`。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: ## 原因

GitLab 在 `npm run test` 里先跑 Vitest。`.env.test` 会把 `VITE_API_BASE_URL=/api` 写进环境，而 [`src/utils/request.ts`](<苏住房防汛C端/src/utils/request.ts>) 以前在**模块加载时**就把 `API_BASE` 定死了。

用例「选择真实模式但尚未接入接口时明确拒绝本地模拟提交」里虽然用了 `vi.stubEnv('VITE_API_BASE_URL', '')`，`isConfigured()` 仍一直为 `true`，于是走到 remote 校验，先抛 **「缺少预警事件」**，而不是 **「真实接口」**。

## 修复

在 [`src/utils/request.ts`](<苏住房防汛C端/src/utils/request.ts>) 中改为每次从 `import.meta.env` 读取：

- 新增 `getApiBase()` / `getProjectId()`
- `isConfigured()`、`fetchLoginCaptcha()`、默认 `request` 的 `baseUrl` 都走运行时读取

本地 Vitest：**20/20 通过**。...

<!-- MEMORY_FIELDS
{
  "event_name": "request_runtime_fix",
  "goal": "Record CI fix implementation",
  "summary": "On 2026-11-03, the assistant identified the root cause and fixed `src/utils/request.ts`: `.env.test` pinned `VITE_API_BASE_URL=/api` into a module-level constant so `vi.stubEnv` could not flip `isConfigured()` to false. The fix reads `VITE_API_BASE_URL` and project id at runtime via `import.meta.env` (added `getApiBase()`/`getProjectId()`). Local Vitest then passed 20/20.",
  "ranges": "36-44,75,103-107",
  "source_extraction_id": "ffea204e58364146a47d1f2d9e6ed4f0",
  "version": 1,
  "memory_type": "events"
}
-->