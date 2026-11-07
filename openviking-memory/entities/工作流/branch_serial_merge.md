# 多分支修复-确认-串行合并约定
园区物管2.0 存在多级发布分支，修 bug 须从最早受影响分支修起并逐级向下串行合并。

## 分支层级
- develop/v2.6.1 → develop/v2.6.2 → develop/v2.6.2-yulin 定制分支
- 直接在下游分支修会使上游合并时再次引入或产生冲突，修复无法自然向下传播

## 操作流程
- 从最早受影响分支（如 v2.6.1）切出修复并提交
- 修好后向用户确认效果
- 确认通过后按版本层级串行合并：v2.6.1 → v2.6.2 → v2.6.2-yulin
- 冲突以下游已确认的修复版本为准（如删除下游分支遗留旧样式、统一采用确认方案）
- 合并链完成后停在最终定制分支，推送远程需用户另行确认

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：三分支合并表与冲突处理说明，v2.6.1 提交修复、v2.6.2 与 v2.6.2-yulin 逐级合并
- 涉及文件：zhi2-web-admin/src/views/property/knowledgeBase/index.vue、zhi2-web-admin/src/styles/index.scss
- 所属项目：园区物管2.0；代码基线 c52866fc8；来源会话 4d3be41b-6a5f-45bb-ae11-8782ac069dd6

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "branch_serial_merge",
  "source_extraction_id": "376a889d69774d27a4b297f122696b26",
  "version": 1,
  "memory_type": "entities"
}
-->