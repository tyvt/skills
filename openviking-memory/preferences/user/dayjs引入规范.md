- 兴化物管 zhi1-web-admin 项目中，避免在页面/模块直接 `import dayjs from "dayjs"`；应使用项目全局实例 `this.dayjs`（main.js 通过 `Vue.prototype.dayjs` 挂载）。
- 直接 import 会被 Rollup 打成 ESM 分包覆盖 public 下的 UMD 全局脚本 `assets/js/dayjs.min.js`，导致线上报错（如 hisfeeFees 模块的 PaymentNotice.vue、OwnerNotice.vue、CommercialNotice.vue、feeDocFormatters.js 曾因此报错）。
- 新增页面请复用全局 `this.dayjs`，不要直接 import dayjs。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "dayjs引入规范",
  "source_extraction_id": "9769ae46963547e4a96d7182fff41b5e",
  "version": 1,
  "memory_type": "preferences"
}
-->