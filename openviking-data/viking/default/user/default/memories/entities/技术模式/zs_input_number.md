# zs-input-number无按钮内边距修复
修复 `zs-input-number` 组件在 `:controls="false"` 时错误保留112px内边距导致文字被裁的技术模式。

## 问题根因
- `zs-input-number` 组件对 root 样式写 `:not(.is-controls-right) /deep/ .el-input__inner { padding-left:56px; padding-right:56px }`
- `:controls="false"` 时 element-ui 加的是 `is-without-controls`，规则仍命中，无按钮却白占112px，placeholder被裁成「请输入最少选」

## 修复方案
- `src/components/zs-input-number/zs-input-number.vue` 规则加 `:not(.is-without-controls)`，无按钮时回落默认15px
- `src/views/autonomy/multiply/components/VotingItemsDialog.vue` 栅格 `md/lg/xl` 6→8，输入框再宽1/3
- 连带恢复 `benefit/pubHousePart/detail.vue`、`partDialog.vue`、`housePartDialog.vue`、`assetLeaseApply/components/houseTable.vue` 正常显示

## 项目与验证
- 所属项目：惠山二期G
- 来源会话：2381e8b3-483f-4cd3-afac-2e88786cc72a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_input_number",
  "source_extraction_id": "418a2e22bab440878a70df76d501799d",
  "version": 1,
  "memory_type": "entities"
}
-->