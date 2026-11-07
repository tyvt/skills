# 子模块合并缺依赖文件补齐
产品2.0 父仓库合并子模块 zhi2-web-admin 分支时 pre-commit 因缺依赖文件失败，从来源分支补文件纳入提交而非跳过钩子。

## 问题背景
- 在父仓库对子模块做分支合并（develop/v2.6.1 → develop/v2.6.2）并提交时，pre-commit 失败报缺若干依赖文件
- 合并只带来引用关系，被引用的一批文件在目标分支缺失，import 链断裂导致静态检查不通过
- 本次缺失：resolveServerAssetUrl.js、serviceHealth.js、operationReport.js、RegionTreeLayout.vue、regionTree.vue

## 解决方案
- 不用 --no-verify 跳过钩子，缺文件是真问题，跳过之后构建以更模糊方式炸掉
- 从来源分支把这批文件补回并一并纳入本次提交（git checkout develop/v2.6.1 -- <file> 后正常 add），让子模块此次提交自身完整
- 子模块提交完成后再提交父仓库，父仓库只做子模块指针更新，提交信息写 Update subproject commit reference
- 收尾用两处 git status 确认父子两仓都干净；需推送时两仓都要单独 push

## 验证与归属
- 验证：会话 fedbf125（2026-06-22）子模块提交 a8cd64707 合并分支，从 develop/v2.6.1 补全 5 文件；父仓库 c1dcce8 更新指针（2d41ae8 → a8cd647），两仓 clean
- 涉及文件：resolveServerAssetUrl.js、serviceHealth.js、operationReport.js、RegionTreeLayout.vue、regionTree.vue（均在 zhi2-web-admin/src 下）
- 所属项目：产品2.0；来源会话：fedbf125-9fe3-444d-81e8-d17ffec9216d；代码基线：57109f9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_precommit_fix",
  "source_extraction_id": "367daf60193e4512bd7f31c6fd55c740",
  "version": 1,
  "memory_type": "entities"
}
-->