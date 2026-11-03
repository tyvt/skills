# 证件校验未分类型致统一信用代码失败
addPersonInfo.vue 证件号码仅按二代身份证正则校验，未区分类型导致统一社会信用代码校验失败。

## 问题根因
- 证件号码仅按二代身份证正则校验，未区分证件类型
- 统一社会信用代码（USCI）因未分流校验而失败

## 解决方案
- 新增 src/utils/documentNumber.js 按字典值 001/002 分流 USCI 正则校验
- addPersonInfo.vue 校验改用 data.idCardType
- 保存前 trim 转大写、切换类型重校验

## 验证与归属
- 验证证据：src=宿迁苏服办/001.md
- 涉及文件：src/pages/leaseContract/addPersonInfo.vue、src/utils/constant.js、src/pages/publishHouse/verification.vue、src/pages/leaseContract/stepStipulation.vue、src/pages/leaseContract/stepTenantry.vue、src/utils/formatter.js、src/utils/index.js、src/api/common.js
- 所属项目：宿迁苏服办；来源会话：ef4f394b-9e37-4c4c-ad3e-89cb882a2ea1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "docnum_type_validation",
  "source_extraction_id": "27867a746efe4299a0f31f9b4c78b5d9",
  "version": 1,
  "memory_type": "entities"
}
-->