# 预售许可申请历史查看跳转修复
苏州市房地产监测V3 中预售许可申请历史「查看」跳转逻辑已修复，不再出现「页面未授权或不存在」。

## 改动说明
- `PermitHistoryPanel.vue`：`handleView` 不再使用硬编码 `/presale/permit/:id`
- 改为 `buildNavigationByFilePath('presale/permit/detail', …)`，与列表「查看」、方案页跳转同一套路由解析方式
- 找不到菜单时提示与 `detail.vue` 的 `openPlanPage` 一致：`msgError('没有授权相关菜单，请联系管理员')`

## 验证要点
- 已备案/已注销详情 → Tab「预售许可证申请历史」→ 任一行「查看」：应进入对应申请的只读详情（`formMode=view`）
- 若仍报错，核对账号是否配置了隐藏菜单 `presale/permit/detail`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`PermitHistoryPanel.vue`、`detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：2cbd9c2f-a7a8-42bc-973a-d8fe877023a9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_view_jump",
  "source_extraction_id": "3fa26587d60f4b14a861e10b9d4f9839",
  "version": 1,
  "memory_type": "entities"
}
-->