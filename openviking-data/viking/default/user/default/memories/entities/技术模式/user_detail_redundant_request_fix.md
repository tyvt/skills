# system/user/detail.vue 冗余请求修复
产品2.0 修复用户管理新增用户时多余请求导致报错的问题。

## 问题原因
- `system/user/detail.vue` 新增模式调用 `this.$get('/system/user/')`，V3 接口规范化下转为 `POST /system/user/add` 且 body 为空，导致报错

## 修复内容
- 删除该多余请求
- 该接口原用于获取 posts（岗位列表），但当前模板无岗位选择字段，`postOptions` 实际未使用
- 密码初始化改为依赖 `/system/config/getInitialPassword`，在该接口返回后直接设置 `form.password`，避免与 `initPassword` 异步加载竞态
- 角色列表仍通过 `/system/role/roles` 正常加载

## 涉及文件与来源
- 文件：`system/user/detail.vue`、`tool/fjflpz/index.vue`、`mixins/listMixins.js`、`tool/fjflpz/components/FjDialog.vue`
- 项目：产品2.0；来源会话：4f365506-e3be-4779-92c3-618489cfe3e8；代码基线：none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_detail_redundant_request_fix",
  "source_extraction_id": "57e872b5424442ffaddb2a2cb119a7a7",
  "version": 1,
  "memory_type": "entities"
}
-->
