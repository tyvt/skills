# housePickerLabels 中文使用 address 字段
formatPortalHousePickerLabel 生成的 housePickerLabels 中文直接使用房屋的 address 字段。

## 调用范围
- externalWebview.vue 与 home.vue 都通过 getPortalHousePickerLabels 调用，两处 picker 一并生效

## 验证与归属
- 验证证据：012.md 会话 fcf4ca3d：housePickerLabels 展示中文用 address
- 涉及文件：utils/portal-user.js
- 来源会话ID：fcf4ca3d-d26a-4766-bee4-2c1f57b061cf
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "house_picker_addr",
  "source_extraction_id": "29f1cf776e8946a0b898be26f32b1089",
  "version": 1,
  "memory_type": "entities"
}
-->