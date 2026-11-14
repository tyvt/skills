# 无限版查询H5测试服务器
苏住房防汛C端移动查询H5 的测试服务器，用户（Lead）用于查看线上效果的部署环境。

## 地址与构建来源
- 访问地址：`http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.test.zhi.com/`
- 该环境从 GitLab 仓库构建，而非本地 `dist`；本地提交的修复需推送到远端分支后才会重建生效
- 本地部署为 nginx 8095（`http://127.0.0.1:8095/`），直接服务本地 `dist`，采用 hash 模式路由
- 若测试服务器显示旧效果，说明远端分支尚未包含对应提交（如 `97c9460`）
- 2026-11-14 移动查询H5 提交 `e925eec6ebd0b59fdf9cf47e0d763d35e8be3d7d` 已推送到 origin/dev（本地与远端哈希一致），但尚未部署到该测试服务器，需重新构建部署后才会体现修复

## 临时 Nginx 切换与恢复
- 截图校验期间需临时调整本地 Nginx：须先备份配置、校验完成后恢复原配置
- 2026-11-14 本地 Nginx 临时切换经 nginx UI 操作，认证动作仍待本机完成；临时配置文件已备好，旧站点尚未改变
- 2026-11-14 首次截图脚本在保存前停止（页面初始化未暴露 uni 存储接口、临时令牌未写入），期间本地 Nginx 只指向隔离构建产物
- 2026-11-14 收尾完成：临时 Nginx 已恢复到原来的 `dist` 根目录，首页与 `/api/v2.0/code` 均返回 HTTP 200，端口 18927 的 Chromium 已退出，随后只审查本次源码文件并按分支流程提交

<!-- MEMORY_FIELDS
{
  "category": "部署环境",
  "name": "test_server_unlimited",
  "source_extraction_id": "c51eda4d06e84ffba67a65a4e962bb92",
  "version": 5,
  "memory_type": "entities"
}
-->