# 祖先overflow裁剪下拉改fixed定位
祖先容器 `overflow:auto` 场景下下拉层被裁剪，改为 `position: fixed` 定位。

## 问题描述
- `zs-like-select.vue` 下拉层原为 `position: absolute`，在 `AddDialog.vue` 等祖先 `overflow:auto` 场景下被裁剪

## 解决方案
- 下拉层由 `position: absolute` 改为 `position: fixed`
- 依据输入框 `getBoundingClientRect()` 同步 `top/left/width`
- 监听滚动与 `resize` 事件重算位置

## 验证与归属
- 验证证据：src=2-0/012.md
- 涉及文件：zs-like-select.vue、AddDialog.vue
- 来源会话ID：e46496c1-c5d8-41f4-9fe7-15b3f4530f3a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dropdown_fixed_position_pattern",
  "source_extraction_id": "e1697a5b28f1459ca244bb8203dedf0c",
  "version": 1,
  "memory_type": "entities"
}
-->