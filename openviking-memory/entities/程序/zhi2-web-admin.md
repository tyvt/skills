# zhi2-web-admin
门户 npm workspaces 单仓的子模块前端项目，承载无锡市区（benefit）前端业务，父仓为 zhi2-web-admin-h5-g-unlimited（中文名"无锡市区G"）。

## Description
- 父仓为 zhi2-web-admin-h5-g-unlimited（中文名"无锡市区G"），构成 monorepo 单仓结构
- 依赖提升到仓库根目录 node_modules，子模块目录无完整 node_modules
- vite 属 devDependencies，禁用 --omit=dev/--production 安装否则缺失
- 主要业务页面位于 benefit 模块：管理主体、监管账户、开户变更（各含 detail.vue 编辑页），以及银行对账文件 pubRecBankFile（月份范围查询+行内下载，列表走 listMixins 标准 CRUD）
- 本地 nginx 站点 http://127.0.0.1:8105 直接托管 dist 构建产物，便于自测

## Relations
- 与父仓 zhi2-web-admin-h5-g-unlimited 为 workspaces 关系
- 构建脚本会改写 public/version.json，该文件为构建副产物需还原
- 开发分支为 develop/v2.6.1，子模块与父仓均在此分支成对提交推送

## Conventions
- 提交推送顺序：先推送子模块 zhi2-web-admin 修复提交，再在父仓 无锡市区G 仅提交子模块 gitlink 更新并推送
- 不纳入提交的本地改动：子模块内 package.json（install-dependencies 脚本，早于本次任务的既有改动）、public/version.json、report.html（vite 打包分析产物）；父仓根目录 .dsh/（会话临时目录）
- 管理主体/监管账户/开户变更 编辑页 getDetail 后调用 fillProjectInfo()，当 projectAddr/regionName/subdistrict/community 任一缺失时用 projectId 拉 /property/complex/{projectId} 仅补缺失项

## Backend Contracts
- 后端 PubManagementOrgSaveDto 要求 projectId、projectName、projectAddr、regionName、subdistrict、community 均 @NotBlank
- 监管账户/开户变更 保存 DTO 仅 projectName、projectAddr、regionName 为 @NotBlank（subdistrict/community 可选）
- 同步数据（如"海悦花园B区"）记录可能缺失 projectAddr，需前端异步补齐

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "zhi2-web-admin",
  "source_extraction_id": "e1315906b362439e986a3cd638797ea2",
  "version": 3,
  "memory_type": "entities"
}
-->