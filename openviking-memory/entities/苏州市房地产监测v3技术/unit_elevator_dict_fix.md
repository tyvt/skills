# 单元列表有无电梯列误用sys_include显0
单元管理、楼盘表单元、单元变更列表的「有无电梯」列错误使用 sys_include 字典，无匹配值显示原始值0。

## 问题根因
- unitinfo/index.vue、building/unit/index.vue、building/unitChange/index.vue 的「有无电梯」列误用 sys_include 字典
- 无匹配字典值时显示原始值 0 而非语义文本

## 修复方案
- 改为 have_or_not 字典（预售方案模块 permitConstants.js 已定义）
- 需确保字典管理 dictValue 与接口返回一致

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/324.md
- 涉及文件：unitinfo/index.vue、building/unit/index.vue、building/unitChange/index.vue、presale/permit/permitConstants.js、unitinfo/detail.vue
- 所属项目：苏州市房地产监测V3
- 来源会话ID：4676abc6-8d97-4393-94eb-00860b189dc6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "unit_elevator_dict_fix",
  "source_extraction_id": "2a864028af814491ba471786ba13e88c",
  "version": 1,
  "memory_type": "entities"
}
-->