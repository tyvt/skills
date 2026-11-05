# 接口异常致租赁表单空白分析
宿迁苏服办 leaseContract 模块在接口异常时部分步骤表单出现“空白”效果。

## 现象
- 步骤1（stepHouseInfo.vue）：接口异常不会整体空白，但字段全为 -/空选中/空输入；新增查询分支若 res.result 缺失可能抛异常中断渲染
- 步骤4（合同约定 index.vue）：contractShow 不因异常置 true，因 v-else-if="curValue == 4 && contractShow" 该步骤直接不渲染（真空白）

## 根因
- stepHouseInfo.vue 对 detailData 的 watch：默认值 {} 为 truthy，if(val) 判断会把 otherData 字段赋值成 undefined

## 验证与归属
- 涉及文件：src/pages/leaseContract/stepHouseInfo.vue、index.vue（宿迁苏服办）
- 来源会话：f57d7e7f-9439-484d-b703-784cb50ce8c1
- 所属项目：repository；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_api_blank",
  "source_extraction_id": "c8d3cef8b2f248fc83df6e71434716c5",
  "version": 1,
  "memory_type": "entities"
}
-->