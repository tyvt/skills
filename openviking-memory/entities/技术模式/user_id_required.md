# 用户证件号码必填改造
苏州市房地产监测V3 项目用户管理详情页已实施证件类型与证件号码必填校验。

## 改动说明
- 修改文件：`zhi2-web-admin/src/views/system/user/detail.vue`
- form 初始字段补充 `idType`、`idNumber`
- 校验规则：`idType` 必填提示「证件类型不能为空」，`idNumber` 必填提示「证件号码不能为空」
- 当 `idType == '01'`（居民身份证）时使用 `patterns.IDCardNumber` 校验 15/18 位格式
- 输入框采用 `v-model.trim` + `maxlength="30"`，字段标签显示红色必填星号

## 验证建议
- 新建/编辑用户不填证件号码应拦截；选居民身份证填非法号码提示格式错误
- 填写合法信息可正常提交

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`system/user/detail.vue`、`mixins/detailMixins.js`
- 来源会话ID：d8de2201-0386-432e-a286-0c4c77fb5d4f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_id_required",
  "source_extraction_id": "6affe7798e984e8fa21981f899b7139f",
  "version": 1,
  "memory_type": "entities"
}
-->