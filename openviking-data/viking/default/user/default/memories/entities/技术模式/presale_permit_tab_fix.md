# 预售许可详情页 Tab UI 修复
苏州市房地产监测V3 项目修复了预售许可详情页顶部与底部 Tab 的 UI 样式不一致与标题重复问题。

## 问题原因
- 页面使用了 `el-tabs`，与项目统一的 `zs-tabs` 不一致
- 在 `zs-form` 内嵌套时，Element UI 激活下划线错位、间距异常

## 修复内容
- 顶部页签（基本信息/申请历史/委托合同）：`el-tabs` → `zs-tabs type="line"`，并通过 `hide-headline` 去掉面板内重复标题
- 底部页签（预售楼幢列表/预售房屋列表）：同样改为 `zs-tabs type="line"`，下划线与文字对齐

## 涉及文件
- `detail.vue`
- `PresaleBuildingSection.vue`
- `PermitInfoPanel.vue`
- `PermitHistoryPanel.vue`
- `PermitEntrustPanel.vue`

## 验证与归属
- 刷新页面后两处 Tab 下划线应与文字对齐，样式与物业费账单列表一致，无标题重复
- 所属项目：苏州市房地产监测V3；来源会话：9c0e22a3-3c86-4b2c-8471-7336419f1966；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_permit_tab_fix",
  "source_extraction_id": "70ada2145f094d8f8e1450f3ecb4f669",
  "version": 1,
  "memory_type": "entities"
}
-->