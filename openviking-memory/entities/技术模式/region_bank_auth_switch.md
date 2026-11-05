# 区域银行授权启用开关列改造
苏住房G 项目 system/regionBankAuth 模块将区级列表启用/禁用改为项目标准开关列并对接启用状态接口。

## 改动说明
- 区级列表 `columns` 中 `nodeContext.level === 'district'` 时启用状态列使用 `type: 'switch'`（zs-table-column 内置 el-switch），替代原字典文本
- 市级汇总页仍用 `type: 'dict'` 只读展示，不提供开关操作
- 开关切换调用 `PUT /system/regionBankAuth/{authId}/enable-status`，请求体 `{ enableStatus: '1'|'0', rowVersion }`（前端路径不含 /v2.0，由 axios baseURL 拼接）

## 交互优化
- 开关值为数字 `1/0`，与 zs-table-column 一致，避免字符串/数字不匹配导致显示异常
- 无权限或接口失败时回滚开关状态，不再整表刷新
- 移除冗余手写 el-switch 模板和未使用的 streetAuthStatus 插槽

## 验证与归属
- 涉及文件：regionBankAuth/index.vue、property/utilityLinkConfig/index.vue
- 所属项目：苏住房G；来源会话ID：2523c7eb-f1c1-4b26-8a60-77d3793a4bcf

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_bank_auth_switch",
  "source_extraction_id": "9d36e0008f33493084394e9c26960c81",
  "version": 1,
  "memory_type": "entities"
}
-->