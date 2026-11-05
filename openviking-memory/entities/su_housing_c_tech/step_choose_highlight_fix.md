# 选项表决选中背景色修复
苏住房C小程序中`optional/StepChoose.vue`选中项无背景色，因`:deep`无法穿透ZsCheckbox，已新增highlight属性修复。

## 问题原因
- `StepChoose.vue`用`:deep(.checkbox-item.active)`设置选中背景
- 微信小程序里父组件`:deep`无法穿透`ZsCheckbox`子组件
- 勾选图标正常但背景色不生效

## 修改内容
- `ZsCheckbox.vue`新增`highlight`属性，在组件内部实现选中背景色
- `StepChoose.vue`使用`<ZsCheckbox highlight>`，移除无效`:deep`样式
- 选中项显示浅蓝背景`rgba(19,84,190,0.08)`与主题色文字

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`StepChoose.vue`、`ZsCheckbox.vue`、`RadioGroup.vue`
- 来源会话ID：6c34628f-3890-4a06-bd38-781e0d7ab64e

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "step_choose_highlight_fix",
  "source_extraction_id": "72981d96a43e4556801acb220899f2b0",
  "version": 1,
  "memory_type": "entities"
}
-->