# 监管协议终止详情查看按钮修复
苏州市房地产监测V3 的 zhi2-web-admin 中修复了监管协议终止详情里「监管范围」表格「查看」按钮误禁用的问题。

## 改动内容
- `AgreementDetailsTable.vue` 操作列「查看」原被写死在终止路由（`currentRoute === 'end'`）下禁用，与需求相反
- 已去掉 `viewButton` 上的 `disabled: () => this.currentRoute == 'end'`
- 编辑/删除已通过 `disableButton` 在终止页始终禁用，无需再禁查看
- 楼幢号链接与操作列「查看」行为一致，可打开只读弹窗「监管范围及标准详情」

## 涉及文件
- `zhi2-web-admin/src/views/supervision/agreement/jgxm/AgreementDetailsTable.vue`
- `zhi2-web-admin/src/views/supervision/agreement/jgxm/detail.vue`

## 验证与归属
- 刷新监管协议终止详情页，确认操作列「查看」为可点蓝色按钮；若不可见检查 `zjjg:xymx:detail` 权限
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：55c2b2d0-f747-4697-86d6-1bb973af1505；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervision_end_view_button",
  "source_extraction_id": "1ee14cf9ddb149ff99b2da177d5a4b29",
  "version": 1,
  "memory_type": "entities"
}
-->