# 证件校验未分类型致统一信用代码失败
addPersonInfo.vue 证件号码仅按二代身份证正则校验，未区分类型导致统一社会信用代码校验失败，提示「证件号码格式不正确」。

## 问题根因
- 证件号码仅按二代身份证正则校验，未区分证件类型
- 统一社会信用代码（USCI）是 18 位字母数字组合，几乎不可能通过身份证规则，因此校验失败

## 解决方案
- 新增 src/utils/documentNumber.js 按字典值分流校验：001=二代居民身份证，002=统一社会信用代码（采用与监测 V3 相同的 USCI 正则，并排除被误判的身份证号）
- addPersonInfo.vue 校验改用 data.idCardType
- 保存前 trim 并转大写；切换证件类型时重新校验证件号

## 验证与归属
- 验证证据：extracted source=cursor project=宿迁苏服办
- 验证方式：重新编译/刷新 H5 后，选「统一社会信用代码」输入 18 位代码（可含字母，会自动转大写）
- 若仍失败，确认字典里该类型 value 是否为 002（与后端 transaction_idNumberType 一致）；若宿迁环境用其他编码，提供具体值以对齐
- 验证证据：src=宿迁苏服办/001.md
- 涉及文件：src/pages/leaseContract/addPersonInfo.vue、src/utils/documentNumber.js、src/utils/constant.js、src/pages/publishHouse/verification.vue、src/pages/leaseContract/stepStipulation.vue、src/pages/leaseContract/stepTenantry.vue、src/utils/formatter.js、src/utils/index.js、src/api/common.js
- 所属项目：宿迁苏服办；来源会话：ef4f394b-9e37-4c4c-ad3e-89cb882a2ea1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "docnum_type_validation",
  "source_extraction_id": "57adfb7930cd48c3a63051bac4c8af14",
  "version": 2,
  "memory_type": "entities"
}
-->