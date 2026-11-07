# 产品2.0 jgxm/detail.vue 与 SupervisionTable.vue 改造
产品2.0 中 zhi2-web-admin 的 `jgxm/detail.vue` 与 `SupervisionTable.vue` 已按新版框架改造。

## 框架配置
- `moduleName: 'prefund'`、`businessName: 'regProject'`、`primaryKey: 'regulatorProjectId'`、`permsPrefix: 'xmxx:jgxm'`

## 主要改动
- 顶部操作区：`operation-container` → `operation-btn-group`，已移除 `zs-attachment`
- 查看模式：三个 `Headline` 分别对应 `contentInfo` / `contentInfo2` / `contentInfo3`（基本信息、监管协议属性、风险基本信息），编辑/新增保留原有表单字段与校验逻辑
- 权限按钮：撤销、允许多协议签署、不允许多协议签署改为 `zs-button :permission`
- 打印：`:custom-print="true"`，`zs-print` 使用 `:permission="[`${permsPrefix}:print`]"`
- 业务逻辑：`revoke`、`multipleSignatures` 等保留

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`jgxm/detail.vue`、`SupervisionTable.vue`
- 所属项目：产品2.0；来源会话：d36455ff-aa49-44e4-8e20-51051f2af28f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "jgxm_detail_refactor",
  "source_extraction_id": "2658e67cf6ca4db888ef45ede55a20f8",
  "version": 1,
  "memory_type": "entities"
}
-->