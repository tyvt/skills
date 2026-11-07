# Ref8443Inspection 防汛巡检组件
苏住房防汛C端移动端 H5 的防汛巡检页面 Vue 组件（src/components/flood/Ref8443Inspection.vue）。

## Description
- 用于汛前、汛中、汛后三阶段防汛巡检填报的页面组件
- 包含现场照片上传区与积水深度滑块

## Role
- 现场照片：汛前、汛中标题为「现场照片」，汛后为「图片凭证」，三处均显示 `0/6` 上传计数（label-small 灰色小字）
- 积水深度：5 级滑块（无/轻度积水/中度积水/重度积水/严重积水），滑到对应等级时下方展示橙色说明文字

## Relations
- 样式依赖 src/styles/ref8443.css（含 .label-small、.range-desc）
- 标准模板参考 inspection/index.vue

## Functions
- 在 ref8443 模式下由父组件 inspection/index.vue 渲染，仅加载该子组件
- 底部「暂存草稿」按钮位于子组件内，通过 saveDraft 的 @click 保存草稿
- 支持草稿恢复，applyRef8443Draft 负责将草稿数据（如 postRemarks）合并回表单
- 备注等 textarea 通过 v-model 绑定表单数据

<!-- MEMORY_FIELDS
{
  "category": "Vue组件",
  "name": "ref8443_inspection",
  "source_extraction_id": "0dc4ddbbb4104656a8713d73153427e5",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->