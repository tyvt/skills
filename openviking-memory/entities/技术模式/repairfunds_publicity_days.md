# 维修资金公示「重新公示」新增接口必须带 publicityDays
太仓G端维修资金公示详情点击「重新公示」若报系统异常，常见根因是新增接口请求体未传 publicityDays（公示天数）。

## 问题根因
- 公示详情维护公示结论后出现「重新公示」；点击若报系统异常，常见根因是重新公示走新增接口但请求体未传 publicityDays。
- 须从当前公示单/表单已维护的 publicityDays 带入提交参数，不能依赖后端默认。

## 涉及范围
- 涉及 publicity 详情、ConclusionDialog、PublicityTable 与 usage/publicity API 封装。
- 修复后提交 tag 202608141220。

## 验证与归属
- 验证：会话 29bd7c7d 用户报重新公示系统异常；诉求 2 明确「重新公示操作新增接口参数 publicityDays 未传值」。
- 涉及文件：zhi1-web-admin/src/views/repairFunds/usage/publicity/detail.vue、repairFunds/usage/publicity/components/ConclusionDialog.vue、src/api/usage/publicity.js、repairFunds/usage/fundUsageKs/components/PublicityTable.vue
- 所属项目：太仓G；来源会话：29bd7c7d-cc3f-4553-9be2-11c3a7255586；代码基线：bc8f979

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "repairfunds_publicity_days",
  "source_extraction_id": "dc704c74760d4525ac86f3177b7c0dae",
  "version": 1,
  "memory_type": "entities"
}
-->