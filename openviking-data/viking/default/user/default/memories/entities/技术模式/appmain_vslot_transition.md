# AppMain 中 transition 包 router-view 须用 v-slot
Vue Router 4 不允许在 `<router-view>` 上直接嵌套 `<transition>` 旧写法，需改用 v-slot 写法消除警告。
## 问题根因
- Vue Router 4 中 `<router-view>` 直接嵌套 `<transition>` 会触发 warn。
## 解决方案
- 改为 `<router-view v-slot="{ Component, route }">` 内包 `<transition>` 与 `<component :is="Component" :key="route.fullPath" />`。
- 保留 fade 过渡与按 fullPath 刷新组件。
## 验证与归属
- 验证证据：会话 1f2cc58f 中 AppMain.vue 改为 v-slot 写法消除警告。
- 涉及文件：zhi2-web-admin/src/layout/components/AppMain.vue；所属项目：2-0；来源会话ID：1f2cc58f-3aa3-4fb3-9e4a-7177a0644913；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appmain_vslot_transition",
  "source_extraction_id": "187fbfd8a3244360aafe88fc224b6d1b",
  "version": 1,
  "memory_type": "entities"
}
-->