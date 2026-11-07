# 共管小区弹窗 Tab 内容空白修复
苏住房G(zhi2-web-admin) 共管小区弹窗 Tab 内容空白，因 terminalTypeReady 拦截与 Tab 绑定共用所致，已修复并通过本地构建。

## 问题根因
- terminalTypeReady 对子组件 v-if 拦截，terminalType 为 null 时整块空白
- G 端走 :skip-fetch="isGTerminal" 导致地图弹窗未走真实接口
- 多 pane 共用 activeContentValue 与重复 key

## 修复方案
- overviewContent.vue：移除 v-if 拦截；取消 G 端 skip-fetch；按 menu.value 重构 Tab 绑定；新增 resolvedProjectId = complexId ?? projectId ?? sourceData.projectId；监听 terminalType 变化 bumpTabKey 延迟重挂载
- index.vue：openProjectOverview 优先使用 complexId
- operatingAssets.vue 同步改动；共改 3 个文件，本地 npm run test 构建通过

## 涉及文件与归属
- 文件：benefit/statisticsMap/overviewContent.vue、index.vue、operatingAssets.vue
- 所属项目：苏住房G；来源会话：59f13d6d-cf6d-464d-b961-060063675ca1

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "statistics_map_tab_blank_fix",
  "source_extraction_id": "7fa17d8bd2df458083f43c28cf14a90a",
  "version": 1,
  "memory_type": "entities"
}
-->
