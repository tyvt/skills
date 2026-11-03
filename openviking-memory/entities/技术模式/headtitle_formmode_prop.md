# HeadTitle 必须声明并接收 formMode prop
产品2.0 中 HeadTitle 组件需在 props 声明 formMode 并由父级传入，否则整块不显示或条件渲染异常。

## 问题根因
- 子组件 HeadTitle 未在 props 声明 formMode，内部值为 undefined
- 父级 detail 页 mixin 虽有 formMode 但未通过 :formMode 下发
- v-if="formMode !== 'add'" 因 formMode 为 undefined 导致行为不可靠

## 解决方案
- HeadTitle 增加 `formMode: { type: String, default: '' }`（默认非 add 则显示标题区）
- 父级调用改为 `<HeadTitle :list="headTitleList" :formMode="formMode" />`
- 其它详情页复用同样传参方式

## 验证与归属
- 验证证据：会话 b0a46c27，HeadTitle 内容不显示，补 prop 并在 complex/detail.vue 传入 formMode
- 涉及文件：zhi2-web-admin/src/components/HeadTitle/index.vue、zhi2-web-admin/src/views/property/complex/detail.vue
- 所属项目：2-0；来源会话ID：b0a46c27-17bc-4baf-82e4-aedd0e490a02；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headtitle_formmode_prop",
  "source_extraction_id": "3f3584722eb94e54a6ca13a715f1e5bf",
  "version": 1,
  "memory_type": "entities"
}
-->