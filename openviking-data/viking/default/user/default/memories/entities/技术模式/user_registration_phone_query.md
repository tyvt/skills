# 用户注册查询新增手机号查询条件
淮安物管「公共查询 > 用户注册查询」页面（zhi2-web-admin/src/views/system/publicPage/index.vue）新增手机号码查询条件。

## 改动内容
- queryParams 增加 phone: undefined
- formItems 在「所属单位」与「角色」之间增加「手机号码」输入框
- 布局：第1行 用户姓名/所属单位/手机号码；第2行 角色/状态

## 自动生效逻辑
- 搜索/列表请求 getQueryParams() 自动携带 phone 参数
- 导出 handleExport() 同样使用 getQueryParams()，导出含手机号
- 重置 resetQuery() 恢复 phone 为 undefined
- 搜索缓存 listMixins 自动缓存 phone 条件

## 验证与归属
- 验证：extracted source=cursor session=82c31af5-e691-4bcd-babb-0636c7bb1b31
- 涉及文件：zhi2-web-admin/src/views/system/publicPage/index.vue、zhi2-web-admin/src/views/system/user/index.vue
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_registration_phone_query",
  "source_extraction_id": "c8bacbb78d664da6a3d9afe7a9815878",
  "version": 1,
  "memory_type": "entities"
}
-->