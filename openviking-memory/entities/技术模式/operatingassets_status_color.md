# operatingAssets 状态颜色映射
operatingAssets.vue 已按缴款状态调整颜色与图例文案，并兼容后端旧文案。

## 状态颜色
- 未缴款：#F7CBCB（对应 .is-red）
- 部分缴款：#FDE3D1（对应 .is-orange）
- 全部缴款：#D1EFCB（对应 .is-green）
- 闲置：白色（.is-gray 改为白底加浅灰描边）

## 图例与兼容
- 图例文案从“缴费”统一改为“缴款”
- statusClass() 兼容后端仍返回“缴费”文案，两套均能正确映射到颜色

## 验证与归属
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 来源会话：dccaafe5-eb52-4dbb-ad03-5a8e2e150a84
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operatingassets_status_color",
  "source_extraction_id": "fcd8a128f48a41fc9c6111b9caff053b",
  "version": 1,
  "memory_type": "entities"
}
-->