# ZsPopup弹窗顶部蓝色边角修复
苏住房C小程序修复所有 `ZsPopup` 弹窗顶部蓝色方角问题，改动对所有使用 `ZsPopup` 的页面全局生效。

## 修改内容
- 删除 `.popup-container::after` 顶部装饰伪元素（60×60 占位，是蓝色方角主要来源）
- 新增 `.popup-container { overflow: hidden; }`，裁剪圆角外溢背景
- 规范 `uni-popup` 背景：内联 `style` 改为 `background-color="transparent"` prop
- 兜底增加 `:deep(.uni-popup__wrapper) { background: transparent !important; }`

## 验证与归属
- `npm run build` 通过，`validate-dist` 正常
- 需在微信开发者工具重新导入 `dist`，打开「添加房屋（业主）」页触发「核验失败」弹窗确认无蓝色方角
- 涉及文件：ZsPopup.vue、pages_owner/house/owner/addHouse.vue
- 所属项目：苏住房C；来源会话ID：9b073154-cc39-42ea-a983-a2a4c7876b10

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zspopup_corner_fix",
  "source_extraction_id": "aba249f47836403c914050f6abb992f1",
  "version": 1,
  "memory_type": "entities"
}
-->