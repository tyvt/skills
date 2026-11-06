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

## 未备案单据启用修复
- 针对未备案单据（bizState !== '2'），切换启用状态前端拦截提示「未备案的不能执行启用或禁用」并回滚开关
- handleEnableChange 中根据目标状态反推原值 prevStatus = statusStr === '1' ? '0' : '1'，修复接口报错后回滚到错误值的问题
- 权限校验、参数校验失败时同样正确回滚开关状态
- 修改位置：regionBankAuth/index.vue 的 handleEnableChange 方法

## 验证与归属
- 涉及文件：regionBankAuth/index.vue、property/utilityLinkConfig/index.vue
- 所属项目：苏住房G；来源会话ID：2523c7eb-f1c1-4b26-8a60-77d3793a4bcf

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_bank_auth_switch",
  "source_extraction_id": "430454bfe60c45a1a179cfb3e392ff41",
  "version": 2,
  "memory_type": "entities"
}
-->