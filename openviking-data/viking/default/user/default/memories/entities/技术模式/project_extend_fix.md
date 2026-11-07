# 项目备案详情国有投资字段解析修复
苏州市房地产监测V3 的 projectExtend 解析修复，解决国有投资金额/占比在详情页显示 `-` 的问题。

## 原因
- 国有投资金额（`prjCountryFee`）、国有投资占比（`investCountry`）实际在接口 `extend`（JSON 字符串或对象）或 `projectExtend` 里
- 原 `detailCallback` 只读 `projectExtend`，后端若只回写 `extend` 则查看态 `DetailTemplate` 显示 `-`

## 修改
- 新增 `customerProject/utils/projectExtend.js`：统一从 `extend`、`projectExtend`、`projectExtendChange`、`originExtendInfo` 合并解析上述两字段
- `detail.vue`：`detailCallback` / 变更新增拉原项目时用 `assignProjectFormFields` 回写；修复 `getProportion` 缺金额时算 `NaN`
- `changeDetail.vue`：共用同一套解析；去掉会用 `undefined` 盖掉已解析值的 `projectExtendChange?.xxx` 直赋

## 验证与归属
- 刷新项目备案详情页（如「小开发自测项目1010」）确认两字段已显示
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`customerProject/utils/projectExtend.js`、`detail.vue`、`changeDetail.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：854b6afa-4257-43db-a5bb-19723cfbdf12；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_extend_fix",
  "source_extraction_id": "6a00dea484364694864f56aa0b0b9ba2",
  "version": 1,
  "memory_type": "entities"
}
-->