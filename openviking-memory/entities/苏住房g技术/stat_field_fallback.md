# 统计接口覆盖详情字段致金额清0的三段回退链
详情页先合并详情接口金额，再调统计接口时若直接用 ?? 明细汇总会覆盖成 0，须按「统计接口值→表单已有值→明细汇总→0」回退。

## 问题背景
- 场景：property/feeDeclare2/detail.vue 详情接口返回 totalReceivableAmount=5520/totalActualReceivedAmount=5328/totalArrearsAmount=192 并合并进 form，随后调 queryOweFeeStatistic 取统计数据。
- 错误赋值：this.form.totalXxxAmount = Number(data.totalXxxAmount ?? 明细汇总).toFixed(2)；统计接口未返回时 ?? 落下 oweFeeTypeDetail 汇总值(常为0)，把正确金额覆盖成 ¥0.00，无报错。

## 解决方案
- 补齐三段回退链：Number(data.totalXxxAmount ?? this.form.totalXxxAmount ?? receivableSum ?? 0).toFixed(2)。
- 注意 ?? 只兜 null/undefined，0 是有效值；「表单已有值」必须放在派生汇总之前，否则 0 吃掉真实值。
- 字段映射：累计应收=totalReceivableAmount、累计实收=totalActualReceivedAmount、累计欠缴=totalArrearsAmount。

## 验证与归属
- 验证：会话 d2629f80 三张卡片显示 ¥0.00 而详情接口已返回 5520/5328/192；补 data.x ?? this.form.x ?? 汇总 ?? 0 后恢复。
- 涉及文件：zhi2-web-admin/src/views/property/feeDeclare2/detail.vue
- 所属项目：苏住房G；来源会话ID：d2629f80-2e2a-4b5f-927b-4c00906ffa4d；代码基线：e590ffa

## 差异提示
- 与已知 #1078（接口已返回的展示文案字段不能被前端派生函数覆盖）区别：本条是新增数据源合并时的可空字段回退顺序，改法在赋值表达式排优先级而非去掉派生函数。

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "stat_field_fallback",
  "source_extraction_id": "380f4b3087884e7bb7b69fd6773f6451",
  "version": 1,
  "memory_type": "entities"
}
-->