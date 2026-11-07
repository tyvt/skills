# z-paging全屏固定层须用#top插槽放页头
苏住房C小程序z-paging组件全屏固定定位会盖住外部搜索框，页头必须移入其#top具名插槽。
## 问题现象
- 首页→视频看房页搜索框被列表盖住，同类易现于存量房等z-paging列表页
- 搜索框在DOM中但被覆盖，无顶部预留区域
## 根因
- z-paging自带position:fixed+撑满视口，ZsSearch写在其外层兄弟位置被压上层
- 改z-index治标不治本，搜索框不占布局流，滚动时被顶穿
## 解决方案
- 将搜索框等常驻页头移入z-paging的#top插槽，由列表统一预留顶部高度
- 参考同目录goodProject/index.vue结构，不另写fixed容器
- 改完重编译小程序确认搜索框在列表上方且滚动正常；此类UI消失先查是否漏#top/#bottom插槽
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话4c88e3b6（2026-07-22，基线62fd49e）截图反馈搜索框被覆盖，结论移入#top插槽修复
- 涉及文件：pages_transaction/houseVideo/index.vue、components/ZsSearch/ZsSearch.vue、pages_transaction/stockHouse/index.vue、pages.json
- 所属项目：苏住房C；来源会话ID：4c88e3b6-b478-4a11-8f21-8050ecd743a5；代码基线：62fd49e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zpaging_top_slot_bug",
  "source_extraction_id": "a68f950bba1b44e9a14c8d4a241c865f",
  "version": 1,
  "memory_type": "entities"
}
-->