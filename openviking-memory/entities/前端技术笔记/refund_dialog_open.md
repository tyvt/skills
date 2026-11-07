# 退款弹窗挂载即开致表单为空
refundDetailTable.vue 加 :key 使弹窗首次创建时 visible 已 true，el-dialog 挂载即开不触发 @open 致 onOpen 未执行、form 为空。

## 问题背景
- 退款详情弹窗（refundDetailDialog/refundDetailTable）首次打开时因 :key 导致 visible 初始为 true，el-dialog 挂载即开不触发 @open 事件。
- onOpen 未执行导致表单数据未同步，首开表单为空。

## 解决方案
- 增加 dialogForm 的 watch(immediate:true)，创建即同步数据，保留 onOpen 处理重复打开。
- 修正 ::disabled 笔误为 :disabled。

## 验证与归属
- 验证证据：extracted source=cursor project=惠山G
- 来源会话：1261540d-7b00-4143-aefd-bd8ea9034677
- 验证：来源 cursor 会话 1261540d-7b00-4143-aefd-bd8ea9034677；代码基线 none。
- 涉及文件：refundDetailTable.vue、refundDetailDialog.vue、accountTubereason/integratedQuery/components/DetailDialog.vue、commonTable.vue。
- 所属项目：惠山G/zhi1-web-admin（维修资金退款模块）。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "refund_dialog_open",
  "source_extraction_id": "c6aab03deb074150a75444d7267d5fee",
  "version": 1,
  "memory_type": "entities"
}
-->