# 旧页面路径兼容修复
苏住房C小程序消息中心点击公告详情时因后端返回旧路径导致navigateTo找不到页面，新增统一兼容函数修复。

## 问题根因
- 公告详情页已迁至`pages_main`分包，实际注册路径为`pages_main/announcement/detail`
- 消息中心走后端返回`msgUrl`仍是旧路径`pages/announcement/detail?...`，导致跳转失败

## 修复方案
- 新增`normalizeLegacyPageUrl`函数映射旧前缀到新分包路径
- 在`route-map.js`新增函数，`index.js`的`goto`/`openPage`跳转前自动修正
- `message.vue`消息列表使用同一函数处理`msgUrl`

## 涉及文件
- `zhi2-mobile-shimin/src/utils/route-map.js`
- `zhi2-mobile-shimin/src/utils/index.js`
- `zhi2-mobile-shimin/src/pages_main/message/message.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：01893cc7-e8de-4690-b98f-18f412beec9e

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "normalize_legacy_page_url",
  "source_extraction_id": "9b70ab6d8b214640a33a8865f462425d",
  "version": 1,
  "memory_type": "entities"
}
-->