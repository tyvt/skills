# DETAIL_COL_FULL 未导入致详情页空白
regulatorOrg/detail.vue 的 contentInfo 计算属性引用了 DETAIL_COL_FULL 常量但未 import，视图态渲染抛 ReferenceError 使页面空白。

## 问题根因
- contentInfo 计算属性使用 DETAIL_COL_FULL 但文件未 import（仅 1 处使用）
- 视图态触发计算属性执行 → ReferenceError → 页面空白

## 解决方案
- 在 regulatorOrg/detail.vue 补充 DETAIL_COL_FULL 的 import
- 全面排查其余 3 个详情页同类缺失并统一补全

## 验证与归属
- 构建通过，UI 测试 9 passed，字段正常渲染
- 涉及文件：regulatorOrg/detail.vue 等 4 个详情页
- 所属项目：苏州市房地产监测V3（gitlab.zhi.com web-admin-h5）；来源会话：2026-11-02 调试会话

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "contentinfo_missing_import",
  "source_extraction_id": "b89b8ed6451e4730b1124ac28d421186",
  "version": 1,
  "memory_type": "entities"
}
-->