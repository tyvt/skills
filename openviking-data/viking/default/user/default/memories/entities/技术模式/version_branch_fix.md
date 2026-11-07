# 版本分支修复约定
产品2.0前端并行维护 develop/v2.6.1、develop/v2.6.2、develop/v2.6.2-yulin 三条版本分支，按上游到下游链定位引入点并 cherry-pick 同步修复。

## 背景与规则
- 三条分支：261、262、262-yulin（榆林定制），下游由上游合并而来
- 用户指定排查顺序：从261开始，然后262，最后262-yulin；261修完合到262，262修完合到262-yulin
- bug通常在某一环合并时引入并沿链扩散

## 修复步骤
- 按上游→下游顺序逐分支比对同一文件定位引入点
- 在引入分支修复提交，下游分支用 cherry-pick 单点同步（全量合并冲突多时不整合）
- 父仓库与子模块都要分别提交推送到各对应分支
- env/.env 本地代理配置不入库；修完切回工作分支

## 验证与归属
- 验证证据：排查结论表261无问题、262合并261时误保留重复代码、262-yulin同样带入；修复提交5a74eab61/40e8255f0按cherry-pick同步，父仓库三分支分别提交
- 涉及文件：zhi2-web-admin/src/views/property/workOrder/order/index.vue
- 所属项目：产品2.0；来源会话：d0f2e7ac-fb62-45da-ad5b-e39f678f486c, 341848bc-8f8a-4f9e-9cf0-21c2a82daa1e；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "version_branch_fix",
  "source_extraction_id": "972b21df6a454c439c8db1320a0d9503",
  "version": 1,
  "memory_type": "entities"
}
-->