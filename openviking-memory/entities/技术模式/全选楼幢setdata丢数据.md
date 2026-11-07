# 业主自治「全选楼幢」：general 的 DecisionRangeTable.setData 只提交当前楼幢会丢全选
惠山二期G 在 decisionRangeBuildingSelectMixins + zs-select-dialog 的「全选楼幢」能力接入后，各模块 DecisionRangeTable/RangeTable 的 setData 实现必须一致。

## 问题根因
- autonomy/general/components/DecisionRangeTable.setData 在用户点过任一楼幢后 buildingTableData 非空，确定时只汇总当前楼幢，其它楼幢上通过「全选」勾选的户室会丢失。
- election 侧 setData、preparatory 的 handlePick 从完整 treeData 汇总，逻辑正确。

## 合并前自查清单
- 确定提交是否遍历整棵 treeData/全部楼幢，而非仅 buildingTableData 当前项。
- initHouseChecked 里 exist==1 已入库户室被标 checked='1' 时，提交侧是否过滤，避免重复入库。
- isAllBuildingsSelected 依赖 $refs.dialog.treeData，仅改楼盘表未打开弹窗时按钮文案可能不刷新。
- 筹建等列表 checked 混用数字 0 与字符串 '1'，比较与提交需统一类型。
- 优先修 general 的 setData，再统一 exist 过滤与 checked 类型。

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 验证证据：会话 da4d5f02 审查全选楼幢改动，结论「建议先不要合并」，主因 general setData 在 buildingTableData 非空后只提交当前楼幢；另列 exist==1、isAllBuildingsSelected 刷新、checked 类型混用。
- 涉及文件：autonomy/general/components/DecisionRangeTable.vue、autonomy/multiply/components/DecisionRangeTable.vue、autonomy/election/components/apply/RangeTable.vue、autonomy/preparatoryApply/components/preparatoryRangeTable.vue、autonomy/mixins/decisionRangeBuildingSelectMixins.js、zs-select-dialog/zs-select-dialog.vue。
- 所属项目：惠山二期G；来源会话：da4d5f02-fc36-4e8c-8717-0c4503f50d5e；代码基线：289cc30。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "全选楼幢setdata丢数据",
  "source_extraction_id": "65d5c94edee7434c9391d6144c27a476",
  "version": 1,
  "memory_type": "entities"
}
-->