# 机构人员新增页隐藏要件上传
苏州市房地产监测V3 项目中调整机构人员详情（`AgencyPersonnelDetail.vue`）编辑表单，新增页不显示要件上传区块。
## 修改内容
- 为「要件上传」区块增加 `v-if="formMode !== 'add'"` 条件
- 新增页（`formMode === 'add'`）隐藏；编辑页（保存草稿后 `edit`）与查看页（`view`）正常显示
- 列表页「提交备案」前的要件校验逻辑未改动
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`AgencyPersonnelDetail.vue`、`detail.vue` 等
- 所属项目：苏州市房地产监测V3；来源会话ID：01ec4000-abc2-413c-9bfb-a006f9dbb8f8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_add_upload",
  "source_extraction_id": "304d2d75b409484e82e286701584b3b9",
  "version": 1,
  "memory_type": "entities"
}
-->