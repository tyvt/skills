# 小程序表决详情页内容为空：跳转前写缓存+详情页三级数据回退
苏住房C 业主表决「选项表决·我的决策」详情页空白，因列表跳详情未预写缓存且详情页纯依赖接口，需跳转侧预写+详情侧多源回退。

## 问题现象
- 「选项表决·我的决策」页点「决策详情 >」进入 optional/detail.vue 空白：列表显示决策摘要，详情却取不到，也无报错
- 详情页单纯依赖接口，接口返回选项列表为空（部分决策来自本地记录或旧接口）时页面无数据源

## 解决方案（三级回退套路）
- 跳转侧（DecisionResult.vue 的 goLatestDetail）：跳转前把摘要、签字、决策时间等写入 voteStore 与本地缓存，详情页无论如何有一份数据
- 详情侧（detail.vue）按优先级取数：1) selectOptdec 接口返回的选项列表；2) getAppRecordDetail/getDecisionRecordDetail 返回的 optionList；3) 缓存 value 摘要按「、」拆分成多条展示
- 补齐「决策信息」卡片（决策人、签字、决策时间），字段与 DecisionRecord.vue 对齐
- DecisionRecord.vue 同步同一套缓存回退逻辑，避免两入口对同一记录展示不一致
- 推广：凡「列表有摘要、详情页可能取不到同一份数据」的移动端场景，都按「跳转侧预写缓存+详情侧多源逐级回退+摘要可反解析成列表项」三件套处理，勿把详情页写成纯接口驱动

## 验证与归属
- 会话 30045e67（基线 8fc3cc5）：用户报「业主表决-选项表决：我的决策内容」详情为空，修复为 goLatestDetail 跳转前写 voteStore+缓存，detail.vue 实现三级回退并补「决策信息」卡片
- 涉及文件：src/pages_vote/decision/optional/DecisionResult.vue、optional/detail.vue、optional/DecisionRecord.vue
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "decision_detail_fallback",
  "source_extraction_id": "5bb7ea354f264d7a85462f53c9ba0596",
  "version": 1,
  "memory_type": "entities"
}
-->