# z-paging默认fixed盖住同屏搜索栏
苏住房C（uni-app小程序zhi2-mobile-shimin）「搜索小区」页顶部搜索框点不动、无法输入，因 z-paging 默认 fixed 全屏覆盖压住同屏搜索栏。

## 问题现象
- 「搜索小区」页顶部搜索框点不动、无法输入，看起来像搜索栏坏了
- 搜索栏与列表同屏时，搜索栏被 z-paging 的 fixed 全屏列表压在下层，点击被列表容器吃掉

## 根因
- z-paging 默认 fixed:true，将列表渲染成全屏固定定位并叠在页面其他内容之上，把同样位于顶部的搜索栏压在下层

## 解决方案
- 搜索栏与列表同屏的页面显式传 :fixed="false"，让 z-paging 回到普通文档流，配合外层 flex 纵向布局让列表吃剩余高度
- 搜索栏在 flex 中设 flex-shrink: 0，避免被列表挤压
- 配 :autoFocus="true"，进入页面即聚焦输入法，减少一次点击
- 在空状态插槽补「暂无数据」文案（z-paging 缺省图只给图不给字），与项目其他列表页样式一致
- 判定顺序：z-paging 页面里出现「某块区域点不动/被盖住」，先查 fixed，再查 z-index

## 验证与归属
- 验证证据：会话 1bbaff8b（2026-07-16，基线 77666f8）用户报「搜索小区页」搜索框无法点击并缺「暂无数据」提示
- 涉及文件：src/pages_transaction/intention/search.vue、src/components/ZsSearch/ZsSearch.vue、src/pages/common/searchPage.vue
- 所属项目：苏住房C；来源会话ID：1bbaff8b-e027-4764-86e9-41dd7092d234；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zpaging_fixed_searchbar",
  "source_extraction_id": "b914c1b571894896a474b9ab1408ca7f",
  "version": 1,
  "memory_type": "entities"
}
-->