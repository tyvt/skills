# 苏住房防汛C端 H5 测试服
苏住房防汛C端移动查询 H5 的 test 环境站点，用户（Lead）用于在线查看部署效果。

## 地址与构建来源
- 访问地址：`http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.test.zhi.com/`；由 GitLab 仓库构建而非本地 `dist`，本地修复须推远端分支并重新构建后才生效
- test 服效果陈旧说明远端分支缺少对应提交（如 `97c9460`）
- 2026-11-14 提交 `e925eec6ebd0b59fdf9cf47e0d763d35e8be3d7d` 已推 origin/dev（本地远端哈希一致）但尚未部署到该站，需重新构建/部署后才显示
- 本地部署为 nginx 8095（`http://127.0.0.1:8095/`）直读本地 `dist`，hash 路由；2026-11-24 确认线上生效配置为 `D:\nginx\conf\sites-enabled\防汛C端.conf`（`防汛C端-local.conf` 未生效），该站点在线服务构建产物，`dist`（14:59:35）晚于源码（14:59:16），构建 exit 0
- 2026-11-25 后台配置搜索：本地站点由 `防汛C端-test.conf` 提供，生效副本在 `D:\nginx\conf\env-sites\防汛C端-test.conf`；站点服务 dist，新代码在 `pages-home-index.DhnvhcDL.js`

## 登录与验证
- 2026-11-24：登录需用户名+密码+图形验证码；项目 `.env` 自动登录说明里的测试账号为 `{{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}}`，无其他已存凭证（deploy-env 与记忆检索均无）
- 2026-11-24 以上述账号登录成功（验证码识别为 `3`），进入首页可见街镇检查/区县检查/市级检查
- 2026-11-25：用 `suzhufang-g` 应用的管理员账号（deploy_env-huishan-g-dev）真实登录本 C 端 test 环境成功，拿到 G 端管理员 token；注入 `flood-token-v1`/`flood-login-user-v1` 后需鉴权接口（getInfo/treeInPermission/getKeyData/getBenefitData）全部 500，免登录 `region/list` 返回 200，真实数值无法展示，前端显示「—」空态

## 临时 nginx 切换与还原
- 截图验证需临时改本地 nginx：先备份配置、验证后还原；2026-11-14 经 nginx UI 切换（临时配置就绪，旧站点当时未动），nginx UI 面板 127.0.0.1:9000 管理同一套 `D:\nginx` 配置（见「nginx_ui」）
- 2026-11-14 首版截图脚本未落盘即停（页面初始化未暴露 uni storage API，临时 token 未写入），期间本地 nginx 仅指向隔离构建
- 2026-11-14 清理完成：临时 nginx 还原至原 `dist` 根，首页与 `/api/v2.0/code` 均 HTTP 200，18927 端口 Chromium 退出，随后按分支流程只提交本会话源码
- 2026-11-24 切换：`/api/v2.0/evaluation/` 改指本地后端 `localhost:9608`，其余 `/api/` 仍走远程网关保留登录；验证后必须恢复原配置并 reload（详见「查询H5本地后端验证环境」）

<!-- MEMORY_FIELDS
{
  "category": "部署环境",
  "name": "test_server_unlimited",
  "source_extraction_id": "83ff1908b6ce4fd3a2dc035c137eecfe",
  "version": 10,
  "memory_type": "entities"
}
-->