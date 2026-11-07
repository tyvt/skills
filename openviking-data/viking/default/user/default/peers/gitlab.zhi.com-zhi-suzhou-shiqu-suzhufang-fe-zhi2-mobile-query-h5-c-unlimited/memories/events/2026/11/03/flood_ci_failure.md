# Summary
On 2026-11-03, the GitLab CI job for branch `dev` of project `zhi2-mobile-query-h5-c-unlimited` (suzhufang-flood-mobile) failed with exit status 1. In `tests/flood.test.ts`, 1 of 20 tests failed: the case '选择真实模式但尚未接入接口时明确拒绝本地模拟提交' expected an error containing '真实接口' but received '缺少预警事件'. 19 other tests passed.
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

<!-- MEMORY_FIELDS
{
  "event_name": "flood_ci_failure",
  "goal": "Record CI test failure",
  "summary": "On 2026-11-03, the GitLab CI job for branch `dev` of project `zhi2-mobile-query-h5-c-unlimited` (suzhufang-flood-mobile) failed with exit status 1. In `tests/flood.test.ts`, 1 of 20 tests failed: the case '选择真实模式但尚未接入接口时明确拒绝本地模拟提交' expected an error containing '真实接口' but received '缺少预警事件'. 19 other tests passed.",
  "ranges": "36-44",
  "source_extraction_id": "ffea204e58364146a47d1f2d9e6ed4f0",
  "version": 1,
  "memory_type": "events"
}
-->