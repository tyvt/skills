# 级联组件 region 非必填兼容默认值
location-cascader.vue 移除 region 的 required: true 避免告警，新增 defaultValue 兼容逗号字符串或数组实现回显。

## 问题现象
- location-cascader.vue 中 region 设为 required: true，未传 prop 时产生告警
- 原逻辑无法兼容外部传入的逗号字符串或数组默认值

## 修复方案
- 移除 region 的 required: true 避免未传 prop 告警
- 新增 defaultValue 兼容逗号字符串或数组
- syncSelectedPathFromProps 优先用 region，否则解析 defaultValue 末级编码，areas 加载后二次同步
- eorg/detail.vue 的 setErogName 写入 form.provinceCityArea 实现选机构后区划回显

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/138.md
- 涉及文件：location-cascader.vue、eorg/detail.vue、main.js、companyRegister/detail.vue、institution/company/index.vue、BuyerDialog.vue、DeveloperBasicInfoForm.vue、api/eorg/eorg.js
- 所属项目：苏州市房地产监测V3；来源会话：e660a1c1-9825-434a-be21-3120be9ea83f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "location_cascader_region",
  "source_extraction_id": "c15196f322ff4716b99fce5066c00e99",
  "version": 1,
  "memory_type": "entities"
}
-->