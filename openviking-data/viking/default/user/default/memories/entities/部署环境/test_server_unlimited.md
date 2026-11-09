# 无限版查询H5测试服务器
苏住房防汛C端移动查询H5 的测试服务器，用户（Lead）用于查看线上效果的部署环境。

## 地址与构建来源
- 访问地址：`http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.test.zhi.com/`
- 该环境从 GitLab 仓库构建，而非本地 `dist`，本地提交的修复需推送到远端分支后才会重建生效

## 与本地环境对比
- 本地部署为 nginx 8095（`http://127.0.0.1:8095/`），直接服务本地 `dist`，采用 hash 模式路由
- 若测试服务器显示旧效果，说明远端分支尚未包含对应提交（如 `97c9460`）

<!-- MEMORY_FIELDS
{
  "category": "部署环境",
  "name": "test_server_unlimited",
  "source_extraction_id": "54d39551a6b74db8a59156978443487b",
  "version": 1,
  "memory_type": "entities"
}
-->