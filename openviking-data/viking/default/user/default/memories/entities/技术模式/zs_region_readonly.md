# zs-region-select 只读页区划编码回显
苏住房G 中区划由上游页面决定、本页只读时，误用 zs-region-select 会导致输入框回显 6 位编码而非名称。

## 问题根因
- zs-region-select 选项来自平台 areas 树（当前账号可选范围），非本页携带区划。
- 当 form.regionCode 不在 regionOptions 时，el-select 拿不到 label 便把原始值当文本显示，组件已挂载但数据源不匹配。

## 解决方案
- 只读场景改用 zs-select + 即时生成选项数组 regionDisplayOptions = [{ dictValue: regionCode, dictLabel: regionName || 反查 allAreas 名称 }]，配 disabled。
- 同步补全 regionName，保证保存时编码仍有值。
- 需用户自选区的表单页才用 zs-region-select（069e9d4 后值语义统一为区划编码）；验收 disabled 应显示「高新区」而非数字。

## 验证与归属
- 验证：会话 99982c86（基线 f4fae14）用户报 regionCode 无值、回显成数字；改 zs-select + regionDisplayOptions 并补 regionName。
- 涉及文件：system/regionBankAuth/detail.vue、utils.js、zs-region-select.vue；所属项目：苏住房G。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_region_readonly",
  "source_extraction_id": "0636d5a52f5e4109813cca86a9966dbb",
  "version": 1,
  "memory_type": "entities"
}
-->