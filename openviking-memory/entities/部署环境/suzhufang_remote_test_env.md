# 苏住房远程测试环境
苏住房前端 zhi2-web-admin 的远程测试环境域名，与本地 nginx 8101 为相互独立的部署。

## 基本信息
- 访问域名：`unlimited.g.h5.admin.web.v2.suzhufang.shiqu.suzhou.test.zhi.com`
- 构建产物：单包 CSS（如 `module-main-OvTTHEa9.css`），区别于本地 Vite 分包（如 `KeyDataNav-*.css`）
- 更新方式：从分支 `develop/v2.6.2-suzhufang` 经外部 CI/CD 流水线构建部署，无本地 dist 同步

## 与本地环境关系
- 本地环境为 nginx 8101（根目录 `D:/repository/苏住房G/dist`），用户日常应在本地查看
- 本会话（2026-11-13）用户实际访问远程测试域名，导致本地修复在其界面无效果
- 远程环境需自身构建/部署周期才会反映分支上的代码改动

<!-- MEMORY_FIELDS
{
  "category": "部署环境",
  "name": "suzhufang_remote_test_env",
  "source_extraction_id": "4cc016473c3b49b8b39c8551435501f1",
  "version": 1,
  "memory_type": "entities"
}
-->