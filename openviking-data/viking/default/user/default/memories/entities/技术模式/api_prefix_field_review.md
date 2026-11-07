# 外部接口路径前缀核对与下线必填项全链路审查
[苏房G] 补外部接口路径前缀前先核对项目 /system 约定；下线必填项要同时审 prop 空壳与 skip-check 连带失效。

## 经验一：外部接口路径前缀不可照抄
- 文档写 /api/v2.0/streetBankPolicy，本项目后端实际映射 /v2.0/system/streetBankPolicy（/system 属项目约定）。
- 先在同目录/工具模块找已知正确同族接口当锚点（如 utils/workBank.js 的 QUERY_START_BANK_URL）。
- 按「路径字面量在几个文件重复」列清单逐个改；共享 utils 已正确的不动；反向给出「无需修改」及理由。

## 经验二：下线必填项不止删 rules
- 逐条确认五处：rules 是否还有该字段；<el-form-item prop> 是否无对应 rule（确定不校验就去掉 prop）。
- beforeSaveHook / ZsSubmit before-submit 自定义校验是否还引用；提交走内置还是自定义 ZsSubmit（:show-submit=false 会跳过 getAnnexConfig 要件检查）。
- 后端是否仍校验（前端仓库无后端源码须找后端约定一致，否则前端可点接口报错）；编辑态 UI 与提交路径要对称。

## 验证与归属
- 验证：会话 70f1e4be 文档路径与实际映射不符改常量；会话 cc5e8ba6 删 agreementBizId 必填后审查出 prop 无 rule、ZsSubmit skip-check 等。
- 涉及文件：regionBankAuth/index.vue、StreetAuthDialog.vue、utils/workBank.js、detail.vue、regionBankAuthChange/detail.vue。
- 所属项目：苏住房G；来源会话：70f1e4be-4f65-4534-a061-8fc1d7eecbb7, cc5e8ba6-a3d7-462f-b22c-bcd15cfb22af；代码基线：c176892。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "api_prefix_field_review",
  "source_extraction_id": "ea2994fc67214b8b8e95709cd8977d46",
  "version": 1,
  "memory_type": "entities"
}
-->