# Ref8443Inspection
苏住房防汛C端移动查询H5项目中的汛情巡查上传组件（Vue 文件：src/components/flood/Ref8443Inspection.vue）。

## Description
- 负责汛前、汛中、汛后三阶段现场照片与备注信息的采集展示
- 配套样式文件为 src/styles/ref8443.css

## Structure
- 汛前区块：现场照片上传区 + 格式说明 + PhotoPicker
- 汛中区块：险情说明文本域(L254) + 现场照片上传区 + 格式说明 + PhotoPicker + 备注文本域(L266)
- 汛后区块：备注文本域(L284，v-for 各 section) + 图片凭证上传区 + 格式说明 + PhotoPicker
- 文本域截至 2026-11-06 仅使用 placeholder，无 v-model 绑定

## Design Rules
- 上传区标题使用 upload-head 布局（flex 两端对齐），标题靠左、0/6 数量靠最右
- 所有现场照片/图片凭证下方均有格式说明「请上传大小不超过 5MB 格式为 png/jpg/jpeg 的现场照片」
- 备注文本域上方有「备注」标签

<!-- MEMORY_FIELDS
{
  "category": "代码组件",
  "name": "ref8443_inspection",
  "source_extraction_id": "69342418f4704ae99f1e0649450e6eb5",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->