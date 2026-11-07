# 知识库筛选不生效修复
泰兴小程序员工端知识库筛选修复完成，改动集中在 src/staff/pages/knowledge/index.vue。

## 修复内容
- 确认逻辑：未选分类时提示「请选择知识库分类」，不关闭弹层、不重新加载；通过 resolveDraftSelection() + resolveCategory() 归一化选中节点，与「查看全部」一致
- API 参数：loadKnowledge 改为 getItemCategoryId(activeCategory.value)，避免仅有 categoryId 字段时参数被拦截器静默丢弃
- 交互与事件：分类行、重置、确定、遮罩统一为 @tap；确定按钮由原生 <button> 改为 <view>，避免小程序浮层内点击异常
- 选中状态：backToFilterRoot 不再清空 draftSelected，下钻后点「全部」再确定仍有效；底部增加「已选：xxx / 未选择」提示；面包屑高亮当前选中分类（isDraftPathCrumbActive）

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/staff/pages/knowledge/index.vue、src/staff/utils/knowledgeCategory.js、src/staff/api/knowledge.js、src/pages/staff/workbench/index.vue、src/staff/utils/response.js
- 所属项目：泰兴小程序；来源会话ID：95a61c6a-dd2f-492d-af4c-e29fff661c43
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "knowledge_filter_fix",
  "source_extraction_id": "6f0c4d0ce25a43908258dc2fb65fa244",
  "version": 1,
  "memory_type": "entities"
}
-->