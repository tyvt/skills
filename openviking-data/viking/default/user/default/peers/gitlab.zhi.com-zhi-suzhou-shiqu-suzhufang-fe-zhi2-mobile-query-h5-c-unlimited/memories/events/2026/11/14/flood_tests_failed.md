# Summary
On 2026-11-14, CI job for zhi2-mobile-query-h5-c-unlimited reported 12 failed tests in tests/flood.test.ts (18 total). Root causes identified from logs and assistant analysis: src/utils/request.ts calls uni.request without a test stub (ReferenceError: uni is not defined), and the flood store's submitInspection/submitRescue/history/count functions use remote interface while tests expected local VITE_FLOOD_MOCK data; validation errors like '缺少预警事件' threw before mock path. The job failed with exit status 1.
# 2026-11-14 (Saturday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: ❯ tests/portal.test.ts (0 test)
 ✓ tests/photos.test.ts (1 test) 17ms
 ✓ tests/request.test.ts (12 tests) 28ms
 ✓ tests/flood-remote.test.ts (3 tests) 13ms
 ✓ tests/richText.test.ts (8 tests) 9ms
 ❯ tests/flood.test.ts (18 tests | 12 failed) 47ms
   × 开启 VITE_FLOOD_MOCK 时注入完整演示工单数据集 18ms
   × 历史记录按类型和状态筛选后分页，不混入其他类型 2ms
   × 汛中与汛后巡检没有填报日期，提交时不要求日期 1ms
   × 历史记录可合并返回巡检与求援工单并分别统计数量 1ms
   ✓ 草稿保存时间可被历史记录用于展示 2ms
   × 缺少日期或数量为负数时拒绝提交并保留草稿 7ms
   × 提交存储失败时不显示成功且仍可恢复原草稿 2ms
   × 求援必须提供联系方式和现场说明，成功后可从求援历史读取 1ms
   × 尚未保存成功的照片不能随检查或求援归档 2ms
   × 并发提交同一检查时仅生成一张工单并给出处理中提示 1ms
   ✓ 不兼容或损坏的本地数据会明确报错且不被覆盖 1ms
   × 并发求援提交只创建一张工单 1ms
   ✓ 照片尚未保存完成时拒绝存草稿并保留原草稿 1ms
   ✓ 选择真实模式但尚未接入接口时明确拒绝本地模拟提交 1ms
   ✓ 重新创建应用后可恢复汛前检查草稿，且与汛中草稿隔离 1ms
   × 提交汛前检查后生成可查询的归档并清除对应草稿 1ms
   ✓ 草稿可按历史列表主键反查，非草稿主键返回空 1ms
   × 历史记录草稿与已提交数量可分别统计 1ms
 ✓ tests/counter.test.ts (1 test) 29ms
⎯⎯⎯⎯⎯⎯ Failed Suites 1 ⎯⎯⎯⎯⎯⎯⎯
 FAIL  tests/portal.test.ts [ tests/portal.test.ts ]
Error: Failed to resolve import "../src/mock/portalSeed" from "../../tests/portal.test.ts". Does the file exist?
  Plugin: vite:import-analysis
  File: /home/gitlab-runner/builds/WgnM5oiW/0/zhi/suzhou/shiqu/suzhufang/fe/zhi2-mobile-query-h5-c-unlimited/tests/portal.test.ts:3:47
  1  |  import { describe, expect, it, vi, afterEach } from "vitest";
  2  |  import { PORTAL_ROUTES, PORTAL_TABS, TAB_CODES } from "../src/composables/usePortalNav";
  3  |  import { SEED_HOME, SEED_MINE, seedList } from "../src/mock/portalSeed";
     |                                                  ^
  4  |  import { fetchHome, fetchMine, fetchList, fetchDetail, usePortalApi } from "../src/utils/portalData";
  5  |  import { setLoginUser, clearLoginUser } from "../src/utils/request";
 ❯ TransformPluginContext._formatLog tools/testing/node_modules/vite/dist/node/chunks/node.js:8803:39
 ❯ TransformPluginContext.error tools/testing/node_modules/vite/dist/node/chunks/node.js:8800:14
 ❯ resolveId tools/testing/node_modules/vite/dist/node/chunks/node.js:26594:18
 ❯ tools/testing/node_modules/vite/dist/node/chunks/node.js:26693:23
 ❯ TransformPluginContext.transform tools/testing/node_modules/vite/dist/node/chunks/node.js:26666:4
 ❯ EnvironmentPluginContainer.transform tools/testing/node_modules/vite/dist/node/chunks/node.js:8582:14
 ❯ loadAndTransform tools/testing/node_modules/vite/dist/node/chunks/node.js:20155:26
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/13]⎯
⎯⎯⎯⎯⎯⎯ Failed Tests 12 ⎯⎯⎯⎯⎯⎯⎯
 FAIL  tests/flood.test.ts > 开启 VITE_FLOOD_MOCK 时注入完整演示工单数据集
ReferenceError: uni is not defined
 ❯ src/utils/request.ts:108:3
    106|
    107| export const uniTransport: Transport = input => new Promise((resolve, …
    108|   uni.request({
       |   ^
    109|     url: input.url,
    110|     method: input.method as never,
 ❯ uniTransport src/utils/request.ts:107:49
 ❯ request src/utils/request.ts:72:28
 ❯ Proxy.countHistory src/stores/flood.ts:267:28
 ❯ Proxy.wrappedAction node_modules/pinia/dist/pinia.mjs:1399:26
 ❯ tests/flood.test.ts:9:24
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/13]⎯
 FAIL  tests/flood.test.ts > 历史记录按类型和状态筛选后分页，不混入其他类型
Error: 缺少预警事件
 ❯ submitInspectionRemote src/stores/flood.ts:188:34
    186|       if (!isConfigured()) throw new Error('真实接口未配置：请设置 VITE_API_BASE_…
    187|       // values 约定：{ eventId, complexId, checkDate?, haveDanger?, item…
    188|       if (!values.eventId) throw new Error('缺少预警事件')
       |                                  ^
    189|       if (!values.complexId) throw new Error('请选择物业管理区域')
    190|       const items = normalizeItems(values)
 ❯ Proxy.submitInspection src/stores/flood.ts:181:26
 ❯ Proxy.wrappedAction node_modules/pinia/dist/pinia.mjs:1399:26
 ❯ tests/flood.test.ts:19:15
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/13]⎯
 FAIL  tests/flood.test.ts > 汛中与汛后巡检没有填报日期，提交时不要求日期
Error: 缺少预警事件
 ❯ submitInspectionRemote src/stores/flood.ts:188:34
    186|       if (!isConfigured()) throw new Error('真实接口未配置：请设置 VITE_API_BASE_…
    187|       // values 约定：{ eventId, complexId, checkDate?, haveDanger?, item…
    188|       if (!values.eventId) throw new Error('缺少预警事件')
       |                                  ^
    189|       if (!values.complexId) throw new Error('请选择物业管理区域')
    190|       const items = normalizeItems(values)
 ❯ Proxy.submitInspection src/stores/flood.ts:181:26
 ❯ Proxy.wrappedAction node_modules/pinia/dist/pinia.mjs:1399:26
 ❯ tests/flood.test.ts:33:30
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/13]⎯
 FAIL  tests/flood.test.ts > 历史记录可合并返回巡检与求援工单并分别统计数量
Error: 缺少预警事件
 ❯ submitInspectionRemote src/stores/flood.ts:188:34
    186|       if (!isConfigured()) throw new Error('真实接口未配置：请设置 VITE_API_BASE_…
    187|       // values 约定：{ eventId, complexId, checkDate?, haveDanger?, item…
    188|       if (!values.eventId) throw new Error('缺少预警事件')
       |                                  ^
    189|       if (!values.complexId) throw new Error('请选择物业管理区域')
    190|       const items = normalizeItems(values)
 ❯ Proxy.submitInspection src/stores/flood.ts:181:26
 ❯ Proxy.wrappedAction node_modules/pinia/dist/pinia.mjs:1399:26
 ❯ tests/flood.test.ts:40:15
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/13]⎯
 FAIL  tests/flood.test.ts > 缺少日期或数量为负数时拒绝提交并保留草稿
AssertionError: expected [Function] to throw error including '填报日期' but got '缺少预警事件'
Expected: "填报日期"
Received: "缺少预警事件"
 ❯ tests/flood.test.ts:60:72
     58|   const store = createFloodStore(storage)()
     59|   store.saveDraft('pre', { date: '', people: -1 })
     60|   await expect(store.submitInspection('pre', { date: '', people: -1 })…
       |                                                                        ^
     61|   await expect(store.submitInspection('pre', { date: '2026-10-28', peo…
     62|   expect(store.loadDraft('pre')).toEqual({ date: '', people: -1 })
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/13]⎯
 FAIL  tests/flood.test.ts > 提交存储失败时不显示成功且仍可恢复原草稿
AssertionError: expected [Function] to throw error including '存储空间不足' but got '缺少预警事件'
Expected: "存储空间不足"
Received: "缺少预警事件"
 ❯ tests/flood.test.ts:71:81
     69|   store.saveDraft('pre', { date: '2026-10-28', people: 4 })
     70|   fail = true
     71|   await expect(store.submitInspection('pre', { date: '2026-10-28', peo…
       |                                                                                 ^
     72|   expect(store.loadDraft('pre')).toEqual({ date: '2026-10-28', people:…
     73| })
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/13]⎯
 FAIL  tests/flood.test.ts > 求援必须提供联系方式和现场说明，成功后可从求援历史读取
Error: 请选择物业管理区域
 ❯ submitRescueRemote src/stores/flood.ts:288:36
    286|       if (!['一般', '紧急', '特级'].includes(String(values.level))) throw ne…
    287|       if (!String(values.danger ?? '').trim() || !String(values.suppor…
    288|       if (!values.complexId) throw new Error('请选择物业管理区域')
       |                                    ^
    289|       const payload = {
    290|         // Long 雪花ID > 2^53，用字符串传递
 ❯ Proxy.submitRescue src/stores/flood.ts:279:26
 ❯ Proxy.wrappedAction node_modules/pinia/dist/pinia.mjs:1399:26
 ❯ tests/flood.test.ts:79:30
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/13]⎯
 FAIL  tests/flood.test.ts > 尚未保存成功的照片不能随检查或求援归档
AssertionError: expected [Function] to throw error including '照片' but got '缺少预警事件'
Expected: "照片"
Received: "缺少预警事件"
 ❯ tests/flood.test.ts:86:111
     84| test('尚未保存成功的照片不能随检查或求援归档', async () => {
     85|   const store = createFloodStore(storage)()
     86|   await expect(store.submitInspection('pre', { date: '2026-10-28', pho…
       |                                                                                                               ^
     87|   await expect(store.submitRescue({ contact: '演示用户', phone: '138123456…
     88| })
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/13]⎯
 FAIL  tests/flood.test.ts > 并发提交同一检查时仅生成一张工单并给出处理中提示
Error: 缺少预警事件
 ❯ submitInspectionRemote src/stores/flood.ts:188:34
    186|       if (!isConfigured()) throw new Error('真实接口未配置：请设置 VITE_API_BASE_…
    187|       // values 约定：{ eventId, complexId, checkDate?, haveDanger?, item…
    188|       if (!values.eventId) throw new Error('缺少预警事件')
       |                                  ^
    189|       if (!values.complexId) throw new Error('请选择物业管理区域')
    190|       const items = normalizeItems(values)
 ❯ Proxy.submitInspection src/stores/flood.ts:181:26
 ❯ Proxy.wrappedAction node_modules/pinia/dist/pinia.mjs:1399:26
 ❯ tests/flood.test.ts:93:23
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[10/13]⎯
 FAIL  tests/flood.test.ts > 并发求援提交只创建一张工单
Error: 请选择物业管理区域
 ❯ submitRescueRemote src/stores/flood.ts:288:36
    286|       if (!['一般', '紧急', '特级'].includes(String(values.level))) throw ne…
    287|       if (!String(values.danger ?? '').trim() || !String(values.suppor…
    288|       if (!values.complexId) throw new Error('请选择物业管理区域')
       |                                    ^
    289|       const payload = {
    290|         // Long 雪花ID > 2^53，用字符串传递
 ❯ Proxy.submitRescue src/stores/flood.ts:279:26
 ❯ Proxy.wrappedAction node_modules/pinia/dist/pinia.mjs:1399:26
 ❯ tests/flood.test.ts:110:23
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[11/13]⎯
 FAIL  tests/flood.test.ts > 提交汛前检查后生成可查询的归档并清除对应草稿
Error: 缺少预警事件
 ❯ submitInspectionRemote src/stores/flood.ts:188:34
    186|       if (!isConfigured()) throw new Error('真实接口未配置：请设置 VITE_API_BASE_…
    187|       // values 约定：{ eventId, complexId, checkDate?, haveDanger?, item…
    188|       if (!values.eventId) throw new Error('缺少预警事件')
       |                                  ^
    189|       if (!values.complexId) throw new Error('请选择物业管理区域')
    190|       const items = normalizeItems(values)
 ❯ Proxy.submitInspection src/stores/flood.ts:181:26
 ❯ Proxy.wrappedAction node_modules/pinia/dist/pinia.mjs:1399:26
 ❯ tests/flood.test.ts:153:30
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[12/13]⎯
 FAIL  tests/flood.test.ts > 历史记录草稿与已提交数量可分别统计
Error: 缺少预警事件
 ❯ submitInspectionRemote src/stores/flood.ts:188:34
    186|       if (!isConfigured()) throw new Error('真实接口未配置：请设置 VITE_API_BASE_…
    187|       // values 约定：{ eventId, complexId, checkDate?, haveDanger?, item…
    188|       if (!values.eventId) throw new Error('缺少预警事件')
       |                                  ^
    189|       if (!values.complexId) throw new Error('请选择物业管理区域')
    190|       const items = normalizeItems(values)
 ❯ Proxy.submitInspection src/stores/flood.ts:181:26
 ❯ Proxy.wrappedAction node_modules/pinia/dist/pinia.mjs:1399:26
 ❯ tests/flood.test.ts:174:15
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[13/13]⎯
 Test Files  2 failed | 5 passed (7)
      Tests  12 failed | 31 passed (43)
   Start at  12:02:02
   Duration  1.26s (environment 61%, transform 25%, import 11%, tests 2%, worker 1%)
ERROR: Job failed: exit status 1
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 我先查一下这次测试失败对应仓库的历史处理记录，再核对当前工作区状态和测试配置，确认问题是测试环境/测试数据还是实现回归。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 初步证据显示这不是单一失败：门户测试导入了不存在的静态种子文件；防汛测试则在 `request` 没有 `uni` 测试替身、且默认走远程接口的情况下运行，导致 12 个用例未进入本地模拟路径。当前仓库本身已有 8 处未提交改动，我会先让只读代理核实测试 setup 与实现契约，再决定最小修复范围，避免覆盖已有工作。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 这份输出显示两类问题：

- `tests/portal.test.ts` 导入了不存在的 `src/mock/portalSeed`，因此套件在收集阶段失败。
- 多个 `tests/flood.test.ts` 用例期待本地模拟提交和历史数据，但当前 `flood` store 的提交、历史查询和计数都走远程接口；测试没有提供实现所需的 API 数据。

我还没改文件或运行测试。当前仓库在 `dev` 分支，快照显示有 8 处未提交改动；失败涉及的测试和实现文件不在这 8 处中。

要继续修复，需要先确定预期：恢复测试需要的 mock 行为，还是调整测试以匹配当前远程实现？按仓库规则，代码修改前还要先完成计划审核和人工确认。

<!-- MEMORY_FIELDS
{
  "event_name": "flood_tests_failed",
  "goal": "Record flood test failures",
  "summary": "On 2026-11-14, CI job for zhi2-mobile-query-h5-c-unlimited reported 12 failed tests in tests/flood.test.ts (18 total). Root causes identified from logs and assistant analysis: src/utils/request.ts calls uni.request without a test stub (ReferenceError: uni is not defined), and the flood store's submitInspection/submitRescue/history/count functions use remote interface while tests expected local VITE_FLOOD_MOCK data; validation errors like '缺少预警事件' threw before mock path. The job failed with exit status 1.",
  "ranges": "0-85,86,116,156-157",
  "source_extraction_id": "d477aa8170cb4d798b3e3b9ff836779a",
  "version": 1,
  "memory_type": "events"
}
-->