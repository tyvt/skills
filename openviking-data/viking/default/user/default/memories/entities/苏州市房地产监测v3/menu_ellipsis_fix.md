# 菜单管理列表列省略号修复
修复了苏州市房地产监测V3中「菜单管理」列表菜单名称、权限标识、路由地址、组件路径被省略号截断的问题。

## 问题根因
- src/views/system/menu/index.vue 底部页面样式对单元格强制 white-space: nowrap + text-overflow: ellipsis，长名称被裁成省略号。

## 修复方案
- 上述四列关闭 :show-overflow-tooltip="false"，不再只靠悬停 tooltip 看全文。
- 仅对第 1、3、4、5 列改为 white-space: normal + word-break: break-word，在列宽内换行显示完整内容。
- 排序、字典、操作列保持原样。

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：src/views/system/menu/index.vue、zs-table-column.vue。
- 所属项目：苏州市房地产监测V3；来源会话：72843b32-55a1-45bf-be49-4196528a7cf8。
- 验证：刷新菜单管理页查看；仍窄可反馈期望「加宽列」或「横向滚动」。

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3",
  "name": "menu_ellipsis_fix",
  "source_extraction_id": "844cdb82624f4fef9399a4f794b17314",
  "version": 1,
  "memory_type": "entities"
}
-->