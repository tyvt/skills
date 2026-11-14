# 无限版管理端H5测试服务器
苏住房前端（zhi2-web-admin）的管理端 H5 测试服务器，用户（Lead）用于查看线上效果的部署环境。

## 地址与构建来源
- 访问地址：`http://unlimited.g.h5.admin.web.v2.suzhufang.shiqu.suzhou.test.zhi.com/`
- 该环境从 GitLab 仓库构建，本地提交的修复需重新构建部署后才能生效（2026-11-13 提及）

## 与本地环境对比
- 本地部署直接服务本地 `dist`，而测试服务器需远端分支包含对应提交并重建后才显示新效果

<!-- MEMORY_FIELDS
{
  "category": "部署环境",
  "name": "test_unlimited_web",
  "source_extraction_id": "3513dc29b8694910b7ed3c91b1e312ce",
  "version": 1,
  "memory_type": "entities"
}
-->