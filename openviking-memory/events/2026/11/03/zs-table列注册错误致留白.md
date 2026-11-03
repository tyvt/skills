# Summary
用户指出zs-table的getColumnRegistryUid将原注册拉伸列误拼为…|text，导致已注册列被重复扣宽度，固定「操作」列前留白。修复方案为zs-table.vue按prop|label|前缀匹配stretchRegistry并在updated调用refreshColumnOrderKey()；buildinginfo/index.vue移除:key并补充:table-tr、:page-size。
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】zs-table列注册uid错致列表留白
【内容】根因：zs-table的getColumnRegistryUid将原注册拉伸列误拼为…|text，导致已注册列被重复扣宽度，固定「操作」列前留白。修复：zs-table.vue按prop|label|前缀匹配stretchRegistry并在updated调用refreshColumnOrderKey()；buildinginfo/index.vue移除:key并补充:table-tr、:page-size。
【验证证据】extracted source=cursor session=f3880ce0-50e7-4335-9e4c-3fc82e5e430c
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/buildinginfo/index.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/listMixins.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/table.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/zs-table/zs-table.vue ; d:/repository/苏州市房地产监测V3/.workbuddy/memory/2026-10-12.md ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/property/complex/index.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/zs-select-column/zs-select-column.vue
【来源会话ID】f3880ce0-50e7-4335-9e4c-3fc82e5e430c
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "zs-table列注册错误致留白",
  "goal": "记录留白修复",
  "summary": "用户指出zs-table的getColumnRegistryUid将原注册拉伸列误拼为…|text，导致已注册列被重复扣宽度，固定「操作」列前留白。修复方案为zs-table.vue按prop|label|前缀匹配stretchRegistry并在updated调用refreshColumnOrderKey()；buildinginfo/index.vue移除:key并补充:table-tr、:page-size。",
  "ranges": "12-18",
  "source_extraction_id": "62e739f9fbd44d8c9797fe8f5f5747e5",
  "version": 1,
  "memory_type": "events"
}
-->