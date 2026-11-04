# publicNotice未解码URL参数致标题乱码
苏住房C 移动端 `publicNotice/index.vue` 跳转时 `label` 经 `encodeURIComponent` 编码，但 `publicNotice.vue` 的 `onLoad` 未解码直接设标题。

## 问题根因
- `publicNotice/index.vue` 跳转时 `label` 经 `encodeURIComponent` 编码
- `publicNotice.vue` 的 `onLoad` 未解码直接设标题致乱码

## 修复要点
- 对 `options.label` 先 `decodeURIComponent` 再设置导航栏标题

## 涉及文件
- src/pages_main/publicNotice/publicNotice.vue
- src/hooks/useUrlQueryParam.js
- src/pages_main/publicNotice/index.vue
- src/pages_my/onlineService/PolicyDetail.vue
- src/pages_owner/project/organization/index.vue
- src/utils/index.js

## 验证与归属
- 验证证据：extracted source=cursor session=d63bb909-6974-4951-ba6f-fffc81b6115e
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：d63bb909-6974-4951-ba6f-fffc81b6115e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publicnotice_decode_fix",
  "source_extraction_id": "0b1118a667fb4be79fab1154368de06d",
  "version": 1,
  "memory_type": "entities"
}
-->