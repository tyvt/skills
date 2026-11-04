# zs-region-select 从非左侧树选项回显代码
在苏住房G中，zs-region-select 的 regionOptions 来源于平台配置的区域树，而非左侧树选中的区域（例如 320505）；当 el-select 找不到匹配标签时，只读回显会显示原始代码。

## 问题背景
- regionOptions 来源于平台配置的区域树，且不包含左侧树选中的区域代码。
- 在只读回显（禁用的 el-select）中若无匹配标签，会显示原始区域代码而非名称。

## 解决方案
- 切换为绑定到 regionDisplayOptions 的 zs-select（由 regionName 或 allAreas 构建为 {dictValue, dictLabel}）。
- 通过禁用状态的 zs-select 渲染区域名称。

## 验证与归因
- 验证：苏住房G/026.md
- 文件：benefit/alert/detailB.vue, company/userManagement/operatorAuth/operatorAuthRangeTable.vue, system/regionBankAuth/detail.vue, system/regionBankAuth/utils.js, system/regionBankAuth/index.vue, mixins/detailMixins.js, mixins/form.js, system/subdistrict/detail.vue
- 项目：苏住房G；源会话：99982c86-0783-4c2e-a90e-818364f2c016；代码基线：无

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_select_code_echo",
  "source_extraction_id": "9d6a5afb1d8e4fd5a2e3955461234a78",
  "version": 1,
  "memory_type": "entities"
}
-->