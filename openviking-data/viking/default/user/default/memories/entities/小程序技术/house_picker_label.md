# 房屋选择器标签展示逻辑
formatPortalHousePickerLabel 控制 externalWebview.vue 与 home.vue 的房屋 picker 标签展示。

## 变更说明
- 修改前：展示「小区名 + address」拼接，或仅展示小区名
- 修改后：有 address 时直接展示 address 完整中文地址；无 address 时回退 complexName（或「我的房屋」）

## 调用关系
- externalWebview.vue 与 home.vue 均通过 getPortalHousePickerLabels 调用该函数
- 两处 picker 一并生效

## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 涉及文件：utils/portal-user.js、externalWebview.vue、home.vue
- 来源会话：fcf4ca3d-d26a-4766-bee4-2c1f57b061cf
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "house_picker_label",
  "source_extraction_id": "d724a33faad04a55a64d07ba768c13fb",
  "version": 1,
  "memory_type": "entities"
}
-->