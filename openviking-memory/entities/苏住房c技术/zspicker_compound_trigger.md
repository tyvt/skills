# ZsPicker 复合按钮触发器不响应
苏住房C 小程序中 ZsPicker 作为「图标+文字」复合按钮触发器时，仅内部文字区绑事件，外层容器无事件，导致整块点不动。

## 问题现象
- 「我的 → 电子业主卡」右上角「切换」按钮点不动，无任何响应也无报错。

## 根因
- 切换按钮由图标 + ZsPicker 组成，只有 ZsPicker 内部很小的文字区域绑了 @click，外层 .switch-btn 没绑事件，点图标区域等于没点。
- ZsPicker 加了 virtualHost 后，在绝对定位的 flex 布局里内部点击更容易失效。

## 解决方案
- 给整个按钮容器绑 @tap="openHousePicker"（小程序统一用 @tap 而非 @click）。
- ZsPicker 通过 defineExpose 暴露 show 方法，由父组件调用，不再依赖点中内部文字。
- 按钮内嵌的 picker 设 pointer-events: none，避免事件被内部元素拦截。
- 顺带排查同类「恢复上次选中」逻辑：findIndex(...) > 0 会把合法的首项 index 0 排除，必须写 >= 0。
- 结论：凡是用 ZsPicker 做「图标 + 文案」复合按钮，一律按上述四点实现，不要指望组件内部可点区域。

## 验证与归属
- 验证：会话 16685517：用户报「小程序：我的-电子业主卡-切换无响应」。修复 ownerCard/index.vue 给整块切按钮绑 @tap，ZsPicker 增 defineExpose 暴露 show，按钮内 picker 设 pointer-events:none，并把 findIndex > 0 改为 >= 0 以正确恢复上次选中房屋。
- 涉及文件：src/pages_owner_extra/ownerCard/index.vue、src/components/ZsPicker/ZsPicker.vue。
- 所属项目：苏住房C；来源会话ID：16685517-eda4-4fc5-8357-db2568f09adb；代码基线：b7bf813。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zspicker_compound_trigger",
  "source_extraction_id": "55b2f7ec05614bdf8869f3a530457f35",
  "version": 1,
  "memory_type": "entities"
}
-->