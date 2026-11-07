# 电子业主卡切换按钮无响应修复
苏住房C小程序「我的-电子业主卡」页面切换按钮无响应问题已修复，涉及ownerCard/index.vue与ZsPicker组件。
## 问题根因
- 外层 `switch-btn` 未绑定点击事件，点图标区域不触发操作
- 仅 ZsPicker 内部很小文字区域绑定 `@click`，可点击范围过小
- ZsPicker 加 `virtualHost` 后在绝对定位 flex 布局里内部点击更易失效
- 恢复上次选中房屋用 `findIndex(...) > 0`，导致列表第一项（index 0）无法正确恢复
## 修复内容
- `ownerCard/index.vue` 给整个切换按钮绑定 `@tap="openHousePicker"`
- `ZsPicker.vue` 通过 `defineExpose` 暴露 `show` 方法供父组件调用
- 切换按钮内 picker 设 `pointer-events: none`，避免事件被内部拦截
- 逻辑将 `> 0` 改为 `>= 0`，正确恢复上次选中房屋
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 重新编译后进入「我的→电子业主卡」点右上角「切换」应弹出房屋列表
- 涉及文件：ownerCard/index.vue、ZsPicker.vue、MenuSection.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：16685517-eda4-4fc5-8357-db2568f09adb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "owner_switch_fix",
  "source_extraction_id": "92d5861c1a484f0989ce3fb58fc3482b",
  "version": 1,
  "memory_type": "entities"
}
-->