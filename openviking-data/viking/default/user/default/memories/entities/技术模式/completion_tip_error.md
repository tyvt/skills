# 竣工备案detail相邻tip复制错文案
维修模块 completion/detail.vue 相邻金额字段共用 tip 计算属性时易整段复制错字段文案，静默不报错。

## 问题现象
- 维修模块 maintenance/completion/detail.vue 在「施工结算总额」与「线下核查费」等相邻金额字段上用独立 computed（constructionSettleAmountTip、offlineCheckFeeAmountTip）
- 两 computed 同时挂到编辑态 el-tooltip（label slot）与查看态 contentInfo 的 labelTooltip
- 新增线下核查费后误把其长说明留在 constructionSettleAmountTip，导致「施工结算总额」问号提示显示成核查费文案（静默，不报错）

## 修复与预防
- 按产品原文改对应 tip 计算属性（施工结算：「维修工程的实际造价，仅针对维修施工阶段发生的费用。」）
- 一处 computed 改完要确认表单与 contentInfo 两处引用都已指向该属性
- 加相邻 tip 时复制粘贴后对照字段中文名与需求截图
- 同一页面多个 *Tip 命名相近，改一个要 grep 另一字段是否仍引用旧文案

## 验证与归属
- 验证：会话 6bac5a7c（基线 413ac3f）用户反馈施工结算总额注释不对；根因 constructionSettleAmountTip 仍为线下核查费说明；改文案后 el-tooltip 与 contentInfo labelTooltip 同步生效
- 涉及文件：zhi2-web-admin/src/views/maintenance/completion/detail.vue、zhi2-web-admin/src/components/detail-template/detail-template.vue
- 所属项目：惠山二期G；来源会话：6bac5a7c-3034-4609-9345-03915c598bc6；代码基线：413ac3f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "completion_tip_error",
  "source_extraction_id": "b8d1b824386849719a7c6ed2c31fbe1a",
  "version": 1,
  "memory_type": "entities"
}
-->