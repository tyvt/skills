
# zs-dialog 内容区宽度修复
苏住房G(zhi2-web-admin) 公共组件 zs-dialog 弹窗内容区因缺少约定布局类导致表格未撑满宽度，已修复。
## 问题原因
- 弹窗外壳：zs-dialog（默认 zs-size=medium，宽度 1300px）
- 内容区：只包了 sub-container，未使用 zs-dialog 约定的 dialog-right 布局类（参考 propertyOwnerDialog.vue）
- zs-dialog 内部为 flex 布局，缺少 dialog-right 时表格不占满内容区宽度
## 修复方案
- 将内容容器从 sub-container 改为 dialog-right sub-container，与项目其他弹窗表格保持一致
## 涉及文件与归属
- 文件：property/complex/detail.vue、property/feeDeclare2/detail.vue、property/complex/propertyOwnerDialog.vue（参考样板）
- 所属项目：苏住房G；来源会话：e1244325-7c27-4fc0-a9e4-4b9c9ddbb7b1；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "zs_dialog_width",
  "source_extraction_id": "304462af4c4c464dbde6022d75d9467b",
  "version": 1,
  "memory_type": "entities"
}
-->
