# 苏住房C页脚ZsPageFooter布局
苏住房C小程序的ZsPageFooter组件已改为普通文档流布局，随各Tab页内容滚动至底部、TabBar上方显示。

## 修复调整
- ZsPageFooter移除`tab`属性与`position: fixed`样式，仅保留普通文档流
- 5个Tab入口页移除`<ZsPageFooter tab />`
- 各Tab子组件在`tab-bar-placeholder`上方恢复`<ZsPageFooter />`
- `tab-bar-placeholder`高度恢复为56px，仅预留TabBar空间

## 显示效果与归属
- 落款随页面内容滚动，滚到底部、TabBar上方可见：`苏服办 本服务由苏州市住房和城乡建设局部门提供`
- 涉及文件：ZsPageFooter.vue、pages.json、AboutUs.vue
- 验证证据：extracted source=cursor project=苏住房C；来源会话ID：196cd91b-26fc-4830-a88a-879bd91058a1

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zs_page_footer_layout",
  "source_extraction_id": "30a2036c9e1f47b7b6a75df36df72229",
  "version": 1,
  "memory_type": "entities"
}
-->