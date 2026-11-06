# 委托代售 areaCode 改为 region 对齐
苏州市房地产监测V3 的 zhi2-web-admin 完成了委托代售新增/修改接口入参 `areaCode` → `region` 的前端对齐。

## 修改内容
- `presale/entrustSale/detail.vue` 的 `normalizeDetail`：详情响应只读取 `data.region`，不再兼容 `areaCode`
- 同文件 `buildSavePayload`：新增/修改请求体发送 `region: form.region`，不再发送 `areaCode`
- `e2e/fixtures/entrust-sale-helpers.js`：E2E 断言字段列表中 `'areaCode'` 已改为 `'region'`

## 验证要点
- 委托代售相关代码已无 `areaCode` 引用，无新增 linter 报错；表单内部仍用 `form.region`，「所属区域」展示逻辑不变
- 上线后确认 `/presale/entrustSale/add`、`/update` 请求体含 `region`，`/detail` 响应返回 `region`

## 归属信息
- 所属项目：苏州市房地产监测V3
- 涉及文件：`detail.vue`、`entrust-sale-helpers.js`、`index.vue`
- 来源会话ID：74428e0b-126e-4f90-9fc3-2fbe6b27a399
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_param_fix",
  "source_extraction_id": "4c5863872528481481ed07628faa9249",
  "version": 1,
  "memory_type": "entities"
}
-->