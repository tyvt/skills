
- 禁止在页面/模块中直接 `import dayjs from "dayjs"`，应使用项目全局实例 `this.dayjs`（在 main.js 中通过 `Vue.prototype.dayjs` 挂载）。
- 原因：index.html 通过普通 `<script>` 加载全局 UMD 脚本 `/assets/js/dayjs.min.js`，若某模块直接 import dayjs，Rollup 构建会将其打成 ESM 分包并覆盖 public 里的 UMD 全局脚本，导致线上报错。
- 涉及修复文件：PaymentNotice.vue、OwnerNotice.vue、CommercialNotice.vue、feeDocFormatters.js。
- 适用于兴化物管 zhi1-web-admin 项目。


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "dayjs全局实例使用约定",
  "source_extraction_id": "adc485e9091141abb2f104e13b56d0c6",
  "version": 1,
  "memory_type": "preferences"
}
-->