# nginx_ui
nginx-ui 是带独立数据库的 nginx 图形管理程序，曾安装在本机 D:\nginx-ui 目录。

## 部署情况
- 可执行文件为 `nginx-ui.exe`，曾以 PID 5148 运行，目录内含 database.db 与多个旧备份子目录。
- nginx 本体（2 个 worker）与其相互独立。

## 移除过程
- 2026-11-24 因部署看板已覆盖需求被彻底移除：先停止任务与进程，再删除 D:\nginx-ui 目录。
- 删除前复核 nginx.conf 仅第 48 行注释引用，无实际依赖，删除后 `nginx -t` 校验通过。
- 临时备份位于 `%TEMP%\nginx-ui-bak-20261124_145615.zip`，约 87.1MB。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "第三方工具",
  "name": "nginx_ui",
  "source_extraction_id": "05c44fadf32a4b00bb008d75f7a71b8b",
  "version": 1,
  "memory_type": "entities"
}
-->