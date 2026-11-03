# Vue3富文本wangeditor集成
产品2.0（zhi2-web-admin）迁 Vue3 时富文本保持 @wangeditor/editor@5.1.x，Vue 封装依赖改为 @wangeditor/editor-for-vue@next。
## 集成要点
- 组件侧用 Composition API，从 @wangeditor/editor-for-vue 引入 Editor/Toolbar。
- 编辑器实例用 shallowRef() 保存（勿进深度响应式），内容双向绑定走 emits: ['update:value'] 与 props.value 同步。
- 安装需在子包目录执行 yarn/npm 拉取 next 版本。
## 验证与归属
- 验证：会话 72a7e928 用户报 editor-for-vue 默认 import 无 default export；结论明确 next 版本与 zs-editor.vue 改写。
- 涉及文件：zhi2-web-admin/package.json、zhi2-web-admin/src/components/zs-editor/zs-editor.vue；所属项目：2-0；来源会话：72a7e928-6b11-466d-9ae8-7b29b1bfc969

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "wangeditor_vue3_pattern",
  "source_extraction_id": "c6ae4da4185a4eb4914ba232a41c4536",
  "version": 1,
  "memory_type": "entities"
}
-->