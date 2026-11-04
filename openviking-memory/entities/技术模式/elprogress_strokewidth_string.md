# ElProgress stroke-width 字符串传参致类型告警
模板写 `stroke-width="10"` 时 Vue 将其作为字符串 `"10"` 传入，而 `ElProgress` 的 `strokeWidth` 要求 Number，触发 `[Vue warn]: Invalid prop`。

## 问题根因
- 模板里 `stroke-width="10"` 静态绑定，Vue 把属性当成字符串 `"10"` 传给组件
- `ElProgress` 的 `strokeWidth` prop 声明为 Number，收到字符串触发类型告警
- 同项目 `num` 的 `default: '7'` 也是字符串，若该 prop 声明为 Number 以后也可能告警

## 解决方案
- 改为动态绑定数字 `:stroke-width="10"`，传入数值 `10`，警告消失
- 可选：将 `num` 的 `default: '7'` 改为 `default: 7` 以规避潜在告警（本次仅修 stroke-width）

## 验证与归属
- 验证证据：extracted source=cursor project=bugfix
- 涉及文件：packages/progress/src/progress.vue；componentRanking.vue
- 来源会话ID：393829c3-3762-46f2-b7fa-330b64408e2a
- 所属项目：bugfix；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "elprogress_strokewidth_string",
  "source_extraction_id": "20272dbf54aa4840a79ddd749472adaa",
  "version": 1,
  "memory_type": "entities"
}
-->