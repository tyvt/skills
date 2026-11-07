# 苏州商品房查询H5前端
苏州园区商品房移动端查询 H5 项目（gitlab: zhi/suzhou/shiqu/suzhufang/fe/zhi2/mobile-query-h5/c-unlimited），使用 dev 分支与 worktree 构建部署。

## 部署架构
- nginx 站点 root 正常指向主仓库 `dist`，曾误指向不存在的 `dist/build/h5` 导致部署失败
- 使用 worktree 构建 test 产物并独立部署验证，合并后再把 nginx root 改回主仓库 `dist`
- 构建验证流程包含登录页与验证码接口检查

## 登录与验证码
- 登录页含验证码接口，验证码由网关控制开关
- 网关关闭验证码时不再强制要求 uuid（代码已修复）

## 代理与接口路径
- dev 分支原代理路径：`/api-flood` → flood 服务 9610，`/api-auth` → 鉴权服务 9211（含 `GET /v2.0/code`）
- 登录接口：`POST /v2.0/security/auth/login`，body 需携带 `code` + `uuid`
- 用户要求参考 `main` 分支将代理与登录统一为 `/api` + `/v2.0/...` 模式（改造进行中）

## 归属与来源
- 所属项目：苏州商品房查询H5（zhi2-mobile-query-h5-c-unlimited）
- 来源会话：2026-11-03 部署修复会话

<!-- MEMORY_FIELDS
{
  "category": "苏州商品房查询H5技术",
  "name": "suzhufang_query_h5",
  "source_extraction_id": "83f7e27895584915acfe9adfff19aa6b",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->