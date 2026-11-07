# Summary
产品2.0中按ListTemplate.js结构，通过scripts/wrap-list-card.mjs在137个index.vue中用list-card包裹操作区+表格+分页，并手工处理2个页面，实现列表页容器结构规范（2026-11-05）。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】preference
【标题】找到所有index.vue文件中没有使用@zhi2-
【内容】## 已完成内容 已按 `ListTemplate.js` 的结构，在 **`views-index-with-listMixins.txt` 所列 137 个** `index.vue` 中，用 **`<div class="list-card">`** 包住「操作区 + 表格 + 分页」（搜索仍在 `list-card` 外，与 `ListTemplate` 一致）。 ### 实现要点 1. **脚本** `zhi2-web-admin/scripts/wrap-list-card.mjs` - 根 `<template>` 取 **`<script>` 前最后一个 `</template>`**，避免 slot 里 `</template>` 截断。 - 支持 **自闭合 `zs-pagination ... />`**，闭合位置取 **`zs-table` 与 `zs-pagination` 中较靠后的**，避免分页落在 `list-card` 外。 - `</zs-table>` 使用 **`(?<!-)` 思路的 `(?!-)` 负前瞻**，避免误匹配 `</zs-table-column>`。 - 对已错误包裹的文件用正则 **把误放在 `</zs-table>` 后的 `</div>` 挪到分页之后**。 2. **手工处理 2 个脚本无法自动处理的页面** - *
【验证证据】extracted source=cursor project=产品2.0
【涉及文件】`ListTemplate.js ; `index.vue ; 涉及文件：d:\repository\产品2.0\zhi2-web-admin\src\mixins\ListTemplate.js、d:\repository\产品2.0\zhi2-web-admin、d:\repository\产品2.0\zhi2-web-admin\src\views\property\serviceItem\index.vue、d:\repository\产品2.0\zhi2-web-admin\src\views\building\unit\index.vue
【所属项目】产品2.0
【来源会话ID】2a132670-9deb-4220-9d16-a2853aa45068
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "list-card批量包裹完成",
  "goal": "统一列表页容器结构",
  "summary": "产品2.0中按ListTemplate.js结构，通过scripts/wrap-list-card.mjs在137个index.vue中用list-card包裹操作区+表格+分页，并手工处理2个页面，实现列表页容器结构规范（2026-11-05）。",
  "ranges": "10-17",
  "source_extraction_id": "ad3a1acee02449ce9123ee7b8eb6e91c",
  "version": 1,
  "memory_type": "events"
}
-->