
# ZsPicker宽度不足全局修复
苏住房C 表单 picker 因 `ZsPicker` 组件 `width: 97%` 导致右侧留白，已全局修复。

## 问题根因
- `ZsPicker` 组件里写了 `width: 97%`，导致表单里的 picker 右侧留白

## 修复要点
- `ZsPicker.vue`：`width: 97%` → `width: 100%`；使用 `justify-content: space-between`，文字区 `flex: 1`，箭头 `flex-shrink: 0` 贴右；长文本增加省略号避免挤压布局
- `form2.scss`（所有引用表单的页面）：`:deep(.zs-picker)`、`:deep(.zs-daterange-picker)` 统一 `width: 100%`
- `uni.scss`（全局）：`.zs-picker`、`.zs-daterange-picker` 统一 `width: 100%`
- 个别页面需要窄 picker（如物业页 `fit-content`），页面内 `:deep` 覆盖仍生效

## 涉及文件
- src/components/ZsPicker/ZsPicker.vue
- src/styles/form2.scss
- src/uni.scss
- src/pages_owner/authentication/components/FamilyAdd.vue
- src/App.vue
- src/styles/index.css

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：f0787ce5-27a4-4cf2-8c49-60dade6711ac；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_picker_fix",
  "source_extraction_id": "81e24c7fac0540d9acc9252dc29ce269",
  "version": 1,
  "memory_type": "entities"
}
-->