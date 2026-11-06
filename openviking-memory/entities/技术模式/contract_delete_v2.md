# 合同版本与范本删除逻辑按规范简化（苏州市房地产监测V3）
苏州市房地产监测V3 将合同版本管理、合同范本列表页删除逻辑按最新规范简化，统一由 mixin 发送删除请求。

## 列表页修改
- versionManagement/index.vue 与 template/index.vue：保留 deleteType: 'v2'
- 移除冗余的 deleteParamKey 和自定义 deleteRequest
- 删除请求由 table.js mixin 自动发送：POST /delete

## 请求参数
- 合同版本：body 为 { versionIds: [...] }
- 合同范本：body 为 { templateIds: [...] }

## 验证与归属
- 涉及文件：versionManagement/index.vue、template/index.vue、table.js、contract-version-helpers.js
- 新增 E2E 删除用例（contract-version-helpers.js）
- 所属项目：苏州市房地产监测V3
- 来源会话：ea20ee6f-c842-40af-b9b5-4aec09b7486e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_delete_v2",
  "source_extraction_id": "bf450a2d11c2459da691fafe70ea3219",
  "version": 1,
  "memory_type": "entities"
}
-->