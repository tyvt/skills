# 业主决策模块页面加载统一处理
苏住房C「慧物业」业主决策模块相关页面已统一改为先显示 loading、所有接口返回后再渲染，避免 if/else 分支闪烁。

## 通用方案
- 新增 hooks/usePageLoading.js：进入页面立即 uni.showLoading
- 用 Promise.all 等待全部接口完成
- 完成后 loaded = true 并 uni.hideLoading
- 页面根节点用 v-if="loaded" 控制渲染

## 涉及的页面与等待接口
- decision/index.vue：字典 + 列表
- common/DecisionResult.vue / optional/DecisionResult.vue / sort/DecisionResult.vue：决策结果
- common/ResultStatistics.vue / optional/ResultStatistics.vue / sort/ResultStatistics.vue：字典 + 详情 + 图表
- detail.vue：3 个字典

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：hooks/usePageLoading.js、decision/index.vue、common/DecisionResult.vue、optional/DecisionResult.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：36ef278a-92bd-4d36-9fb4-c7e97ddf8d37；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_page_loading",
  "source_extraction_id": "7078ae91ae8c4d12956f0dcd2e68e7a4",
  "version": 1,
  "memory_type": "entities"
}
-->