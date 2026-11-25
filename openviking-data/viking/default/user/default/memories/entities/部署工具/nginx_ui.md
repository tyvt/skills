# Nginx UI
本机 nginx 管理面板，用于查看与维护 D:\nginx 的站点配置。

## Description
- 本体 `D:\nginx-ui\nginx-ui.exe`，PID 5148，监听 `127.0.0.1:9000`。
- `app.ini` 证实其管理的 nginx 就是 `D:\nginx` 同一套 conf。
- 数据库为 `database.db`，其中 `sites` 表在 2026-11-24 查到 13 个站点。
- 管理密码已从初始密码改为新密码，旧密码失效。

## Login
- 安装脚本 `login.mjs` 显示用 admin 账号登录，密码脱敏。
- `install.mjs` 保留初始密码行，但脱敏视图不可作依据。
- 会话技能 `web-deploy` 为本地 nginx UI 部署；2026-11-25 发现 `deploy-env` 注册表另有「防汛C端 / test」公司测试环境（8162），非本面板站点。

## Usage
- 2026-11-24 通过数据库与磁盘 conf 交叉核对，确认本项目唯一站点为「防汛C端」（id=29，未软删除，8095）。
- 同日排除 8091（门户H5）与 8106（房地产监测应用）为非本项目站点。

<!-- MEMORY_FIELDS
{
  "category": "部署工具",
  "name": "nginx_ui",
  "source_extraction_id": "4a27cb0811cf41638470f3ea79348b8f",
  "version": 2,
  "memory_type": "entities"
}
-->