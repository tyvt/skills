# 审核详情页刷新丢dataId致节点key空
昆山市民审核详情页刷新后节点key为空的bug根因与修复记录。

## 问题根因
- `examineDetail.vue` 的 `getDetail` 未合并 URL 参数 `dataId`，刷新后 `init` 传参不全
- `onMounted` 与 `watch` 竞态致 `keyNode` 未就绪
- 全局响应拦截器在权限校验类接口失败时仍 `showError` 弹出报错提示，用户看到「节点key不能为空」

## 修复方案
- `examineDetail.vue` 合并 `dataId`/`busCode`，操作按钮区域增加 `dataId` 判断，数据就绪后再渲染
- `operationBtn.vue` 改用 `immediate:true` 单一 watch 避免重复初始化

## 验证与归属
- 验证证据：src=昆山市民/005.md
- 涉及文件：src/pages_examine/components/operationBtn.vue、src/pages_examine/examineDetail.vue、src/api/modules/examine.js、src/request/index.js、src/pages_examine/components/approveDialog.vue、src/pages_examine/examineList.vue、src/pages_examine/components/examineItem.vue、src/pages_examine/components/designateDialog.vue
- 所属项目：昆山市民；来源会话ID：dd9f56a9-de5b-41cb-b05a-a959b8092576；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "examine_detail_dataid_bug",
  "source_extraction_id": "f93ad767e88948b5b1deeea32b5a0798",
  "version": 2,
  "memory_type": "entities"
}
-->