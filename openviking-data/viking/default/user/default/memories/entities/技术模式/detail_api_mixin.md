# 详情接口须用mixin禁自定义
苏州市房地产监测V3中多个详情页删除自定义getDetail改用mixin，维护模块统一POST ${url}/detail含动态主键。

## 修复方案
- benefit/pubManagementOrg/detail.vue 与 indemnity/product/detail.vue 删除自定义 getDetail() 改用 mixin 及 detailApiFull
- cbyh/components/YhwdTable.vue 删除接口改调 delYhwdgl() 至 POST /prefund/bankBranch/delete
- maintenance 模块详情统一 POST ${url}/detail 并含动态主键

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/019.md
- 涉及文件：路由信息.json、cbyh/detail.vue、cbyh/index.vue、detailMixins.js、form.js、api/zjjg/xy.js、jgwd/detail.vue、wtjgxy/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：5f12d6ca-c193-45eb-984f-d206aaa583d3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_api_mixin",
  "source_extraction_id": "c77880165b094fe3a94ba8cb2b5fcca5",
  "version": 1,
  "memory_type": "entities"
}
-->