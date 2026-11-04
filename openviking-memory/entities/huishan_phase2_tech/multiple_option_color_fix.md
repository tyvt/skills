# 多议题表决选项着色修复
惠山二期H5 多议题表决中多选议题选项名着色由原写死深灰改为按选项名动态映射。

## 问题根因
- 单选议题（optionType '0'）「我的选择」按选项名着色：同意绿 / 不同意红 / 弃权橙
- 多选议题（optionType '1'）列表原写死 color-333，弃权显示为深灰

## 解决方案
- 模板改为动态类，脚本新增统一映射 OPTION_NAME_COLOR
- optionNameColorClass 函数：isWaiver 返回弃权色，否则按 decisionOptionName 映射，缺省 font-color-333

## 涉及文件
- src/pages_owner/decision/components/multiple/ViewOptionsList.vue
- src/pages_owner/decision/components/multiple/OptionCardList.vue
- src/utils/decisionWaiver.js

## 验证与归属
- 验证证据：extracted source=workbuddy session=6259238b-24db-44f1-84cf-3e1a431e735b
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：6259238b-24db-44f1-84cf-3e1a431e735b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "multiple_option_color_fix",
  "source_extraction_id": "0a2d84477c6e4d33ab1ebb4f3244c34d",
  "version": 1,
  "memory_type": "entities"
}
-->