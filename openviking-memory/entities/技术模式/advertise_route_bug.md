# 广告位查看跳转路由错误
advertiseTable.vue 的 handleView 跳转路径误写，导致 getRouterPathByFilePath 误报无权限。
## 问题描述
- 错误路径：benefit/pubAdvertiseSpaceDetail/detail（该路由不存在）
- 正确路径：benefit/pubAdvertiseSpace/detail
## 影响
- getRouterPathByFilePath 因找不到菜单授权提示无权限
## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/068.md
- 涉及文件：publicQuery/complex/detail.vue、publicQuery/complex/components/advertiseTable.vue、overviewSubTableTemplate.js、mixins/subTableMixins.js、benefit/pubAdvertiseSpace/index.vue、parkingTable.vue、utils/ruoyi.js、mixins/listMixins.js
- 来源会话：36a17d3e-c6f3-43ee-ac8c-949fca0f9cbd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "advertise_route_bug",
  "source_extraction_id": "4c9a5b08c29142c6941e338d2fd48101",
  "version": 1,
  "memory_type": "entities"
}
-->