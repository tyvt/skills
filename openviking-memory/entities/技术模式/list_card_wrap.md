# 列表涉及表格和分页（使用 list-card）
遵循 ListTemplate.js，列表页面使用 `<div class="list-card">` 来包裹操作区域 + 表格 + 分页（搜索在外部）。

## 描述
- 137 个 index.vue 文件应用了以 `<div class="list-card">` 包裹操作区域 + 表格 + 分页的结构。
- 搜索位于 list-card 外部。

## 实现
- 脚本 `zhi2-web-admin/scripts/wrap-list-card.mjs` 获取 `<script>` 之前的最后一个 `</template>`。
- 通过最靠后的闭合标签自动关闭 `zs-pagination`，使用 negative lookahead 以避免与 `</zs-table-column>` 混淆。

## 文件与来源
- 涉及文件: ListTemplate.js; scripts/wrap-list-card.mjs; 多个 index.vue (property/serviceItem, building/unit, article/components, benefit/pubManagementOrg, property/bankReceiptApply, property/complex, building/building).
- 验证证据: cursor session=2a132670-9deb-4220-9d16-a2853aa45068.

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：2a132670-9deb-4220-9d16-a2853aa45068


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_card_wrap",
  "source_extraction_id": "569b09638b2b4de39d502b43e3f6f15e",
  "version": 1,
  "memory_type": "entities"
}
-->
