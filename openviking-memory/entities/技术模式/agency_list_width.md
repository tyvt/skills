# 从业人员列表操作列宽度优化
在 苏州市房地产监测V3 项目的 AgencyPersonnelList.vue 中完成操作列宽度优化，由固定宽度改为按按钮文字自动计算。

## 修改内容
- 移除 zs-operate-column 的固定宽度 :width="480"，改由组件按按钮文字自动计算列宽
- 保留 show-all，所有按钮仍平铺展示、不换行

## 验证结果
- 操作列宽度由 480px 降至 316px（减少约 164px）
- 已备案行（4 按钮）查看/人员状态调整/工作牌/信息卡单行完整显示
- 待提交行（3 按钮）查看/编辑/删除正常显示，相关 E2E 列表用例已通过

## 验证与归属
- 涉及文件: AgencyPersonnelList.vue
- 所属项目: 苏州市房地产监测V3
- 来源会话ID: c07f2835-00f4-4f26-8f40-499ded465259

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_list_width",
  "source_extraction_id": "ef50d166515a4affbd40d092df51beed",
  "version": 1,
  "memory_type": "entities"
}
-->