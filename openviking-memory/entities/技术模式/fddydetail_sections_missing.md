# fddydetail.vue 漏配贷款区块与联系方式
`fddydetail.vue` 的 `sections` 仅配三项遗漏贷款额度等5区块，且联系方式仅读 `contact` 致 `phone`/`mobile` 显示 `-`。

## 问题根因
- `sections` 仅配置三项，遗漏贷款额度等5个区块
- 联系方式仅读取 `contact` 字段，导致 `phone`/`mobile` 显示 `-`

## 解决方案
- 补全5区块并优先解析 `phone`、`mobile`、`businessHours` 支持拨号，回退 `contact`

## 验证与归属
- 验证证据：src=cursor session=32625b00-1426-42c0-b698-3bad3d6cb027
- 涉及文件：ZsRichText.vue、bankDetail.vue、pages.json、fddydetail.vue、houseLoanGuide/index.vue、transaction.js、bankList.vue、sfb.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：32625b00-1426-42c0-b698-3bad3d6cb027；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fddydetail_sections_missing",
  "source_extraction_id": "3a59079b73a04c218cfc0817a391dccd",
  "version": 1,
  "memory_type": "entities"
}
-->