# 公告列表跳转详情标题错误修复
苏住房C 小程序 `publicNotice.vue` 列表传了 `noticeLabel` 但详情跳转未带 `label`，导致详情页显示默认标题，已修复。

## 问题原因
- 列表页 `publicNotice.vue` 传了 `noticeLabel`
- `ListIndex` 跳转详情时没带 `label` 参数
- 详情页 `detail.vue` 用了默认标题「双晒内容」

## 修复内容
- `ListIndex.vue` 接收 `noticeLabel`，跳转时带上 `label` 参数
- `detail.vue` 有 `label` 时直接作为导航栏标题（如「物业服务计划」），不再拼接「内容」
- 其他入口（公共收益、维修资金等）也会显示对应列表名称

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`publicNotice.vue`、`pages_main/publicNotice/components/ListIndex.vue`、`pages_main/publicNotice/detail.vue`、`pages.js`
- 来源会话ID：3fa76366-cf4a-4cdf-87de-dd2b1e81d2e9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "notice_label_fix",
  "source_extraction_id": "3161c89232f84826875c751332dafd48",
  "version": 1,
  "memory_type": "entities"
}
-->