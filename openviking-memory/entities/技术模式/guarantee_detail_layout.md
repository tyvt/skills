# 保函相关详情页布局调整
苏州市房地产监测V3 按截图要求调整了保函相关详情页布局，改动集中在 `RelatedBuildingsTable.vue` 与 `detail.vue`/`changedetail.vue`。

## 改动要点
- `RelatedBuildingsTable.vue`：去掉子表「明细」`Headline` 标题
- 使用 `SubTableToolbar`，将「新增 / 删除」注册到外层 `zs-tabs` 的 `.tabs-header-action`（与宗地信息、付款进度等页一致）
- 修正路由判断：原 `guaranteechange` 无效，变更详情为 `changedetail`；非 `guarantee` 路由不展示顶栏按钮，并隐藏批量选择列
- `detail.vue` / `changedetail.vue`：页签文案由「保函金额分配楼幢」改为「保函金额分配明细」，与 Tab 胶囊标题一致
- 效果：Tab 栏左侧为「保函金额分配明细」，右侧为新增/删除；表格上方不再出现「明细」标题和重复按钮区

## 验证与归属
- 验证路径：请在「保函替换资金申请」与「保函替换资金申请变更」详情页各刷新确认一次布局
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 涉及文件：`RelatedBuildingsTable.vue`、`detail.vue`、`changedetail.vue`
- 来源会话：ef5ed4c6-63e2-4fa0-a241-8cfaf1359e28；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_detail_layout",
  "source_extraction_id": "a713c3405a0b43ccbbf1e5e1e8b62543",
  "version": 1,
  "memory_type": "entities"
}
-->