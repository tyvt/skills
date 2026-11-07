# 数字输入框与步进按钮边框修复
产品2.0（zhi2-web-admin）中数字输入框圆角被步进按钮遮挡、列表卡片内容溢出，已修复。

## 问题根因
- 数字输入框 `.el-input__inner` 设成 `border-radius: 4px 0 0 4px`，右侧圆角被去掉
- 步进按钮用 `top/right/bottom: 0` 贴边，盖住输入框右侧外边框
- 列表卡片（`list-card`）缺少 `overflow: hidden` 和 `box-sizing: border-box`，表格内容溢出遮挡右侧边框和圆角

## 修复方案
- 恢复输入框四角完整 `border-radius: 4px`
- 步进按钮改为 `top/bottom/right: 1px`，高度 `calc(50% - 1px)`，在边框内侧贴合、不留空隙
- 按钮圆角改为 `3px`，与内侧边框对齐
- 列表卡片增加 `overflow: hidden` 和 `box-sizing: border-box`

## 涉及文件
- property/complex/components/RegionTreeLayout.vue
- benefit/pubParkingRate/index.vue
- benefit/pubParkingRate/detail.vue
- 所属项目：产品2.0；来源会话：5bb61819-6c43-4252-b895-b382e5a2b5f4；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "number_input_stepper_fix",
  "source_extraction_id": "cfc319a7d4474bb0b0c37ae22cfe0157",
  "version": 1,
  "memory_type": "entities"
}
-->
