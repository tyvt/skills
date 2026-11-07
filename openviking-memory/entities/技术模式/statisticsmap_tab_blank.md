# 共管小区统计地图弹窗Tab空白缺陷
苏住房G效益统计地图点共管小区marker后，弹窗内7个Tab内容整块空白，但单独页面正常。
## 根因
- overviewContent.vue用terminalTypeReady套v-if，terminalType为null时整块不渲染且无重挂时机
- 各Tab pane复用同一activeContentValue做绑定/key，多pane撞key导致切换串味或不渲染
- G端传:skip-fetch="isGTerminal"，地图弹窗在G端不发请求，无数据与无请求界面一致
## 解法
- 去掉terminalTypeReady的v-if拦截，改watch terminalType并在延迟就绪时bumpTabKey重新挂载
- Tab绑定按menu.value各自独立，不再共用activeContentValue
- 取消G端skip-fetch，地图弹窗统一走真实接口
- 项目主键统一为resolvedProjectId = complexId ?? projectId ?? sourceData.projectId，无主键渲染el-empty「暂无小区数据」
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验收看Network是否发出selectOperatingAssetsCategory等standingBook请求
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/overviewContent.vue、operatingAssets.vue、index.vue
- 所属项目：苏住房G；来源会话：59f13d6d-cf6d-464d-b961-060063675ca1；代码基线：3c282a5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "statisticsmap_tab_blank",
  "source_extraction_id": "dcd170cd1ed947ccac43a5f904fd01c7",
  "version": 1,
  "memory_type": "entities"
}
-->