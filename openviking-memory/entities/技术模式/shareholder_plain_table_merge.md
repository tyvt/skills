# 股东变更对比表合并渲染模式
苏州市房地产监测V3 中 `ShareholderPlainTable.vue` 新增 `beforeRows` prop 支持变更前/后数据合并对比，`ShareholderChangeSection.vue` 同步改造。

## 功能要点
- 新增 `beforeRows` prop（变更前数据），传了且与 `rows` 有差异 → 合并模式，否则维持原单表渲染
- 合并态首列「状态」tag（宽 100，左对齐），其余 9 个业务列不变，去掉序号列
- `mergedRows` 对齐算法：按 `shareholderId` → `idNumber` → 股东名逐级降级匹配
- 命中→拆「变更前」/「变更后」两行；仅 after 有→`新增`；仅 before 有→`删除`

## 样式与兼容
- formatter 换成空值安全版（合并后单侧字段为 `undefined`，原 `percentFormatter` 会输出 `undefined%`）
- tag 配色：变更前灰 `#909399`、变更后蓝 `#2f6bff`/`#eaf0ff`、新增绿、删除红

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：ShareholderPlainTable.vue、ShareholderChangeSection.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：f1fe42af-7198-4586-90dc-5a34ed97f963；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shareholder_plain_table_merge",
  "source_extraction_id": "6e905a64a52f47dcb6f6e7f89e7320b7",
  "version": 1,
  "memory_type": "entities"
}
-->