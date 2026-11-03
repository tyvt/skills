# candidate_subtable_guard
筹备组征集详情中报名子表增删操作须受主表 bizState=2 与征集起止日期双重门禁约束的实现约定。
## 门禁规则
- 需从主表取 bizState === 2（已备案）后才允许操作报名信息子表。
- 再判断当前时间落在征集起止日期范围内，才开放新增/删除（含行内删除与区块右上角按钮）。
## 前后端校验
- 备案未通过或不在征集期内，前端禁用/隐藏操作。
- 后端增删接口做同样校验，避免子表单独可写而主单不满足业务条件。
## 验证与归属
- 验证：迁移业主自治后用户补充需主表 bizState=2 才能操作子表；需求原文要求备案成功且征集期内可维护。
- 涉及文件：zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateTable.vue、detail.vue
- 所属项目：园区公共收益；来源会话：9188dc08-2eb6-4f25-a62a-99cd041edbf7；代码基线：191094f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_subtable_guard",
  "source_extraction_id": "04f44256a020407aa30d82b50cc89746",
  "version": 1,
  "memory_type": "entities"
}
-->