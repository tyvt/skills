# 账单两段式导入约定
园区物管2.0 的 spFeeBill 账单导入采用「/import 拿 importId 预览，/import/confirm 收尾」的三步流程。

## 流程说明
- 第一步选 complexId/feeTypeId/feeStandardId 条件
- 第二步 POST /property/spFeeBill/import，从 data 取 importId、successCount/failCount、errorSummary、errorReportUrl、bills
- 第三步预览 bills（与 errorData 合并，行级用 valid/errorMsg 判失败并动态加「校验错误」列，行唯一标识用 rowNum 作 _rowKey）
- 最后 POST /import/confirm { importId, complexId, feeTypeId, feeStandardId }

## 预览与容错规则
- 预览放行：importId 存在 + 有预览数据 + 无 errorReportUrl，即使 failCount>0 也允许预览（错误第三步提示）
- 返回 errorReportUrl 时阻断预览，要求下载错误报告后重新上传
- 接口未返回 complexName 时用第一步选中区域名称补全，feeCycle 文本缺失回退原字段

## 关键事实
- 导入接口先做行级校验落临时批次，confirm 才真正入库，前端须按 importId 串联否则重复解析或入库失败
- 所属项目：产品2.0；来源会话：a10aadfb-a1ed-4720-8d24-06f8099d14c1；代码基线：a10aadfb

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_bill_import",
  "source_extraction_id": "065add8eab774fc2a55b7e59c38e0390",
  "version": 1,
  "memory_type": "entities"
}
-->
