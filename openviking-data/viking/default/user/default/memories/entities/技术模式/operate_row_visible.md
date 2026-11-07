# 操作列按钮 visible 与 rowVisible 拆分
园区物管2.0 中 zs-table / zs-operate-column 把操作列按钮从 if-push 改为「数组 + filter」时需区分数组级布尔 visible 与行级 rowVisible。

## 问题描述
- 把 buttons 改为数组 + filter((item) => item.visible === undefined || item.visible) 后，若行级条件仍写在 visible: (row) => ... 上，visible 会被数组级 filter 当成布尔开关，与函数语义冲突

## 约定方案
- 数组级用布尔 visible（如 visible: !this.isQuery）控制按钮是否进入数组
- 行级显示改用 rowVisible: (row) => ... 承载行级条件
- isOperateButtonVisible 内依次判 rowVisible、原 visible 函数、checkPermission，行为与改造前一致

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 7ac74063，feeCustomTypeTable.vue 对齐 candidateCollect filter 写法；编辑按钮 rowVisible 控制 contractBizState/bizState，查询态用 visible: !this.isQuery 从数组剔除
- 涉及文件：zhi2-web-admin/src/views/maintenance/budget/components/feeCustomTypeTable.vue、zhi2-web-admin/src/views/autonomy/candidateCollect/components/index.vue
- 所属项目：园区物管2.0；代码基线：7814a0c2a；来源会话：7ac74063-2500-4985-8cbb-650d6052d19f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operate_row_visible",
  "source_extraction_id": "a317e0c50cd34d9a9b397b0502a6a1b0",
  "version": 1,
  "memory_type": "entities"
}
-->