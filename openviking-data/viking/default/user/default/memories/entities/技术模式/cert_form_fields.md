# 专业资格证书表单字段完善
苏州市房地产监测V3 专业资格证书管理详情表单按设计稿调整为14字段3列栅格并新增性别等字段。

## 改动背景
- 原表单字段未对齐设计稿，需修改 zhi2-web-admin/src/views/company/personnelCertificate/detail.vue
- 列表页 index.vue 列已与设计稿一致，无需改动

## 表单结构
- 最终14字段（3列栅格）：行1 姓名* name、证件号码* idNumber、性别* sex；行2 证书管理号* certificateCode、发证日期* issueDate、资格证书类型* certificateType；行3 证书级别* level、发证机关* issueOrgan、证书状态* certStatus；行4 联系电话 phone（非必填，仅填时校验 contactPhone 格式）、证书登记号 registrationNumber、证书登记日期 registrationDate；行5 证书登记从业机构 registrationOrgan；行6 备注 remark 整行
- 新增字段：性别（字典 sys_user_sex，必填；证件号码失焦且性别为空时反填逻辑在 utils/idCard.js）

## 验证与归属
- 验证：仅改动 detail.vue、index.vue、utils/idCard.js
- 所属项目：苏州市房地产监测V3；来源会话ID：3faee039-2b79-4d3e-be53-0d46273c923b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_form_fields",
  "source_extraction_id": "37bad7824c0e47148de04351dc784be5",
  "version": 2,
  "memory_type": "entities"
}
-->