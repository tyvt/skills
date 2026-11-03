# IDCardNumber误用test类型错误
苏住房G中patterns/index.js仅IDCardNumber为校验函数，误用.test()引发TypeError，已全仓库消除该误用。
## 问题根因
- patterns/index.js中仅IDCardNumber为校验函数（非正则），对其调用.test()引发TypeError
- 4处调用文件误用IDCardNumber.test()
## 解决方案
- 4处调用文件改为标准写法，全仓库消除IDCardNumber.test
- AmountInput/index.vue等其余正则.test()用法正常，无需改动
## 验证与归属
- 验证证据：src=苏住房G/033.md
- 涉及文件：patterns/index.js、companyInfo.vue、zs-form.vue、main.js、companyRegister/detail.vue、secondHouse/detail.vue、ResponseDialog.vue、companyManagement/components/detail.vue
- 来源会话：c04c21a5-56cc-45fa-9f36-152f64faba9d

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "idcard_test_typeerror",
  "source_extraction_id": "9045f3f234e04b8fad54878354d961ab",
  "version": 1,
  "memory_type": "entities"
}
-->