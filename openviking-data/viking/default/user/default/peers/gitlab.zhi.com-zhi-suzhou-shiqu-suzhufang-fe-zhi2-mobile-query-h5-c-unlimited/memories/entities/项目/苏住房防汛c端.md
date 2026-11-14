# 苏住房防汛C端
苏住房防汛C端是苏州住房防汛相关的移动端C端项目，采用 worktree 隔离开发。

## 描述
- 主工作区路径 `D:\repository\苏住房防汛C端`，严禁直接修改
- 可写 worktree 路径 `D:\repository\苏住房防汛C端-wt-login-align`，分支 `fix/login-design-align`
- 本地部署站 `http://127.0.0.1:8095/`（nginx 指向 worktree dist）
- 构建命令 `bun run build`

## 设计稿
- 权威设计稿 `artifacts\design-mine-mine.webp`（820×1800，即 410×900@2x）
- 要求 100% 还原颜色、圆角、间距、字号

## 首页与构建验证
- 首页数据统一在 `src/utils/portalData.ts`（约 121 行）取数，由 `src/pages/home/index.vue`（约 26 行）加载
- 2026-11-14 首页五类接口改为各自失败回退空态，首页加载与学习 tab 切换增加异常捕获，接口路径与参数不变
- 依赖环境为 Bun 1.4.4 + 冻结锁文件 `bun.lock`；缺 `vue-tsc` / `uni` 入口时需先按锁文件安装依赖才能类型检查与构建
- 2026-11-14 验证结果：H5 构建通过（仅 Sass 弃用警告）；类型检查尚存 26 条既存错误，首页相关文件错误已清零
- 任务日志目录 `.task-state/`（如 typecheck-after-fix.log、deps-install.log）

## 关系
- Lead 负责分配任务与构建协调
- data-builder 同 worktree 改 data 页并共享 dist，需构建前报备
- AI助手实现了「我的」页（src/pages/mine/index.vue）

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "26ad480cd53848d6b3e83860c540b23b",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->