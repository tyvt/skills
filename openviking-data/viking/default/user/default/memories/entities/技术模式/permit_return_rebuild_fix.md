# 预售许可申请维护返回楼幢列表清空修复
苏州市房地产监测V3 的 Bug 6298：预售许可申请点「预售方案-维护」返回后预售楼幢列表被清空，已修复。

## 问题根因
- 新增态从方案维护页返回时 returnPath 带 restorePlanNav=1，页面在 tryRestorePlanNavDraft 恢复楼幢草稿后立即删除草稿并 clearPlanNavRestoreQuery 清理 URL 标记
- AppMain 用 :key="$route.fullPath" 渲染，清标记的 $router.replace 改变 fullPath 触发申请页重建
- 新增态不重新拉详情、草稿已删，重建后实例无从恢复，列表被清空（共 0 条）

## 修复内容
- detail.vue 中仅在本次不会因清理 restorePlanNav/restore 标记而重建时（无待清理标记）才删除 sessionStorage 草稿
- 仍有标记则保留草稿，交给清标记后重建出的实例再消费一次，末尾再删

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/presale/permit/components/detail.vue 的 tryRestorePlanNavDraft
- 验证：ESLint 单文件 exit0；npm run build 成功（dist 重新产出）
- 子模块提交 de5cc464d、父仓库 gitlink 8589417 均已推 origin/develop/v3.0.0
- 禅道 6298 已回写 resolved/fixed/trunk 指派 lichandan
- 所属项目：苏州市房地产监测V3

## 通用教训
- 本项目 AppMain 以 :key="$route.fullPath" 渲染，任何 query 变动都会整页重建
- 依赖 sessionStorage 一次性消费恢复内存态的流程，要保证「清 query 重建」后的实例还能再消费一次草稿，否则新增态内存数据丢失

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_return_rebuild_fix",
  "source_extraction_id": "dd5408524d3842c78872ae4fe1900153",
  "version": 1,
  "memory_type": "entities"
}
-->