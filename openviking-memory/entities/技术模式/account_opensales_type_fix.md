# 监管协议开户账户详情页opensalesType识别修复
苏州市房地产监测V3 中修复 view 模式下开户/销户类型识别不稳定导致字段缺失的问题。

## 问题原因
- view 模式 `getDetail()` 用接口数据整表覆盖 `form`，接口未返回 `opensalesType` 时无法识别 `ACCOUNT_OPEN`
- 导致基本信息缺失开户通知书号、开发企业、监管账户、金额等字段，底部「银行账户查询」Tab 不显示
- 原 `syncOpensalesTypeFromRoute()` 仅在 add 模式生效，view/edit 无路由回退

## 修复内容
- 新增 computed `opensalesType`：`form.opensalesType || resolveOpensalesType($route)`，保证 UI 始终识别类型
- 扩展 `syncOpensalesTypeFromRoute()`：add 模式或 `form` 无值时从路由写入 `form.opensalesType`
- `getDetail()` 返回后补全缺失的 `opensalesType`
- 模板/计算属性统一改用 computed `opensalesType` 控制字段展示
- `resolveOpensalesType` 增加 busC 处理

## 验证与归属
- 涉及文件：`supervision/agreement/account/detail.vue`、`src/mixins/detailMixins.js`
- 所属项目：苏州市房地产监测V3
- 来源会话：5c1b8a24-76c6-4187-b758-d05c9e6ba67e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_opensales_type_fix",
  "source_extraction_id": "74dcd6685c0f46ef9abacd581112fee9",
  "version": 1,
  "memory_type": "entities"
}
-->