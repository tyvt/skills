# DetailTemplate 必填星号全局移除
苏州市房地产监测V3 已完成 DetailTemplate 必填星号的全局移除与冗余配置清理。

## 核心修复
- 在 detail-template.vue 中移除 `<span v-if="item.required" class="required-mark">*</span>` 星号渲染
- 移除 LABEL_REQUIRED_EXTRA 及标签宽度中的必填预留逻辑
- 删除 .required-mark 样式
- 所有使用 DetailTemplate 的详情页（约 573 处引用）不再显示必填星号

## 文档与配置清理
- README.md 5.10 节删除 data 项 required 字段说明，避免后续误用
- 脚本清理 28 个业务文件中 DetailTemplate data 配置的 required: true（共 31 处）

## 涉及文件与归属
- 涉及文件：detail-template.vue、evaluation/assessmentPlan/detail.vue、autonomy/regulation/change/detail.vue、property/complexChange/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：df0b795f-9552-4c6b-9f39-72b1d1f13a07；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_required_star",
  "source_extraction_id": "fb319a3c5f334f2eb408bff74ee001b7",
  "version": 1,
  "memory_type": "entities"
}
-->