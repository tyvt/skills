# 小区信息物业合同精简合main单独处理
市区交付要求精简小区信息/物业合同 UI，合并到 main 时因 main 版 project/info 无地图模块须单独改，不能机械 cherry-pick。

## 交付要求
- 小区信息页去掉地址、交付日期、周边分类，「小区周边」文案改为「小区位置」
- 物业合同列表/详情隐藏公司地址

## 合main注意
- 子模块 `dev_shiqu`/`dev_wuxi-sfb`/`main` 均需推送时，`main` 上 `pages_owner/project/info/index.vue` 结构与功能分支不一致（main 无地图模块）
- 不能机械 cherry-pick 整块 diff，应在 main 仅做等价删减（去地址、交付年等）并同步物业合同改动，避免引入不存在的地图区块或漏改
- 父仓 `main-sfb` 与 `main` 分别更新子模块 commit 指针

## 验证与归属
- 验证证据：会话 b0a11efb 最终结论表格 main 已推送 f2e0885，并注明「main 的 index.vue 结构不同（无地图模块），已单独处理」
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/project/info/index.vue、src/pages_owner/company/info/contracts.vue、src/pages_owner/house/components/ProjectDetail.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：b0a11efb-9a8c-4770-9303-ab19345a937d；代码基线：4883b08

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "main_info_no_map",
  "source_extraction_id": "55ebfb54fdd04af4b4e59c85f823897e",
  "version": 1,
  "memory_type": "entities"
}
-->