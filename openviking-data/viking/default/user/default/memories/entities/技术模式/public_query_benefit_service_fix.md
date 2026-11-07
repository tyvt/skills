# 经营资产信息模块按接口动态显示（苏住房G）
苏住房G 项目 publicQuery/complex/detail.vue 改为调用接口动态控制“经营资产信息”模块显示。

## 改动内容
- 移除原 `projectId != 'suzhufang'` 判断，改为 `v-if="showBenefitService"` 控制显示
- 新增状态变量 `showBenefitService`（默认 false）
- `mounted` 调用 `/services/health` 传参 `serviceName: 'benefit'`
- 响应 `response.data` 非空数组则显示，空数组或异常则隐藏（如 `data: []` 隐藏 149-156 组件）

## 涉及文件
- `zhi2-web-admin/src/views/publicQuery/complex/detail.vue`

## 验证与归属
- 所属项目：苏住房G；来源会话：e79efb3d-dc6f-4fb7-b9f6-254a469958ba
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "public_query_benefit_service_fix",
  "source_extraction_id": "b658824e88774344b10a90357779d9e4",
  "version": 1,
  "memory_type": "entities"
}
-->