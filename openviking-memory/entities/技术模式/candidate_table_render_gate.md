# 候选人征集报名信息表渲染与管理的备案门禁
园区公共收益项目(zhi2-web-admin)中 detail.vue 的 CandidateTable 需按业务类型在 bizState==2（已备案）时才渲染，且管理报名须已备案且在征集期内。

## 渲染门禁
- 原 detail.vue 中 CandidateTable 的 v-if 绑定 formMode != 'add'，导致筹备组/候选人征集新增保存后未备案时错误展示报名信息
- 新增计算属性 showCandidateTable，针对 PREPARATORY_GROUP（筹备组征集）与 COLLECT（候选人征集）场景限定 bizState == 2 才渲染，模板 v-if 改绑该属性
- 后续补充 COLLECT 类型的 bizState == 2 显隐拦截，彻底避免新增保存后误显 CandidateTable

## 管理权限对齐
- CandidateTable.vue 的 canManageApply 对齐筹备组逻辑，限制已备案且征集期内才可管理报名
- 涉及 enums.js、detailMixins.js、subTableMixins.js、form.js 等逻辑协同

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：src=园区公共收益/032.md、src=园区公共收益/033.md
- 来源会话：4686b4cc-9df1-4168-a0c5-e5e69fe7b2df、37dbc28a-32eb-4a0c-a154-c7353dc061f8；代码基线：none
- 所属项目：园区公共收益
- 涉及文件：detail.vue、CandidateTable.vue、enums.js、detailMixins.js、subTableMixins.js、form.js、OperationBtnGroup/index.vue 等

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_table_render_gate",
  "source_extraction_id": "13c16ab160ac4869a18df923a3d00ffb",
  "version": 1,
  "memory_type": "entities"
}
-->