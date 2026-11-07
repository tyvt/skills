# 价格备案备注整行宽度修复
苏州市房地产监测V3 价格备案→基本信息「备注」栏已修复为横向铺满整行。

## 原因
- 详情页 Headline 内表单走 `detail-from-container` 的 flex 三列栅格（`src/styles/detail-form.scss`）
- 备注若单独放第二个 `el-row` 或列未明确整行，易被当普通 `lg:8` 列导致只占约一列宽

## 修改内容
- 在 `recordPriceMngSuzhou/detail.vue` 与 `changeDetail.vue` 中，把「备注」并入基本信息主 `el-row`，去掉单独备注行
- 使用 `el-col v-bind="FORM_COL_FULL"` 并加 `zs-form-col--full`，与全局详情表单整行规则一致
- `maxlength` 调整为 2000（与截图 `0/2000` 一致；若后端限制不同需再改）
- 查看态仍由 `buildBaseContentInfo` 的 `DETAIL_COL_FULL` + `textarea` 渲染，无需改动

## 验证与归属
- 涉及文件：`detail-form.scss`、`recordPriceMngSuzhou/detail.vue`、`changeDetail.vue`、`detailLayout.js`
- 所属项目：苏州市房地产监测V3；来源会话：6c62a4c4-bc24-4586-99f8-53be4cf0f870
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_remark_fix",
  "source_extraction_id": "31186a8f7ee640d1ae7c16b5a1e5ae2a",
  "version": 1,
  "memory_type": "entities"
}
-->