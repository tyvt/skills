# 业主表决线下投票录入展示户室号
在泰兴G项目业主自治模块共用弹窗 `VoteRangeDialog.vue` 中，线下投票录入增加只读「户室号」字段，修复原只展示幢号、单元名称缺失户室号问题。

## 修改内容
- 编辑表单：在「单元名称」与「建筑面积」间增加只读「户室号」字段（数据来自选中行 `dialogForm.houseNo`）
- 查看模式：`contentInfo` 中同步增加户室号展示
- 该组件为业主表决模块共用（一般/选项/排序/多议题表决等），所有线下投票录入弹窗均生效

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴G
- 涉及文件：`VoteRangeDialog.vue`（路径 d:/repository/泰兴G/zhi2-web-admin/src/views/autonomy/components）
- 所属项目：泰兴G；来源会话：f0b2e1a4-e0f1-4c1a-8ac5-15136d7182af；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_range_house_no_shown",
  "source_extraction_id": "47b34f339d8f45c8bb02598401ebc0b1",
  "version": 1,
  "memory_type": "entities"
}
-->