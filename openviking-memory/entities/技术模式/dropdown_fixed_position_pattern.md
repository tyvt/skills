# 祖先overflow裁剪下拉改fixed定位（zs-like-select）
祖先容器 `overflow:auto` 场景下下拉层被裁剪，改为 `position: fixed` 定位。

## 问题描述
- `zs-like-select` 下拉层原为 `position: absolute`，在 `AddDialog.vue` 等祖先 `overflow:auto` 场景下被裁剪
- dialog body 设 overflow:auto 时，下拉列表被父级裁剪或定位错位

## 解决方案
- 下拉层由 `position: absolute` 改为 `position: fixed`（固定覆盖层），绕开祖先 `overflow:auto` 裁剪
- 打开时依据输入框 `getBoundingClientRect()` 计算并同步 `top/left/width`
- 监听弹窗滚动与 `window` 的 `scroll/resize`，滚动时自动重算坐标，保证位置跟随输入框

## 验证与归属
- 验证：长表单 dialog 内打开 like-select，滚动 dialog 后下拉仍贴齐输入框且不被裁切；也可打开弹窗，光标点到“资金专户/资金专户名称”附近靠下位置，确认下拉完整显示且弹窗滚动不受影响
- 涉及文件：zhi2-web-admin/src/components/zs-select/zs-like-select.vue（亦称 index.vue）、AddDialog.vue
- 所属项目：2-0；来源会话：e46496c1-c5d8-41f4-9fe7-15b3f4530f3a、7f3a94cb-8b2a-4c1e-9d3e-4f8a1b2c3d4e；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dropdown_fixed_position_pattern",
  "source_extraction_id": "2aa332ea5aa44f9da068c10bd4812892",
  "version": 2,
  "memory_type": "entities"
}
-->