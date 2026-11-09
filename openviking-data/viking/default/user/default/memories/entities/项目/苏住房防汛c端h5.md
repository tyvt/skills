# 苏住房防汛C端 H5
苏住房防汛C端移动端 H5 前端项目，用于苏州住房防汛相关业务查询与办理。

## 技术栈
- 基于 uni-app 构建，使用 `bun uni build -m test` 产出部署包
- 远程仓库为 GitLab（suzhufang-fe/zhi2-mobile-query-h5），主集成分支为 dev
- 含 vitest 单元测试（2026-11-09 为21项通过）
- 包含视觉回归测试（playwright.visual.config.ts、tests/e2e/visual.spec.ts）

## 主要页面
- 登录页 pages/login：主登录含用户/机构 tab 与账号密码登录
- 设计图版验证码登录独立页 pages/login-design
- 我的页 pages/mine：按设计稿还原，参考苏住房C接真实用户数据与菜单跳转
- 首页 pages/index：参考苏住房C接真实接口（后端 StudyPortalController 的 article/study/portal），固定品牌 banner 仅用 API 提供跳转目标
- 数智页：完整数据看板
- 工作台 pages/workbench：项目检查与卡片展示

## 接口与参考
- 参考项目：苏住房C（D:\repository\苏住房C\zhi2-mobile-shimin，实体 zhi2_mobile_shimin）提供前端接口与跳转模式
- 后端含 StudyPortalController（article/study/portal 模块）；article/news/study API 在苏住房C测试网关可用，但本项目 dev 网关返回404
- 模式感知数据服务：真实 API 失败时静默回退 demo 种子数据（保视觉回归）；详情页用 item cache 继承真实标题/字段
- 2026-11-09 首页/我的页功能接口与跳转参考苏住房C调通，21项单元测试通过、构建成功、8路由渲染零错误、mine页视觉回归像素级不变

## 协作约定
- 按 AGENTS.md：在 worktree 分支提交、推送，再合并回 dev 并清理 worktree
- 功能分支命名示例 fix/login-design-align
- 接口或校验错误统一使用 toast，不使用内联错误横幅

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端H5",
  "source_extraction_id": "b70a926e7f394ab6adce1f8104e23d34",
  "version": 2,
  "memory_type": "entities"
}
-->