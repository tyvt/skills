# 多余div闭合致mapProperty模板多根

building/mapProperty/index.vue首个zs-dialog多余</div>提前关闭根节点.list-container，且.list-card未闭合，触发vue/no-multiple-template-root；移除多余</div>并在</el-col>前补.list-card闭合标签修复。

**验证证据**：extracted source=cursor session=a1f32ab9-7041-4fcc-8f3b-7c218f1b8032

**涉及文件**：d:/repository/园区物管2.0/zhi2-web-admin/src/views/building/mapProperty/index.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/mapProperty/index.vue、building/mapProperty/index.vue

**所属项目**：园区物管2.0
**来源会话**：a1f32ab9-7041-4fcc-8f3b-7c218f1b8032
**代码基线**：none
<!-- MEMORY_FIELDS
{
  "event_name": "Correção de múltiplos nós-raiz em mapProperty",
  "goal": "Corrigir template mapProperty",
  "summary": "Em 2026-11-02, foi identificado que `building/mapProperty/index.vue` continha uma `</div>` extra que fechava prematuramente o nó raiz e o `.list-card` não estava fechado, disparando `vue/no-multiple-template-root`; a correção remove a `</div>` extra e adiciona a tag de fechamento de `.list-card` antes de `</el-col>`.",
  "ranges": "11-14",
  "source_extraction_id": "d844f94ca9c9437188f0c9b246ecc583",
  "version": 1,
  "memory_type": "events"
}
-->