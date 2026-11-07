# 监管银行详情页分支行接口修复
苏州市房地产监测V3 项目修复监管银行详情页及弹窗的银行分支行列表接口，将 `bankBranchPrefixUrl` 固定为 `/prefund/bankBranch/`。

## 问题根因
- `Supervisebank/:tableid` 路由名不含 `commercial`，原先动态判断会误走 `estate` 路径导致 404
- 同页面删除、批量新增接口早已使用 `prefund`，现已对齐

## detail.vue 改动
- 将 `bankBranchPrefixUrl` 固定为 `/prefund/bankBranch/`，不再根据路由判断 `commercial`，统一请求 `POST /prefund/bankBranch/list`
- `getList` 由 `pageUnionBank` 改为 `POST ${bankBranchPrefixUrl}list`，参数沿用 `queryParams`（含 `bankBranchId`）
- 表格 `row-key` 改为 `bankBranchManageId`（与删除/多选逻辑一致）
- 左侧监管银行树 `getBranch()` 仍用 `pageUnionBank`，未改动

## WdmcDialog.vue 改动
- 弹窗列表改为 `POST ${bankBranchPrefixUrl}list`
- 去掉 `isSupervisionBank: '1'` 覆盖，保留 `isSup` 相关参数

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：superviseBank/detail.vue、WdmcDialog.vue、cbyh/components/YhwdTable.vue、cbyh/index.vue、jgyh/yhwdgl.js、jgwd/index.vue、api/system/unionBank.js、cbyh/components/WdmcDialog.vue、superviseBank/index.vue、superviseBank/components/YhwdDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：f9ae239b-1970-4f62-b9f6-43dcba0723b3、c3f3c00e-8252-4a2c-ac62-969e7898c321

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervise_bank_fix",
  "source_extraction_id": "690db916035b49d8a2baa74ec2c78899",
  "version": 2,
  "memory_type": "entities"
}
-->