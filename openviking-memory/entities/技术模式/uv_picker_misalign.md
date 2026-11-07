# uv-picker内联rpx覆盖指示器致H5滚动错位
家园区一网通办中 main.ts 设 uni.$uv.config.unit 为 rpx，使 uv-picker 输出内联 height/line-height，优先级高于 picker-view 的 --picker-view-column-indicator-height 变量，导致 H5 滚动步长与渲染错位。

## 问题根因
- main.ts 设置 uni.$uv.config.unit = 'rpx'
- uv-picker 据此输出内联 height/line-height
- 内联样式优先级高于 picker-view 的 --picker-view-column-indicator-height 变量
- 症状：滚动按指示器高度算、选项按 rpx 渲染，最后一项往往滚不到中间选中框，只能点选
- 与 DCloud 社区「不要给 picker 项单独设 height/line-height」结论一致

## 解决方案
- 在 src/style/index.scss 增加仅 H5 生效的全局样式强制行高对齐指示器

## 关键文件
- 入口配置：src/main.ts
- 全局样式：src/style/index.scss
- 业务组件：src/pages/components/home/utilityCard.vue
- 依赖组件：node_modules/@climblee/uv-ui/components/uv-picker/uv-picker.vue（含 props.js）
- 日期选择：node_modules/@climblee/uv-ui/components/uv-datetime-picker/uv-datetime-picker.vue

## 验证与归属
- 验证证据：extracted source=cursor project=家园区一网通办
- 验证证据：cursor session=41177f64-7f64-43f6-ba36-e6c57614adea
- 所属项目：家园区一网通办
- 来源会话：41177f64-7f64-43f6-ba36-e6c57614adea

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uv_picker_misalign",
  "source_extraction_id": "db3398da656b41a4955e049848ba9a61",
  "version": 2,
  "memory_type": "entities"
}
-->