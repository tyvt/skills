# 发布房源页Tab栏未设flex且用span致布局异常
苏住房C 移动端 `pages_transaction/publishHouse/index` 的 `.tab-box` 未设 `display: flex` 且 Tab 用 `span`，导致挤压靠左及小程序兼容异常。

## 问题根因
- `pages_transaction/publishHouse/index` 的 `.tab-box` 未设 `display: flex`
- Tab 使用 `span` 元素，导致挤压靠左及小程序兼容异常

## 修复要点
- `.tab-box` 设 `flex + space-around`
- Tab 改为 `div` 并设 `flex: 1`
- 下划线 `transform` 改 `translateX(-50%)`

## 涉及文件
- src/pages_transaction/publishHouse/index.vue
- src/pages_transaction/publishHouse/houseList.vue
- src/pages.json
- src/pages_guard/components/customTab.vue
- src/pages_my/onlineService/index.vue
- src/components/commonNew/swiperComponent.vue
- src/pages_transaction/intention/my.vue
- src/components/ZsImage/ZsImage.vue

## 验证与归属
- 验证证据：extracted source=cursor session=46b361be-d49d-4712-aad1-88015b1ae377
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：46b361be-d49d-4712-aad1-88015b1ae377；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publishhouse_tab_flex",
  "source_extraction_id": "0b1118a667fb4be79fab1154368de06d",
  "version": 1,
  "memory_type": "entities"
}
-->