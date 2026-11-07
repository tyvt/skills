# 业主辖区小区列表布局修复
苏住房C 小程序 `pages_owner/community/info/index.vue` 中辖区小区列表因 flex 布局导致封面图被长地址挤压，已修复。

## 问题原因
- `.detail_item` 使用 flex 横向排列，但封面图未禁止收缩
- 长地址会把左侧图片横向挤压变窄，布局失衡

## 修复内容
- `.link-icon` 增加 `flex-shrink: 0`，封面图固定为 100px × 76px
- `.item_bottom` 增加 `flex: 1; min-width: 0`，文字区域占满剩余空间并正确换行
- `.item_address` 增加 `word-break: break-all`，长地址自动换行而不撑开布局

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_owner/community/info/index.vue`、`components/ZsImage/ZsImage.vue`、`pages_owner/subdistrict/info/index.vue`、`pages_owner/company/info/index.vue`
- 来源会话ID：1db8ec36-d2b1-4f40-9ca7-140c53112d51
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "community_list_fix",
  "source_extraction_id": "3161c89232f84826875c751332dafd48",
  "version": 1,
  "memory_type": "entities"
}
-->