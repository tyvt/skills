# 人员详情硬依赖路由meta致流程未维护
原 `AgencyPersonnelDetail.vue` 等使用 `this.$route.meta?.busCode || ''` 硬依赖路由 meta，菜单未配或错配致 `ensureFlowConfigured` 查 `/flowable/flowConfig/list` 无果报"审核流程未维护完成"。

## 问题根因
- 多个人员详情页组件硬依赖 `this.$route.meta?.busCode`
- 菜单未配置或错配路由 meta 时 `busCode` 为空
- `ensureFlowConfigured` 查询 `/flowable/flowConfig/list` 无果报"审核流程未维护完成"

## 解决方案
- 改用 `resolvePersonnelAppendixBusCode` 解析路由
- 缺失或错配时回退默认值 `jgcyryba`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/090.md
- 涉及文件：mixins/approval.js、utils/flowApi.js、personnelRecordApply/detail.vue、personnelRecord/detail.vue、personnelRecord/components/detail.vue、ZsSubmit/index.vue、personnel-record-menu-routes.json、api/company/personnelRecord.js
- 所属项目：苏州市房地产监测V3；来源会话：01a16313-8300-70c5-a400-7657726e0e84；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "personnel_detail_route_meta",
  "source_extraction_id": "8ed586693555450a9c1dcbba0fb39408",
  "version": 1,
  "memory_type": "entities"
}
-->