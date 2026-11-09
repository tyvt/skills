# zhi2-web-admin
门户 npm workspaces 单仓的子模块前端项目，承载无锡市区（benefit）前端业务，父仓为 zhi2-web-admin-h5-g-unlimited（中文名"无锡市区G"）。

## Description
- 父仓为 zhi2-web-admin-h5-g-unlimited（中文名"无锡市区G"），monorepo 单仓结构；依赖提升到根 node_modules，子模块无完整 node_modules；vite 属 devDependencies，禁用 --omit=dev 安装
- 主要业务页面位于 benefit 模块：管理主体、监管账户、开户变更（各含 detail.vue）及银行对账文件 pubRecBankFile（月份范围查询+行内下载，listMixins 标准 CRUD）
- 市场监测页 src/views/property/marketMonitor：含 index.vue、AreaStructurePanel.vue（成交面积段横向柱状图）、TradePanel.vue、ChartBox.vue、已删 DistrictBanner.vue 及 PORTING-SPEC.md、离线预览 market-monitor.standalone.html
- TradePanel.vue 的年份/月份下拉：年份上限为当前年、当前年月份上限为当前月、历史年恢复 12 个月、切回自动钳制，不可选将来日期（2026-11-09 修复验证）

## Relations
- 与父仓为 workspaces 关系；构建脚本改写 public/version.json（构建副产物需还原）
- 开发分支 develop/v2.6.1，子模块与父仓成对提交推送；本任务（2026-11-09）在 develop/v2.6.2-portal 开发并提交通知（子模块提交 72e1e3c76、父仓 gitlink 提交 ca761fb 均已推送）；若用户选「仅提交」则不推送本地领先远程

## Conventions & Contracts
- 提交顺序：先推子模块修复提交，再父仓仅提交 gitlink 更新并推送
- 不纳入提交本地改动：子模块 package.json（既有 install-dependencies 脚本）、public/version.json、report.html；父仓 .dsh/
- 编辑页 getDetail 后 fillProjectInfo()：projectAddr/regionName/subdistrict/community 任一缺失则用 projectId 拉 /property/complex/{projectId} 补缺失项
- 后端 PubManagementOrgSaveDto 要求 projectId、projectName、projectAddr、regionName、subdistrict、community 均 @NotBlank
- 监管账户/开户变更 保存 DTO 仅 projectName、projectAddr、regionName @NotBlank（subdistrict/community 可选）
- 同步数据（如"海悦花园B区"）可能缺失 projectAddr，需前端异步补齐

## Deployment
- 本地 nginx 站点 http://127.0.0.1:8105 托管 dist 自测；部署验证用 nginx UI「门户.conf」端口 8092 root 指向 dist，与 8105 并存

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "zhi2-web-admin",
  "source_extraction_id": "966a84f83da74b8aba4a2409457e3cb5",
  "version": 8,
  "memory_type": "entities"
}
-->