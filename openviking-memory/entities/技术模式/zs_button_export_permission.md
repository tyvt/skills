# 列表导出 zs-button 权限配置约定
淮安物管列表页使用 zs-button 做导出时须配置 permission，否则无权限用户仍可见按钮。

## 问题根因
- zs-button 未配置 permission 时按钮始终显示，仅点击后由接口提示无权限。
- 无权限用户应在前端隐藏导出按钮而非点击后报错。

## 解决方案
- zs-button 仅配置 permission 时通过 checkPermission 控制显隐。
- 开户申请列表导出按钮增加 permission: [this.perms.export]，权限标识如 benefit:pubRegulatoryAccount:export。
- 对齐项目管理等页做法。

## 涉及文件
- zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/index.vue
- zhi2-web-admin/src/components/zs-button/zs-button.vue

## 验证与归属
- 验证：会话 1e81a46d 用户要求无导出权限时不显示导出按钮；结论缺 permission 字段。
- 所属项目：淮安物管；来源会话：1e81a46d-d7d6-4b7a-9e41-93e0635341db；代码基线：1b9f773

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_button_export_permission",
  "source_extraction_id": "1b1428061edc4326a5a704254c0befaf",
  "version": 1,
  "memory_type": "entities"
}
-->