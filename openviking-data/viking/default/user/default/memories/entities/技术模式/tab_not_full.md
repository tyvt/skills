# Tab 因居中且缺少宽度而未占据全部宽度
`pages_main/my/myContract.vue` 的父容器具有 `align-items: center`，且 `tab-line` 缺少 `width: 100%`，导致 tab 未占据整个宽度。

## 问题根因
- 父容器 `.my-contract-box` 具有 `align-items: center`
- `tab-line` 缺少 `width: 100%`，未占据整个宽度

## 修正
- 在 `tab-line` 中定义 `width: 100%`
- 将 `:deep(.filter)` 改为具有全部宽度的 `flex`
- 在 `.button` 中定义 `flex: 1` 以均匀分布

## 文件与验证
- `src/pages_main/my/myContract.vue`, `src/pages/my/myContract.vue`, `src/components/commonNew/tabLine.vue`
- 另包括：`src/pages.json`, `info/index.vue`, `stockHouse/index.vue`, `onlineService/index.vue`
- 所属项目: 苏住房C (zhi2-mobile-shimin); 会话: 79b57ec7-807a-4bf3-a5c0-808a9f8fbf51

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：79b57ec7-807a-4bf3-a5c0-808a9f8fbf51


<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "tab_not_full",
  "source_extraction_id": "5a1866481797438eaa3b151fc58e6948",
  "version": 1,
  "memory_type": "entities"
}
-->
