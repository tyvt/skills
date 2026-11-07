- 分包静态资源不可跨包访问：静态资源引用须收敛至本分包内或提至公共目录，避免跨包限制导致渲染层 Failed to load 错误。
- 案例：`DecisionList.vue` 跨包引用 `/pages_vote/static/images/house_szf.png`（实际位于 `pages_owner/static/images/`）致图标加载失败，须修正资源路径至本包。
- 案例：`pages_benefit` 分包 11 处静态资源跨包访问触发渲染层网络层 Failed to load 错误。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "subpackage_static_resource",
  "source_extraction_id": "4dbe334130d741aa8c86c1e62c643463",
  "version": 1,
  "memory_type": "preferences"
}
-->