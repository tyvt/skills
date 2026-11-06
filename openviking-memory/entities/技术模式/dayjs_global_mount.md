# dayjs全局挂载修复
苏州市房地产监测V3 项目因 dayjs 未挂载到 Vue 原型，导致多个详情页调用 `this.dayjs` 报错，已修复。

## 问题根因
- `index.html` 通过 `<script src="./assets/js/dayjs.min.js">` 全局加载 dayjs
- `main.js` 未将 dayjs 挂到 Vue 实例，详情页使用 `this.dayjs(...)` 报 `this.dayjs is not a function`
- 受影响页面包括 `supervision/deposit/refund/detail.vue` 第 659 行等

## 修复方案
- 在 `main.js` 全局挂载处增加 `Vue.prototype.dayjs = dayjs`
- 所有使用 `this.dayjs` 的页面（退款通知书、缴款通知书、分配通知书、解封通知等）恢复正常

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`index.html`、`main.js`、`supervision/deposit/refund/detail.vue`
- 来源会话ID：0e34881a-dc45-490a-ac11-04527f842220

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dayjs_global_mount",
  "source_extraction_id": "6affe7798e984e8fa21981f899b7139f",
  "version": 1,
  "memory_type": "entities"
}
-->