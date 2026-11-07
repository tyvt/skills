# Tab页落款定位修复
苏住房C移除`ZsPageFooter`的fixed固定定位，使落款回到各Tab页滚动内容最底部。

## 修复内容
- `ZsPageFooter`移除`tab`属性和`position: fixed`样式，仅保留普通文档流布局
- 5个Tab入口页移除`<ZsPageFooter tab />`
- 各Tab子组件在`tab-bar-placeholder`上方恢复`<ZsPageFooter />`
- `tab-bar-placeholder`高度恢复为`56px`（仅预留TabBar空间）

## 显示效果
- 落款随页面内容滚动，滚到底部、TabBar上方显示“苏服办 本服务由苏州市住房和城乡建设局部门提供”

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：ZsPageFooter.vue、pages.json、AboutUs.vue
- 来源会话ID：196cd91b-26fc-4830-a88a-879bd91058a1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "tab_page_footer_fix",
  "source_extraction_id": "0632a595a1fc4cbdb2148019d9ed92c3",
  "version": 1,
  "memory_type": "entities"
}
-->