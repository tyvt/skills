# 泰兴G前端仓库
泰兴物管（泰兴G）前端仓库，使用 zhi2-web-admin 作为子模块，从苏住房G派生，用于泰兴物业管理端H5。

## 仓库结构
- 主工作区位于 D:\repository\泰兴G，父仓库分支 develop/v2.6.2
- 子模块 zhi2-web-admin 实际开发分支为 develop/v2.6.2-taixing（父仓库远程 develop/v2.6.2 的 gitlink 指向该分支）
- 本地工作区曾停留在旧状态（子模块 develop/v2.6.2），需切换至 -taixing 以匹配远程

## 与苏住房G关系
- 泰兴G 从苏住房G fork，共享 benefit/statisticsMap 等代码
- 2026-11-04 禅道任务2217：将苏住房G 的 statisticsMap 改进（5文件，355增205删）移植到泰兴G -taixing 分支
- 移植文件：statisticsMap/index.vue、overviewContent.vue、operatingAssets.vue、components/map.vue、statisticsMapDetail/index.vue

## 构建与部署
- 构建使用 bun，依赖偶有缺失（lodash.debounce、zrender 等），属既有环境缺陷
- 本地 nginx 站点端口 8107，root 指向 D:/repository/泰兴G/dist，用于验证大屏
- 提交：子模块 1dcbf404e（推至 -taixing），父仓库 64e7b6a（推至 develop/v2.6.2）


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "taixing_g",
  "source_extraction_id": "2fb6b09cc6b04eb5bada4090400fbd04",
  "version": 1,
  "memory_type": "entities"
}
-->