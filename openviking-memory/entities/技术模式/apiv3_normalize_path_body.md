# API V3路径参数入参体全局增强
产品2.0 项目在 apiV3Normalize.js 中统一增强，将路径参数移入 body，业务代码无需逐个修改。

## 问题根因
- 原仅「看起来像数字 ID」的路径参数（isPathId）才移入 body，导致大量接口参数留在 URL，如 getByKey/qq.map.key、getBySecondVerifyLogCode/ABC123、readXml/{deployId}、calculationChart/{id}

## 解决方案
- 在 normalizeTrailingPathParams 中统一处理 4 段及以上路径：ByXxx 类动作（getByKey 等）自动推断 body 字段名不再要求数字 ID；已知单参数动作（readXml→deployId、calculationChart→decisionId、terminate→id）；多参数动作（listEffective、listReport、batchGenerateVoucher）；已规范 V3 路径（末段 /detail）跳过

## 验证与归属
- 涉及文件：apiV3Normalize.js、utils/tencentMapKey.js、utils/request.js、api/index.js；所属项目：产品2.0；来源会话：06f4b462-1a59-4d5f-b258-6f1f46290ddd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "apiv3_normalize_path_body",
  "source_extraction_id": "b03b5caf46e0410f892f1f3a0dcce3da",
  "version": 1,
  "memory_type": "entities"
}
-->