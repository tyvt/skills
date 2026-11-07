# threeData 为空时读取 companyNames 致 TypeError
threeData 初始为空数组，接口返回前 threeData[threeDataIndex] 为 undefined，模板直接读取 companyNames 引发 TypeError。

## 问题根因
- threeData 初始为空数组，接口返回前 threeData[threeDataIndex] 为 undefined
- 模板直接读取 .companyNames 引发 TypeError

## 解决方案
- 模板使用可选链 v-if="threeData[threeDataIndex]?.companyNames?.length"
- 数据绑定安全短路 :dataList="threeData[threeDataIndex]?.companyNames || []"

## 验证与归属
- 所属项目：bugfix
- 验证证据：extracted source=cursor project=bugfix
- 验证证据：src=bugfix/003.md
- 涉及文件：index.vue；vue.js
- 来源会话ID：57ee5fc8-b902-4632-8d17-f084cf9e6c5d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "threeData_companyNames",
  "source_extraction_id": "429aaedba67c4a77a524e32086f608a8",
  "version": 1,
  "memory_type": "entities"
}
-->