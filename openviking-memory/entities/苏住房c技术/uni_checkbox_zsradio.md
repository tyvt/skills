# uni-data-checkbox样式隔离需换ZsRadio
苏住房C市民端微信小程序中uni-data-checkbox因组件样式隔离，页面:deep无法改间距，须换自研ZsRadio。

## 问题现象
- guardApply表单「是否有电梯」选项间距改了三轮均不生效，图片上传组件间距却生效
- 用户原话「单选还是不行，运行环境是微信小程序」
- 仅全局uni.scss的.checklist-box{margin-right:0!important}生效，页面scoped与:deep均穿透不进

## 根因与解决
- 根因：uni-data-checkbox编译为独立自定义组件，微信样式隔离阻断页面样式穿透
- 做法：需精确控制单选/复选样式处直接换项目自研ZsRadio（圆圈文字10px、选项间1em）
- 个别页面加大间距通过传props或包裹类调，不覆盖u-*内部类
- 判断分水岭：改样式只有某控件不变，先断定是否uni_modules组件再决定换组件或走全局

## 验证与归属
- 验证会话2d5e45dc：用户三轮反馈未修复，结论为样式隔离换ZsRadio
- 涉及文件：pages_guard/guardApply/index.vue、step1.vue、step2.vue
- 所属项目：苏住房C；代码基线：6aca310；来源会话ID：2d5e45dc-c7a7-4161-9f6d-ee9bee35d68d

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "uni_checkbox_zsradio",
  "source_extraction_id": "28d9eabd30b54d718cb36189284f8f55",
  "version": 1,
  "memory_type": "entities"
}
-->