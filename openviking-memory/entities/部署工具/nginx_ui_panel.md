# nginx UI 面板
用户本地用于管理前端站点 nginx 配置的图形化面板工具，站点配置由面板统一维护。

## 部署位置与数据
- 站点配置文件位于 `D:/nginx/conf/sites-enabled/*.conf`，由面板维护
- 面板默认数据库路径为 `D:\nginx-ui\database.db`

## 登录与脚本调用限制
- 面板脚本/接口调用依赖数据库中的有效登录 token，无有效 token 时无法通过面板更新站点
- 2026-11-14 检查发现默认数据库没有有效登录 token，导致临时部署未执行，旧站点仍指向原 root
- 恢复方式是由本机用户手动登录面板一次；无需向助手提供密码或 token

## 相关运行状态
- 部署与基线 E2E 需等本机用户重新登录面板后才能进行，独立的源码准备可先行推进

<!-- MEMORY_FIELDS
{
  "category": "部署工具",
  "name": "nginx_ui_panel",
  "source_extraction_id": "051348c563a34bedb144956312687639",
  "version": 1,
  "memory_type": "entities"
}
-->