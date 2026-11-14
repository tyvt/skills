# 临时账号登录与受限路由
临时身份（userType='01'）来自登录后的 GetInfo 响应，与表单机构类型是两个独立字段，需按接口文档单独实现临时账号登录与受限路由。

## 字段来源
- userType='01' 由登录后调用的 GetInfo 接口返回。
- 表单中的机构类型是另一个字段，不能与 userType 视为同一字段或互相赋值。

## 实现约束
- 已按接口文档实现临时账号登录与对应受限路由。
- 临时身份不混入正式角色权限，权限判断上保持隔离。

## 后续工作
- 接下来落地前端测试与页面改造。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-taicang-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "temporary_account_login",
  "source_extraction_id": "d86f61e1147041b9948c4e95a4c60543",
  "version": 1,
  "memory_type": "entities"
}
-->