# 门户详情弹窗宽度与字段行规则
publicPortal 租赁/信用等详情弹窗按场景分级 min-width，字段行禁止换行撑宽。

## 宽度规则
- 全局 min-width 880px 在内容少时过宽，故分级处理
- 基础弹窗改为 min-width 480px、宽度 fit-content
- 仅双列企业详情保留 min-width 880px

## 字段行排版
- 标签与值同一行展示，放不下优先加弹窗宽度而非换行
- 人员信息去掉空白机构标志占位与居中大标题，改为三行左对齐列表（姓名/企业名称/联系电话），标签定宽

## 验证与归属
- 用户反馈弹窗太宽与人员信息 UI 异常，修复均在 RentalDetailDialog.vue
- 无测试依赖被删占位
- 文件：RentalDetailDialog.vue、PortalDialogHost.vue；项目：门户；会话：27d93ce3-3f71-4fa6-a0d3-84ff40211b62；基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_dialog_width",
  "source_extraction_id": "ebc898f91d76487682d9f8c6657d78bd",
  "version": 1,
  "memory_type": "entities"
}
-->