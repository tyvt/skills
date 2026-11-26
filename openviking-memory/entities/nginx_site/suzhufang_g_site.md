---
audit_status: invalid
last_checked: 2026-11-26T19:43:55+08:00
verdict_note: 记忆称监听8101且加载 sites-enabled 旧副本；现状生效配置为 env-sites/suzhufang-g-local.conf 监听8165（20261124 端口迁移、部署面板生成），与现状不符。
---
# 苏住房G站点
苏住房前端在本地 nginx 上的站点，监听 8101，其启用配置副本与 nginx UI 修改的配置存在不同步问题。

## 基本信息
- 监听端口为 8101。
- 根目录为 `D:/repository/苏住房G/dist`。
- 实际加载 `sites-enabled/苏住房G.conf`，该文件是 `sites-available` 配置的旧副本。

## 配置更新问题
- nginx UI 会更新 `sites-available`，但 8101 仍按 `sites-enabled/苏住房G.conf` 的旧副本运行。
- 2026-11-14 已定位原因是启用副本未刷新，待确认 UI 启用流程能否安全刷新该副本。

## 操作约束
- 不直接手改 `sites-enabled` 文件。
- 配置变更应通过 nginx UI 的启用流程处理。

<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "suzhufang_g_site",
  "source_extraction_id": "c87422332a464c0783b6285f6ef638e7",
  "version": 1,
  "memory_type": "entities"
}
-->