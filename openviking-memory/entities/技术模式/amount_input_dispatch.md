---
audit_status: invalid
last_checked: 2026-11-26T22:18:41+08:00
verdict_note: 记忆称 AmountInput 在 numberValue watch 中 nextTick 内 dispatchToFormItem('el.form.change')；实机园区物管2.0 该组件用 computed normal + v-money + $emit('input')，无 numberValue/dispatch/nextTick。实现描述不符。
---
# AmountInput 校验变更分发对齐
AmountInput 组件对齐 ElInput 在值变化时通知 ElFormItem 的行为，修复填写后仍为必填校验失败的问题。

## 现象与根因
- 使用 trigger: 'change' 或依赖值写回 model 再校验时，界面已填仍提示必填。
- AmountInput 仅在原生 change 及清空时 dispatch el.form.change，与 ElInput 不一致。
- blur 与父组件更新同帧可能竞态读到旧 model。

## 解决方案
- 在 numberValue 的 watch 中 emit('input') 之后 nextTick 内 dispatchToFormItem('el.form.change', value)。
- handleBlur 先 emit('blur')，并将 el.form.blur 放入 nextTick 避免竞态。

## 关联信息
- 涉及文件：zhi2-web-admin/src/components/AmountInput/index.vue、zhi2-web-admin/package.js。
- 所属项目：园区物管2.0；来源会话：8430758d-a3eb-412d-97d4-0ab68ebf0303；代码基线：none。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_input_dispatch",
  "source_extraction_id": "175779f5800742d9a6b6bf5fa413e19e",
  "version": 1,
  "memory_type": "entities"
}
-->