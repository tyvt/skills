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

## 关系
- Lead 负责分配任务与构建协调
- data-builder 同 worktree 改 data 页并共享 dist，需构建前报备
- AI助手实现了「我的」页（src/pages/mine/index.vue）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "5c56adb098274449a5a7a38c59f6004d",
  "version": 1,
  "memory_type": "entities"
}
-->