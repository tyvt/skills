# 汛前检查页字段块间距修复
苏住房防汛C端 H5 修复汛前检查页「填报日期」与「出动巡查人员」字段块间距过小的问题。

## 问题根因
- 首个 `.card` 包含两个 `.field-block` 兄弟元素，普通 `.card` 没有 flex gap
- 仅 `.card.fields` 变体有 `gap:14px`，普通卡片仅靠 field-block 内部 5px 标签间距，导致两块贴在一起

## 修复方案
- 在 `src/styles/ref8443.css` 第 29 行后新增 `.ui-ref8443 .card>.field-block+.field-block{margin-top:14px}`
- 普通卡片内相邻 field-block 保持 14px 行距，与 `.card.fields` 一致，不影响已有间距

## 验证与归属
- 构建 `npm run build:h5` 成功，产物 CSS 含新规则；nginx 站点（端口 8095）实际拉取 CSS 确认包含
- 提交 `6c75508` 于 `dev` 分支，仅提交未推送，仅暂存 `src/styles/ref8443.css`
- 所属项目：苏住房防汛C端 H5；会话时间：2026-11-06

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "field_block_gap_fix",
  "source_extraction_id": "027a64f784a3488b9adc7bc9021a7415",
  "version": 1,
  "memory_type": "entities"
}
-->