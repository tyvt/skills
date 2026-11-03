# V3接口路径末段参数规范化
产品2.0 中 apiV3Normalize.js 按路径段数分级处理「路径末段当参数」问题，4 段以上全量迁移至 POST body，末段 /detail 跳过。

## 问题背景
- V3 后端要求参数放 POST body，前端仍大量写 `$get('/system/config/getByKey/qq.map.key')` 等路径参数接口
- 旧 normalizeTrailingPathParams 只搬「像数字 ID」的末段，带点号配置键、纯字母编号、多参数全被放过，导致 key 留 URL 上、后端 400
- 验收方式：刷新页面看 Network，URL 不再带路径参数、参数出现在 POST body

## 解决方案
- 在 apiV3Normalize.js 按「4 段及以上路径」统一处理，分四类规则
- ByXxx 类动作（getByKey/getByComplexId）自动推断 body 字段名，不要求数字 ID
- 已知单参数动作建表映射（readXml→deployId、calculationChart→decisionId、terminate→id）
- 多参数动作逐个建字段表（listEffective→declarationType+categoryId、listReport→planId+companyId+type）
- 末段已是 /detail 的 V3 规范路径直接跳过，避免二次改写

## 刻意不改结构
- 已规范的 /xxx/detail、无 trailing 参数的嵌套资源路径不改
- 形如 /workOrder/order/{id}/accept 的「ID 在中间、子动作在末尾」结构必须单独加映射规则，硬套通用规则会改坏
- 之后仍有 400 说明是中间带 ID 的特殊结构，需补一条专属映射

## 验证与归属
- 验证：会话 06f4b462（2026-08-25）用户指某接口 key 还在 URL 上，要求全局排查，最终扩展为 4 段以上四类规则
- 涉及文件：zhi2-web-admin/src/utils/apiV3Normalize.js、src/utils/request.js、src/api/index.js
- 所属项目：产品2.0；来源会话：06f4b462-1a59-4d5f-b258-6f1f46290ddd；代码基线：adc516a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "apiv3_path_normalize",
  "source_extraction_id": "367daf60193e4512bd7f31c6fd55c740",
  "version": 1,
  "memory_type": "entities"
}
-->