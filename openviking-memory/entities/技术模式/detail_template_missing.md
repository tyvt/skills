# B端DetailTemplate缺失全局排查
园区物管2.0 的 B 端不存在 DetailTemplate 组件，需全局排查引用并修复。

## 问题描述
- B 端代码库不存在 DetailTemplate 组件，相关页面引用会导致构建或运行错误

## 修复与分支
- 修复提交至 develop/v2.6.1 并合入 develop/v2.6.2 分支
- 子模块停于 develop/v2.6.2-yulin 未推远程

## 涉及文件
- 整改通知详情：src/views/evaluation/rectificationNotice/detail.vue
- 自治建议详情：src/views/autonomy/suggest/detail.vue
- 自治选项详情：src/views/autonomy/option/detail.vue
- 自治分类详情：src/views/autonomy/sort/detail.vue
- 自治多选详情：src/views/autonomy/multiply/detail.vue
- 自治监事投票详情：src/views/autonomy/election/supervisory/vote/detail.vue
- 自治业主投票详情：src/views/autonomy/election/owner/vote/detail.vue
- 组件目录：src/components/detail-template/detail-template.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：src=园区物管2.0/018.md
- 所属项目：园区物管2.0；代码基线：none；来源会话：7effa849-b94a-484d-9c96-aafece8b9d5b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_missing",
  "source_extraction_id": "00d55c383c404a0fb0e864045dac2dc7",
  "version": 1,
  "memory_type": "entities"
}
-->