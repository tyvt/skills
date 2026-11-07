# 宗地变更信息弹窗两列表单布局
苏州市房地产监测V3 项目中 ParcelDialog.vue 改造为两列表单布局，仅改动此文件。

## 改动说明
- 8 个字段包在 `el-row :gutter="32"` 内，每项 `el-col :span="12"`（含宗地坐落、四至范围），避免 `zs-dialog` 对 `zs-form > .el-col` 的 `width:100%` 压成单列
- `label-position="left"`；标签宽 120px 用 scoped CSS（未在模板写 `label-width`，符合 `check-no-label-width`）
- 输入类控件 `width:100%`，并对日期、金额、`el-select` 做了 `:deep` 兜底
- 下方「宗地绘制」地图区仍为全宽

## 布局效果
- 行1：地块编号 | 不动权证号
- 行2：土地用途 | 土地面积
- 行3：出让价格 | 出让时间
- 行4：宗地坐落 | 四至范围

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`zhi2-web-admin/src/views/projectManagement/customerProject/components/ParcelDialog.vue`
- 来源会话ID：b5f6bfd3-4e42-4e3e-bed9-19ac9eddac86
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parcel_dialog_layout",
  "source_extraction_id": "446d1dc5ce95440aa4c26ec03a483ac8",
  "version": 1,
  "memory_type": "entities"
}
-->