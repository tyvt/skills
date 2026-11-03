# dialogMixins 声明 id 为 prop 后 $attrs.id 恒 undefined
混入 dialogMixins 的弹窗组件若把 id 声明为 prop，Vue 不会将其放入 $attrs，取主键必须用 this.id 而非 this.$attrs.id。

## 问题根因
- 打印参数保存报「打印配置ID不能为空」，请求体 printConfigId 始终缺失但数据流本身是通的
- ParamsDialog 混入的 dialogMixins 已把 id 声明为 prop，已声明为 prop 的属性不会进入 $attrs
- 代码里写 this.$attrs.id 恒为 undefined，赋值给 form.printConfigId 后随请求发出的是空

## 解决方案
- 混入 dialogMixins 的组件直接用 this.id 取主键
- 出现「某 ID 字段没随请求发出但父组件确实传了」时，优先排查是否取值走了 $attrs 而 prop 已被声明
- 凡是 mixin 声明过的 prop（id、visible 等）都不能再从 $attrs 取

## 验证与归属
- 验证证据：会话 6fdd2549，dialogMixins.js props 里声明 id，ParamsDialog.vue confirm 中 this.$attrs.id 为 undefined，改为 this.id 修复
- 涉及文件：zhi2-web-admin/src/mixins/dialogMixins.js；zhi2-web-admin/src/views/tool/print/components/ParamsDialog.vue
- 所属项目：产品2.0；来源会话ID：6fdd2549-8d41-469b-94b8-8cd8fe8a1f20；代码基线：bc9b2a3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialogmixins_id_prop",
  "source_extraction_id": "b458b054e1c74a3cbbd66c380cfde872",
  "version": 1,
  "memory_type": "entities"
}
-->