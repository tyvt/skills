# 预售注销与许可模块栅格偏移修复
苏州市房地产监测V3 修复预售注销（permitCancel）与预售许可（permitExtend）详情页中「统一社会信用代码」因前一行占满 24 栅格导致换行后从第 1 列排起、无法与上行第 3 列纵向对齐的问题。

## 问题根因
- 「行政区划 + 项目坐落（占 2 列）」一行占满 24 栅格后，「统一社会信用代码」换到下一行仍从第 1 列开始排，无法与上一行第 3 列（如「项目名称」「总户数」）纵向对齐

## 修复方案
- 查看态：在 DetailTemplate 增加 gridOffset，注销详情通过 buildCancelBasicInfoView 为「统一社会信用代码」设置 gridOffset: { lg: 16 }，使其落在第 3 列
- 栅格常量与预售许可模块一致（lg: 8 / lg: 16）
- 编辑态：补上「预售批次」与查看态同为第一行三列（许可证号 / 批次 / 项目名称）
- 编辑态第二行：行政区划 + 项目坐落（16）；第三行：大屏下用 lg=16 占位 + 统一社会信用代码（lg=8），对齐第 3 列

## 验证与归属
- 涉及文件：presale/permitCancel/detail.vue、presale/permitExtend/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：db3f4214-4b5b-4cbc-b081-3c46c8cde75a；代码基线：none
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "permit_cancel_fix",
  "source_extraction_id": "ef4db781436145ec93f7842d9de5a47f",
  "version": 1,
  "memory_type": "entities"
}
-->