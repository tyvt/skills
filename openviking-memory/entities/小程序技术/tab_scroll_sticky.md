# Tab首页整页上滑与搜索框吸顶套路
苏住房C「掌服务」Tab页通过合并独立滚动区为单一scroll-view并配合搜索区sticky实现整页上滑与吸顶。
## 问题场景
- 首页/Tab页要求Banner整体滚出、搜索框滚动后吸附顶部（苏住房C「掌服务」页）
- 给Banner、搜索区、功能区各套独立scroll-view会互相抢滚动，仅局部可滑
## 解决方案
- 三段合并进同一个scroll-view，获得连续上滑手势
- 搜索区写position:sticky配合top偏移，滚到顶后固定在导航栏下方，初始与Banner保留20px重叠，无需监听滚动算offset
- 搜索背景区用align-items:center仅作用于该行，左右对称padding（如0 20px），不再套整页居中
- 切换图标显示不全根因是图标容器尺寸小于图标被裁切，给32×32固定容器后居中；SVG裁切/不渲染改投PNG（icon-list.png/icon-grid.png）并补全等价三行列表样式
- 降级路径：sticky在自定义导航栏+自定义tabBar机型失效时，改「滚动事件+fixed」兼容
- 分割线间距需求放在MenuSection的variant分支加margin-top，不在业务页覆盖
## 验证与归属
- 验证：会话fb3ff994用户要求整页上滑+搜索框吸顶+图标不全修复，实现为单scroll-view+sticky+32×32容器+variant-service下.section-divider margin-top:20px
- 涉及文件：pages_tab/components/Community_Suzhufang.vue、pages_tab/components/menu/MenuSection.vue、pages_tab/static/images/service/icon-list.svg
- 所属项目：苏住房C；来源会话ID：fb3ff994-ae45-4f45-8468-aefcc1bc3ce7；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "tab_scroll_sticky",
  "source_extraction_id": "3abfd634e56b408b8fe5fc6111feb013",
  "version": 1,
  "memory_type": "entities"
}
-->