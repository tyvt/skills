# zhi2-web-admin
门户 npm workspaces 单仓子模块前端项目，承载无锡市区（benefit）前端业务，父仓 zhi2-web-admin-h5-g-unlimited（中文名"无锡市区G"）。

## Description
- 父仓 monorepo；依赖提升根 node_modules，子模块无完整 node_modules；vite 属 devDependencies，禁用 --omit=dev 安装。
- benefit 模块主业务页：管理主体、监管账户、开户变更（各含 detail.vue）及银行对账文件 pubRecBankFile。
- 市场监测页 src/views/property/marketMonitor：dashboard.css + 6 canvas 面板；2026-11-09 字体修复（删 Google Fonts、改系统字体栈、灰字加深 #334155、字号上浮、fontWeight 600）；TradePanel 年份/月份下拉钳制不可选将来，动态兜底色 `|| '#64748b'` 未改。

## Relations & Conventions
- 与父仓 workspaces；构建脚本改写 public/version.json（需还原）。
- 开发分支 develop/v2.6.2-portal，子模块与父仓成对提交推送（先推子模块再父仓 gitlink）。
- 不纳入提交：package.json、public/version.json、report.html、父仓 .dsh/。
- 编辑页 getDetail 后 fillProjectInfo() 补齐 projectAddr/regionName 等；后端 DTO 要求各字段 @NotBlank；同步数据可能缺失 projectAddr 需异步补。

## Deployment
- 本地 nginx 127.0.0.1:8105 托管 dist 自测；「门户.conf」端口 8092 root 指向 dist 验证。
- 2026-11-09 字体修复：worktree 8c5bfa8e2 → 合并 10bfe920a → 父仓 gitlink 99058ef。


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "zhi2-web-admin",
  "source_extraction_id": "e713b433f93d40d499739887234a2cc4",
  "version": 12,
  "memory_type": "entities"
}
-->