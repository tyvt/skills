# OrgTypeDialog标题栏修复
苏州市房地产监测V3 的 `zhi2-web-admin/src/views/components/OrgTypeDialog.vue` 修复了标题栏显示异常问题。

## 问题根因
- `OrgTypeDialog` 使用 `header=""`，`zs-dialog` 仍渲染标准标题栏（含关闭按钮和 `--zs-dialog-header-padding-y: 16px` 内边距），标题写在正文里，出现「只有关闭钮、高度又不对」的细条 header

## 修改内容
- `header="请选择机构类别"`：标题走公共 header 区域
- `form-layout="single"`：替代手写 `width="500px"`，宽度仍为 500px
- 去掉正文重复标题，并删掉针对空 header 的 `:deep(.dialog-box)` 覆盖
- 对齐公共 `zs-dialog` 用法（与 `ChangePasswordDialog`、`loginDialog` 等一致）

## 涉及文件与归属
- 涉及文件：`zhi2-web-admin/src/views/components/OrgTypeDialog.vue`
- 所属项目：苏州市房地产监测V3；来源会话：665275a8-6e9d-4447-98ff-44b7d4873891
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "OrgTypeDialog标题栏修复",
  "source_extraction_id": "3c901ff2a89541c4a202cb2d38a47a95",
  "version": 1,
  "memory_type": "entities"
}
-->