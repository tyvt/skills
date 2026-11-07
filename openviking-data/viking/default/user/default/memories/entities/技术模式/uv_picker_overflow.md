# uv-picker可见项过多致弹窗超高按钮溢出
家园区一网通办中 uv-picker 因可见项过多导致弹窗超高、底部按钮溢出视口。

## 现象与根因
- uv-picker 滚动高度 visibleItemCount × itemHeight 原设 10×132rpx，小屏致「取消」「确定」溢出

## 解决方案
- 改 visibleItemCount 为 5（同 BuildingUnitSelector）减半高
- 或 6 对齐 utilityCard 选择器

## 关键文件
- 页面：src/pages-suggest/list.vue、src/pages/components/home/utilityCard.vue、src/pages-suggest/components/HousePicker.vue
- 组件：node_modules/@climblee/uv-ui/components/uv-picker/uv-picker.vue、node_modules/@climblee/uv-ui/components/uv-picker/props.js
- 样式：src/style/index.scss

## 验证与归属
- 验证证据：extracted source=cursor session=c66ac2c2-23b0-43c1-a77b-05a1191d8858
- 所属项目：家园区一网通办
- 来源会话：c66ac2c2-23b0-43c1-a77b-05a1191d8858

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uv_picker_overflow",
  "source_extraction_id": "fa36a86ca91144a4b5b4d20b83026084",
  "version": 1,
  "memory_type": "entities"
}
-->