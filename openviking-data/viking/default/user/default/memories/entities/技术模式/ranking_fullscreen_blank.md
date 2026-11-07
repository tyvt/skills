# 全屏排名列表区域空白修复
淮安物管物业管理大屏全屏时「项目负责人技能等级排名」区域未填满，底部出现大片空白，已通过弹性布局与动态计算行数修复。

## 问题根因
- rankingList.vue 列表容器写死 height:160px（约5行），全屏后左侧第三块卡片经 grid-template-rows:1fr 变高，列表高度不变致底部空白。

## 解决方案
- baseCard.vue 卡片设 height:100% + flex 纵向布局，内容区 flex:1 占满剩余高度。
- rankingList.vue 列表区域改 flex:1 自适应高度，保留 min-height:160px 作为非全屏最小高度。
- 用 ResizeObserver 根据实际高度计算可见行数，仅当数据行数超过可见行数时才启用滚动动画。
- index.vue 为排名卡片增加 ranking-card 样式，content-box 加 min-height:0 保证 grid 子项高度向下传递。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管
- 验证：刷新页面并切换全屏验证效果。
- 涉及文件：rankingList.vue、baseCard.vue、index.vue（路径 d:\repository\淮安物管\zhi2-web-admin\src\views\...）。
- 所属项目：淮安物管；来源会话：fe8e0d01-94c7-4681-a866-26e1177ed9e4；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ranking_fullscreen_blank",
  "source_extraction_id": "786ff81f84094d8eb6aa5023f40dbe21",
  "version": 1,
  "memory_type": "entities"
}
-->