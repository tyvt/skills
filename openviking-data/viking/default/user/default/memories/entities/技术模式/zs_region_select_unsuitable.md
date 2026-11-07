# zs-region-select 不适用场景改用 zs-select（苏住房G）
苏住房G 某些页面行政区域为只读展示，不应使用 `zs-region-select`，应改用 `zs-select` + 根据数据生成的选项。

## 原因
- `zs-region-select` 选项来自平台配置下的 `areas` 树（当前市/区可选范围），非列表页左侧树选中的区
- 本页行政区域在列表左侧树选好区（如高新区 `320505`）后跳转新增页只读展示，用户不能改
- 当 `form.regionCode = 320505` 但 `zs-region-select` 的 `regionOptions` 无此项时，`el-select` 找不到匹配 label，直接显示编码，导致回显异常与必填校验误报

## 修复方式
- 改用 `<zs-select :value.sync="form.regionCode" :options="regionDisplayOptions" disabled />`
- `regionDisplayOptions` 用 `regionName`（或从 `allAreas` 反查名称）生成 `[{ dictValue: '320505', dictLabel: '高新区' }]`，disabled 状态下显示名称

## 涉及文件
- zhi2-web-admin/src/views/benefit/alert/detailB.vue
- zhi2-web-admin/src/views/company/userManagement/operatorAuth/operatorAuthRangeTable.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：99982c86-0783-4c2e-a90e-818364f2c016；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_region_select_unsuitable",
  "source_extraction_id": "e4b9221bd0ea4bf6b2dde95d6d303034",
  "version": 1,
  "memory_type": "entities"
}
-->