- z-paging 默认 fixed:true 全屏固定铺开，使列表在独立滚动容器滚动，会遮挡导航栏且导致筛选栏 sticky 吸顶失效。
- 修复方式：对 z-paging 设 :fixed="false"，页面采用 flex 纵向布局加 height:100vh，列表区设 flex:1; min-height:0 仅在剩余空间滚动（参考 stockHouse/index.vue）。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "z_paging_fixed",
  "source_extraction_id": "cb3f75f43e0443d89860748e20385fe8",
  "version": 1,
  "memory_type": "preferences"
}
-->