# 资质记录变更按钮条件放宽
苏州市房地产监测V3 中 qualificationRecord/detail.vue 的变更按钮展示逻辑放宽，让存量数据可用。

## 问题背景
- 变更按钮不展示，需排查原因
- 代码注释写明「后端 getLast 亦有校验兜底」，前端不必卡得太死

## 解决方案
- `canChange` 改为「资质记录 `bizState === '2'` 或 所属企业备案 `bizState === '2'`」
- 改动小，可立刻让存量数据可用

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 涉及文件：src/views/toB/qualificationRecord/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：session_8a4cdef2d3cc6b0f144806afea15e468；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_change_btn",
  "source_extraction_id": "fcff1f14acef43488e3cda24084218b0",
  "version": 1,
  "memory_type": "entities"
}
-->