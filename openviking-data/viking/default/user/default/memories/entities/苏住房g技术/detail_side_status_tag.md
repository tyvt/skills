# 详情态旁挂状态标签模式
苏住房G 资金拨付详情页给字段值右侧旁挂状态标签，复用下划线变体而非改 labelAbove。

## 场景与误区
- 资金拨付详情「用款申请名称」需按设计稿在字段名右侧补「{approvalDeptName}已见证通过」社区见证说明，查看态与编辑态都要有。
- 第一版用 DetailTemplate 的 labelAbove 塞标签上方，挤占空间且不符设计稿（设计稿是值区域右侧描边浅蓝标签）。
- 已知只读详情禁掉用 disabled 控件冒充只读，故不能直接用 disabled 表单兜底。

## 正确做法
- 查看态复用 DetailTemplate 的 descriptionItem 下划线变体匹配行（item.className 传下划线变体 + component 插槽），stateText 渲染在值右侧。
- 编辑态同一 el-form-item 值插槽后同步放同款标签，两态视觉一致；标签纯展示：无 cursor:pointer、无 hover 变色，仅字段有值时渲染。
- 改业务页自身字段配置，不动公共 template 默认行为；涉及文件 benfit/pubAllotNotice/detail.vue、detail-template.vue；来源会话 d7849b4e；基线 4fad664。

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "detail_side_status_tag",
  "source_extraction_id": "7d100a0bc1f64c549abc1801c01d6406",
  "version": 1,
  "memory_type": "entities"
}
-->