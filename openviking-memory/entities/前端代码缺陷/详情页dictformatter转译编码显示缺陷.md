# 详情页dictFormatter转译编码显示缺陷
Web后台详情页经dictFormatter转译字段偶发显示编码而非名称的缺陷与修复。
## 缺陷原因
- dictFormatter从communityOptions按dictValue找label，options来自area mixin异步接口
- created阶段发无参全量请求，详情回调带街道发一次，两请求返回顺序不定致覆盖
- detailMixins已含area mixin，页面再挂一次导致无参请求执行两次加重竞态
- 编码数字/字符串类型或首尾空格不一致致==匹配失败
## 修复方案
- 页面去掉重复挂载area mixin
- 详情回调用专用loadCommunityOptionsForDetail按当前街道拉取并写入options
- 查看模式改用带trim和统一类型比较的formatCommunityDisplay，不依赖时序
## 相关文件
- zhi2-web-admin/src/views/property/complex/detail.vue
- zhi2-web-admin/src/main.js
- zhi2-web-admin/src/mixins/area.js
- zhi2-web-admin/src/mixins/detailMixins.js
- 来源会话2bea6416-3e83-4b54-af77-1e2e56704a2a，代码基线fc994977f

<!-- MEMORY_FIELDS
{
  "category": "前端代码缺陷",
  "name": "详情页dictFormatter转译编码显示缺陷",
  "source_extraction_id": "b2f95f5cac604457913ee8b52f946b19",
  "version": 1,
  "memory_type": "entities"
}
-->