# chooseHouseDialog 未初始化选中数组致报错
苏州市房地产监测V3 中 chooseHouseDialog.vue 因 data 声明字段与 methods 使用字段不一致，未初始化时 undefined 调用 forEach 报错。

## 问题根因
- chooseHouseDialog.vue 的 data() 声明 selection.origin/target
- methods 使用 selectedOrigin/selectedTarget，未初始化为 undefined
- 调用 forEach 时空值报错

## 解决方案
- data() 增加 selectedOrigin:[] 与 selectedTarget:[] 并删除 selection
- onClose 重置数组
- handleDown/handleUp 空选时直接返回

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/069.md
- 涉及文件：chooseHouseDialog.vue、contractMainInfo/index.vue、contract-sign-helpers.js
- 所属项目：苏州市房地产监测V3；来源会话：62a1ffcb-1ad7-433b-9cc8-6f6f5585bd2e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "choose_house_selection",
  "source_extraction_id": "3d4e9b6847ad45a4ac86a62e72186090",
  "version": 1,
  "memory_type": "entities"
}
-->