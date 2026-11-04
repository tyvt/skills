# 多议题表决项查看弹窗选项配置修复
惠山二期G 后台多议题表决项「查看」弹窗缺少「最多选择项」且「选择项」命名不一致的修复记录。

## 问题根因
- `autonomy/multiply/components/VotingItemsDialog.vue` 查看模式用 `DetailTemplate` 的 `contentInfo` 渲染字段
- 原仅配置一条误标为「选择项」的项，只绑定 `minOptionNum`，未绑定 `mixOptionNum`（最多选择项）
- 与编辑/新增表单的「最少选择项」「最多选择项」不一致

## 修复方案
- 将「选择项」改为「最少选择项」（`minOptionNum`）
- 新增「最多选择项」（`mixOptionNum`）
- 两项均在多选（`optionType === '1'`）时显示，与编辑表单一致

## 验证与归属
- 重新打开多议题表决项「查看」弹窗，多选议题应能看到最少、最多选择项；本地 dev 保存后热更新即可验证
- 涉及文件：`zhi2-web-admin/src/views/autonomy/multiply/components/VotingItemsDialog.vue`
- 所属项目：惠山二期G；来源会话：5f4bd9ba-c920-4b33-ab4f-5d2525ca5150；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "multiply_voting_items_view_fix",
  "source_extraction_id": "d85cbb648e8e403383b0530c413db0a8",
  "version": 1,
  "memory_type": "entities"
}
-->