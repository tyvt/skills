# 社区与街道信息页修复
苏住房C小程序中社区信息、街道信息页面背景断层及列表条数限制已修复。

## 问题根因
- `page`背景色未统一，上滑时背景断层
- `.info-page`使用`height:100%`且背景色`$uni-bg-color-grey`(#eee)不一致
- 社区/街道列表未限制条数

## 修复内容
- 为`page`设置背景色`#f7f7f7`，上滑背景保持连续
- `.info-page`改为`min-height: 100vh`，统一背景色`#f7f7f7`
- 社区信息（辖区小区）通过`displayList`仅展示前5条
- 街道信息（辖区社区）通过`displayCommunityList`仅展示前5条
- 数据超5条显示「查看全部」，分别跳转`/pages_owner/project/jurisdiction/index`与`/pages_owner/subdistrict/jurisdiction/index`

## 验证与归属
- 修改文件：`zhi2-mobile-shimin/src/pages_owner/community/info/index.vue`、`zhi2-mobile-shimin/src/pages_owner/subdistrict/info/index.vue`
- 项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：af66ed37-017b-4e3f-95ee-12512b07c08f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "community_bg_list_fix",
  "source_extraction_id": "dd1e2a6351994e95ac5b5cd35121b3c0",
  "version": 1,
  "memory_type": "entities"
}
-->