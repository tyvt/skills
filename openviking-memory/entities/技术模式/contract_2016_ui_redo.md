# 2016版合同页UI重做保留买卖表格
2016 版合同页按设计图重做版式，左侧目录+右侧白卡片，买卖双方信息仍保留表格。

## 版式改动
- `contract/index.vue` 与 `SzNav.vue` 改为左侧目录+右侧合同纸白卡片（底色 `#f7f7f7`，8px 圆角）
- `sz-contract.scss` 重写正文 15px/行高 1.95、填空框 32px 高及 `.s16-row`/`.s16-field` 布局

## 保留部分
- `chapter1.vue` 出卖人/买受人信息仍保留表格展示

## 验证与归属
- 验证证据：extracted source=zcode session=session_eda8b0c0c8753c0212f0d6d6ec1bc983
- 涉及文件：`contract/index.vue`、`SzNav.vue`、`sz-contract.scss`、`chapter1.vue`
- 来源会话ID：session_eda8b0c0c8753c0212f0d6d6ec1bc983

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_2016_ui_redo",
  "source_extraction_id": "b95348e2547a4fca98ef615e2cc3835f",
  "version": 1,
  "memory_type": "entities"
}
-->