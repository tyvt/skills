# Element Plus el-radio 选中值改用 value
Element Plus 弃用 el-radio / el-radio-button 用 label 表示选中值的写法（3.0 将移除），控制台会出现 [el-radio] label act as value is about to be deprecated。

## 问题根因
- Element Plus 2.x 中 el-radio / el-radio-button 使用 label 作为选中值会触发弃用警告。
- 3.0 将移除该写法，需提前迁移。

## 解决方案
- 模板中将 label="1"、:label="dict.dictValue"、label="table" 等改为对应的 value / :value。
- 展示文案仍放在默认插槽内，不受影响。
- 存量页面需全局搜 <el-radio 与 <el-radio-button 批量替换。

## 验证与归属
- 验证证据：会话 ed53b5d6：error.ts debugWarn useDeprecated；已在 flowable、system/menu、paymentChannel、maintenance/facility 等多处批量改 label→value。补充证据：src=2-0/010.md，涉及 element-plus 官方 radio 文档、error.ts、index.ts。
- 涉及文件：zhi2-web-admin/src
- 所属项目：2-0；来源会话ID：ed53b5d6-854c-4ba8-8358-b4d73be5bd8b、f04aaad0-6d0c-450e-807c-fdf4dbf5a214；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_radio_value",
  "source_extraction_id": "d605c9e3116c40ecab3d74860b526a1f",
  "version": 2,
  "memory_type": "entities"
}
-->