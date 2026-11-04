# index.vue 访问未就绪 threeData 项致 companyNames 报错
index.vue 模板直接访问 `threeData[threeDataIndex].companyNames`，在接口返回前 `threeData` 初始为空数组，项不存在时抛 `Cannot read properties of undefined (reading 'companyNames')`。

## 问题根因
- `threeData` 初始值为空数组 `[]`，接口返回前 `threeData[0]`/`threeData[1]` 均为 `undefined`
- 模板里写 `threeData[threeDataIndex].companyNames`，在 `undefined` 上读 `companyNames` 报错
- 堆栈中 `index.vue:789` 为编译后行号，对应模板里对 `companyNames` 的访问

## 解决方案
- `v-if` 改为 `threeData[threeDataIndex]?.companyNames?.length`，元素不存在时安全短路
- `:dataList` 改为 `threeData[threeDataIndex]?.companyNames || []`，未就绪时不传 `undefined`
- 数据未加载或仅部分项时显示 `el-empty`，不再抛错

## 验证与归属
- 验证证据：extracted source=cursor project=bugfix
- 涉及文件：index.vue；vue.js
- 来源会话ID：57ee5fc8-b902-4632-8d17-f084cf9e6c5d
- 所属项目：bugfix；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "threedata_companynames_undefined",
  "source_extraction_id": "20272dbf54aa4840a79ddd749472adaa",
  "version": 1,
  "memory_type": "entities"
}
-->