---
audit_status: valid
last_checked: 2026-11-27T21:57:26+08:00
verdict_note: 苏住房G 含 vite-build.mjs、zhi2-web-admin 子模块与 dist 路径，部署结构属实；svgoOptions 细节当前构建配置未直接命中
---
# 苏住房G 项目部署结构
苏住房G 是使用 zhi2-web-admin 子模块的前端项目，与门户（portal）项目共用子模块但分支和部署相互独立。

## 分支与构建
- 开发分支：develop/v2.6.2-suzhufang
- 构建命令：node scripts/vite-build.mjs build，产物输出至仓库根 dist/（D:/repository/苏住房G/dist）
- 子模块本地路径：D:\repository\苏住房G\zhi2-web-admin

## 部署
- nginx 站点 苏住房G.conf，监听 localhost:8101，root 指向 D:/repository/苏住房G/dist
- 站点已预配置，重建 dist 后无需修改 nginx 或重载即可生效

## 验证方式
- 窄屏 UI 验证：通过 nginx 8101 + Playwright 注入 mock token 与接口 mock + 窄视口（如 900px）截图断言
- 交付门槛：构建与 ESLint 均须 exit 0

## 项目归属
- 所属项目：苏住房G（zhi2-web-admin）
- 首页相关页面：src/views/home/index-v2.vue 及 v2/components 下组件
- 2026-11-14 任务 2468 的 Navbar 视觉改造在 worktree `D:/repository/苏住房G/worktrees/task2468-navbar-visual/zhi2-web-admin` 中进行，候选版经 nginx UI 部署后按参考图量化比对还原度

## 构建性能
- 2026-11-13 优化：vite.config.js 的 svgoOptions 由仅 removeViewBox 改为 preset-default(保留 removeViewBox:false)，410个SVG图标由约1804KB压至约727KB，npm run build 由约150秒降至107.5秒(省约28%)，图标symbol完整且viewBox保留。

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "suzhufang_g_deploy",
  "source_extraction_id": "1cc31f765bab4d44afcbb9ee1ff1c9c7",
  "version": 3,
  "memory_type": "entities"
}
-->