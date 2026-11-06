# 分支机构E2E用例修复
苏州市房地产监测V3 中修复 agency-branch-flow 相关 E2E 失败用例，当前 11 用例 10 通过 1 跳过。

## 失败与修复
- `agency-branch-flow.spec.js` 缺少 `injectRouteMeta` 函数，补充与从业人员用例一致的实现
- 真实接口 `init` 超时因 Mock 用例先报错中断，补函数后通过；路由 `__e2e__/institution/agencyBranch/*` 已存在
- 真实接口 `填写表单并保存` 超时因 `init` 完成前 `patchComponentForm` 被覆盖，保存前先 `waitForResponse('/company...')`

## 测试结果
- 终端 11 个用例：10 通过，1 跳过（主管部门注销用例无已备案数据时正确 skip）

## 涉及文件
- `e2e/institution/agency-branch-flow.spec.js`
- `e2e/institution/agency-personnel-flow.spec.js`
- `src/router/index.js`
- `e2e/institution/agency-branch-real-api-flow.spec.js`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：0de4a5e8-a541-44a5-9333-686d318edcc5
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_e2e_fix",
  "source_extraction_id": "2ba2686ff52a4d9c9c970639d6f824f6",
  "version": 1,
  "memory_type": "entities"
}
-->