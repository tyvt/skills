# 苏住房C添加合同按钮UI修复
addHouseContract 页面「添加」按钮因布局与组件属性问题显示为窄条，已修复为全宽按钮。

## 问题根因
- 页面使用 display: flex; align-items: center，子元素被水平居中并收缩
- ZsButton 未设置 block，默认宽度塌陷成窄条
- class="long" 在项目中无对应样式，不起作用

## 修复方案
- 给按钮加 block 属性（组件内置全宽样式）
- 移除无效的 long 类
- 为 button 补充 width: 100%

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C；来源会话：af4e72e7-03c6-4e90-a546-a36ef38a5c56
- 涉及文件：src/pages_owner/house/owner/addHouseContract.vue、addHouse.vue、src/components/ZsButton/ZsButton.vue
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "addhousecontract_btn_fix",
  "source_extraction_id": "f36fa3e910da47929bc390966a09b6df",
  "version": 1,
  "memory_type": "entities"
}
-->