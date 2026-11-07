# 法人证件号码校验 TypeError 修复
苏住房G 项目中 patterns/index.js 里 IDCardNumber 是校验函数而非正则，误用 .test() 导致的同类 TypeError 问题已全部修复。

## 问题根因
- patterns/index.js 中仅 IDCardNumber 是校验函数，其余 mobileNumber、emailAddress、moneyValidator 等均为正则
- 之前有 4 处文件误用 IDCardNumber.test() 触发 TypeError

## 修复内容
- 4 处误用 .test() 的文件已全部改为标准写法
- 全仓库已无 IDCardNumber.test 的调用残留
- 其余 patterns.xxx.test() 调用的是正则，用法正常不会触发同类 TypeError

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：patterns/index.js、AmountInput/index.vue、verifyRecord/index.vue、depositRegister/detail.vue
- 来源会话ID：c04c21a5-56cc-45fa-9f36-152f64faba9d

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "idcardnumber_test_typeerror",
  "source_extraction_id": "ed95a44e919c4b86bd75d9544ebd9b29",
  "version": 1,
  "memory_type": "entities"
}
-->