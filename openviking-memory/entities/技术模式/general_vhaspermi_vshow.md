# v-hasPermi 覆盖 v-show 隐藏按钮

在 太仓G zhi1-web-admin 项目的 generalDecision/detail.vue 页面中，底部按钮使用了 v-show 和 v-hasPermi，导致冗余。

## 问题根因
- 在底部按钮上同时使用 `v-show` 和 `v-hasPermi`
- `v-hasPermi` 在有权限时设置 `display:''`，覆盖了 v-show 的隐藏效果

## 修复
- 添加了计算属性 `isSubmittedBiz`
- 替换为 `v-if` + `checkPermission()` 并合并条件

## 验证与文件
- 源会话: 3c3a27ee-5748-4f83-bd05-d3e2e69d6434
- 涉及文件: ownerDecision/detail.vue, mixins/detailMixins.js, optionDecision/detail.vue, optionDecision/index.vue, sortDecison/detail.vue, OperationContainer/index.vue, ownerDecision/index.vue, generalDecision/detail.vue
- 所属项目: 太仓G; 代码库: none

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 来源会话：3c3a27ee-5748-4f83-bd05-d3e2e69d6434


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "general_vhaspermi_vshow",
  "source_extraction_id": "e638529fe1a04b0d9c00eafeb905f6f1",
  "version": 1,
  "memory_type": "entities"
}
-->
