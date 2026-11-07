# 未注册 zs 组件全局替换修复
苏州市房地产监测V3 项目 zhi2-web-admin 中全局替换未注册的 `zs-button-group` 与 `zs-attachment` 组件。

## 替换内容
- `zs-button-group` → Element UI 的 `el-button-group`（16 个文件）：合同模块 chooseHouseDialog.vue（2 处）、contractNoDialog.vue、saleAgencyDialog.vue；监管模块定金、退款、协议、解封等 12 个弹窗组件
- `zs-attachment` → 局部引入的 `attachmentDraw`（`contract/index.vue`），补充 `:id="basicData.contractId || contractId"` 与 `:bus="$route.meta.busCode"`

## 验证结果
- `rg "zs-button-group" src`：无匹配
- `rg "zs-attachment" src`：仅剩价格备案模块中的注释
- 相关文件无 linter 报错

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3
- 来源会话ID：da4d6410-f867-47a9-acf7-3468a014ca81

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_component_replace",
  "source_extraction_id": "b2fac9fc5d804c35866b6e7f37da4e73",
  "version": 1,
  "memory_type": "entities"
}
-->