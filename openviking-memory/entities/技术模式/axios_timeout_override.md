# 单接口超时覆盖套路
在产品2.0中，针对个别慢接口使用 axios 请求级 timeout 配合 enums 常量覆盖全局100秒默认超时，避免调大全局超时失去保护。

## 问题描述
- 全局 axios 超时默认为100秒，大文件导入接口（如 /property/spFeeBill/import）处理超时会被掐断
- 调大全局超时会导致所有接口失去超时保护，不可取

## 解决方案
- 在 enums.js 定义语义化常量 IMPORT_REQUEST_TIMEOUT = 5 * 60 * 1000（即300000ms）
- 在调用慢接口的组件（如 importUploadDialog.vue）请求 config 传 `timeout: IMPORT_REQUEST_TIMEOUT`
- 复用现有「系统接口请求超时」提示逻辑，其他接口不受影响
- 套路可复用于任何慢接口（导入、批量处理、报表生成）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：已为 import 接口单独设置300000ms超时，enums.js 新增常量，importUploadDialog.vue 传 timeout
- 涉及文件：src/enums.js、src/views/property/spFeeBill/components/import.vue、importUploadDialog.vue
- 所属项目：产品2.0；来源会话：f95fd685-fb92-457c-98a8-0d5d19ac9f6f；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "axios_timeout_override",
  "source_extraction_id": "972b21df6a454c439c8db1320a0d9503",
  "version": 1,
  "memory_type": "entities"
}
-->