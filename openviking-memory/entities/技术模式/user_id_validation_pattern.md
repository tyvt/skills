# 用户管理证件号码必填且校验身份证格式
苏州市房地产监测V3 中用户管理新建与编辑缺失证件类型及号码必填校验，需补充规则并校验身份证格式。

## 问题根因
- 用户管理新建与编辑缺失 `idType`、`idNumber` 必填校验
- 居民身份证号未做格式校验，输入框未限制长度与去空格

## 修复方案
- `system/user/detail.vue` 补充 `idType`、`idNumber` 必填规则
- 居民身份证（`idType == '01'`）应用 `patterns.IDCardNumber` 校验
- 输入框采用 `v-model.trim` 与 `maxlength="30"`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/153.md
- 涉及文件：system/user/detail.vue、mixins/detailMixins.js、api/system/user.js、toB/adminOperator/detail.vue、toB/shareholder/detail.vue、patterns/index.js、utils/idCard.js、toB/personnelRecord/components/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：d8de2201-0386-432e-a286-0c4c77fb5d4f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_id_validation_pattern",
  "source_extraction_id": "c0498ba19aef4c5095e6c258c82f91ce",
  "version": 1,
  "memory_type": "entities"
}
-->