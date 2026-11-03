# dict-tag 块级根节点嵌套 span 布局错乱
园区物管2.0 中 dict-tag 组件根节点是块级 div，套进 span 值容器会被浏览器拆标签重排 DOM 导致布局错乱，需改用 div 容器等修复。

## 问题背景
- 详情弹窗「标签+值」键值格中，值容器用 <span> 包 <dict-tag>，页面出现日期竖排逐字换行、右侧列被挤成极窄一条
- 根因：dict-tag 根节点是 <div>，块级元素放进 <span> 非法嵌套，浏览器自动拆标签重排 DOM，后续 flex「标签+值」不再成对；再叠加 word-break: break-all，短字符串也被任意位置拆碎

## 解决方案
- 值容器改用 <div>
- 网格列写 minmax(0, 1fr) 防止子项按最小内容宽度撑死列
- info-item 加 min-width:0 允许收缩
- word-break 用 normal + overflow-wrap: break-word 替代 break-all
- 仅含字典标签时外层包一层 inline-block 避免标签占满整格
- 同模式页面（VenueAssetDialog 等 span+dict-tag 组合）按同套路排查

## 验证与归属
- 验证：会话 f8f12066 HouseAssetDialog 展示错误，根因为 span 内嵌块级 dict-tag 被 HTML 解析器拆标签 + break-all 断词，修复为 div 容器 + minmax(0,1fr) + min-width:0 + overflow-wrap
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/components/HouseAssetDialog.vue、zhi2-web-admin/src/components/dict-tag/dict-tag.vue
- 所属项目：园区物管2.0；代码基线：7814a0c2a；来源会话：f8f12066-4a2e-407f-8919-3b1feebdc139

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_tag_nesting",
  "source_extraction_id": "8c9ff18cd576499fa45b34aa0decf72e",
  "version": 1,
  "memory_type": "entities"
}
-->