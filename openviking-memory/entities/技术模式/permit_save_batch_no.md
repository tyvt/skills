# 预售许可保存漏传 batchNo 致批次缺失
苏州市房地产监测V3 中 detail.vue 的 getForm() 组装保存参数未包含 batchNo，仅页面显示用，致批次号缺失。

## 问题根因
- src/views/presale/permit/components/detail.vue 的 getForm() 组装保存参数时未包含 batchNo
- batchNo 仅页面显示用，未随表单上送

## 解决方案
- getForm() 返回对象新增 batchNo: this.form.batchNo
- 确保新增与编辑态均随表单上送批次号

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/073.md
- 涉及文件：src/views/presale/permit/components/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：01a16316-12bd-70c5-a400-765e5489bc0b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_save_batch_no",
  "source_extraction_id": "3d4e9b6847ad45a4ac86a62e72186090",
  "version": 1,
  "memory_type": "entities"
}
-->