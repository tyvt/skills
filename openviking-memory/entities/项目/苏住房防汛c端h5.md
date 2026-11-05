# 苏住房防汛C端 H5
苏住房防汛C端移动端 H5 前端项目，用于苏州住房防汛相关业务查询与办理。

## 技术栈
- 基于 uni-app 构建，使用 `bun uni build -m test` 产出部署包
- 远程仓库为 GitLab，主集成分支为 dev
- 包含视觉回归测试（playwright.visual.config.ts、tests/e2e/visual.spec.ts）

## 主要页面
- 登录页 pages/login：主登录含用户/机构 tab 与账号密码登录
- 设计图版验证码登录独立页 pages/login-design
- 我的页 pages/mine：按设计稿还原
- 数智页：完整数据看板
- 工作台 pages/workbench：项目检查与卡片展示

## 协作约定
- 按 AGENTS.md：在 worktree 分支提交、推送，再合并回 dev 并清理 worktree
- 功能分支命名示例 fix/login-design-align
- 接口或校验错误统一使用 toast，不使用内联错误横幅

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端H5",
  "source_extraction_id": "b5a8cb4c7db7411ea9441d767480af03",
  "version": 1,
  "memory_type": "entities"
}
-->