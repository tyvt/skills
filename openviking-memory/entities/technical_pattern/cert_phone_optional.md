# 专业资格证书联系电话非必填
苏州市房地产监测V3 中专业资格证书管理（新增/编辑页）的「联系电话」移除必填校验，仅保留填时格式校验。

## 修改内容
- 修改文件：`zhi2-web-admin/src/views/company/personnelCertificate/detail.vue`（专业资格证书管理-新增/编辑页）
- `phone`（联系电话）校验规则移除 `required: true`，仅保留 `contactPhone` 正则格式校验（填了才校验格式，留空放行）

## 影响与排查
- 联系电话变为非必填，红色星号随规则自动消失
- 已排查 `staffManagement` 下的证书弹窗，均无联系电话字段，无需其他改动

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话ID：ec28a610-b81f-46da-83fd-dca3dbf806da；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "cert_phone_optional",
  "source_extraction_id": "37bad7824c0e47148de04351dc784be5",
  "version": 1,
  "memory_type": "entities"
}
-->