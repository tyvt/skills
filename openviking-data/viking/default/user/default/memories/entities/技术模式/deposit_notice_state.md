# 其他缴款列表误留通知书状态筛选及列
苏州市房地产监测V3 其他缴款列表冗余通知书状态查询与列，已删除。

## 问题根因
- `zhi2-web-admin/src/views/supervision/deposit/other_record/index.vue` 冗余「通知书状态」查询与列，与需求不符

## 修复方案
- 删除 `queryParams.noticeState`、`NOTICE_STATE` 字典及 `bizStateOptions`/`initDict`
- 保留业务状态列由 `dictUrl` 加载

## 验证与归属
- 验证证据：extracted source=cursor session=8bc96e81-df3b-476d-a858-548ef9a4cd61
- 涉及文件：d:/repository/苏州市房地产监测V3/路由信息.json、d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/deposit/other_record/index.vue
- 来源会话ID：8bc96e81-df3b-476d-a858-548ef9a4cd61；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_notice_state",
  "source_extraction_id": "7fed42c0b2674fd1a74d910b81296118",
  "version": 1,
  "memory_type": "entities"
}
-->