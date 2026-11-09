# 我的页用登录接口用户信息而非C端profile
苏住房防汛C端移动查询H5 的「我的」页原先调用 C 端 profile 接口取用户信息，属跨端误用，已改为使用管理端登录接口返回的用户信息。

## 问题根因
- 「我的」页（mine）经 portalData.ts 的 fetchMine 调用 api.queryUser()，底层为 C 端 profile 接口 /v2.0/security/ctAuth/profile
- 当前为管理端用户登录，该接口返回的是居民端用户数据，导致展示与服务端返回不一致

## 修复方案
- request.ts：新增 setLoginUser/getLoginUser/clearLoginUser 及 LoginUserInfo 类型，本地缓存登录用户信息（key 如 flood-login-user-v1）
- flood.ts：登录成功后将登录响应 data（合并 data.user 与扁平 data，剔除 token/accessToken 敏感字段）落库；注销时 clearLoginUser
- portalData.ts：fetchMine 改用 getLoginUser() 本地登录用户信息，删除 api.queryUser() 调用

## 验证与归属
- 单测 34 passed（含新增 3 条）；uni build -m test 通过；nginx 8095 站点 Playwright 验证显示 管理员/zsbase 而非 seed 陈乔乔/300007
- 注意：dev 网关登录接口返回的 nickName 原始值为 "管理员%"（带尾随 %，后端数据问题，前端忠实展示）
- 涉及文件：src/utils/request.ts、src/stores/flood.ts、src/utils/portalData.ts
- 所属项目：苏住房防汛C端；来源会话：2026-11-09；分支 fix/login-userinfo-from-login 合入 dev(6a7ca98)

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "query_h5_logininfo",
  "source_extraction_id": "471b9e3284e046c4958b756a246ad8cc",
  "version": 1,
  "memory_type": "entities"
}
-->