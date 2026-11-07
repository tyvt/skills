# Vue3 迁移移除 .native 修饰符
Vue3 已移除 `.native` 修饰符，模板里的 `@click.native`/`@input.native`/`@tap.native` 会静默不生效，须全局检索改法。

## 问题根因
- Vue3 移除 `.native` 修饰符，`@click.native`、`@input.native`、`@tap.native` 等会静默不生效，无报错但事件不绑定
- 在 uni-app 的 Vue3 编译产物里，`.native` 监听不会被挂上，表现为点击完全静默失效

## 解决方案
- 迁 Vue3 时全局检索 `.native`（含 login 等页），改为组件自身支持的 `@click`/`@tap`/`v-on` 或在包裹元素上监听原生事件
- 小程序端点击一律写 `@tap`；不要把 `@tap.native` 写在组件上，把 `@tap` 绑到包裹它的 view 容器上
- 搜索控件等补 `@focus` 事件走同一条跳转逻辑，避免点中边缘空隙无响应
- 判定「点击没反应也没报错」时，优先怀疑事件监听根本没绑上（.native / 拼错事件名 / 被上层遮罩挡住），而非先查跳转函数

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 98fe164c 中 login.vue:28 的 `.native` 写法未生效，用户要求全局搜类似写法改 Vue3
- 涉及文件：zhi2-web-admin/assets/views/login.vue、zhi2-web-admin/src/views/login.vue
- 所属项目：2-0；来源会话：98fe164c-3ca7-4574-8920-11075d32c5c9；代码基线：none
- 验证证据2：会话 1bbaff8b（2026-07-16，基线 77666f8）苏住房C 小程序「我的求购-添加求购」搜索框点击无反应，根因 add.vue 用 @tap.native 在 Vue3 失效，改为外层容器绑 @tap 并在 @focus 时跳转
- 涉及文件2：src/pages_transaction/intention/add.vue、src/pages_transaction/intention/search.vue
- 所属项目2：苏住房C；来源会话ID：1bbaff8b-e027-4764-86e9-41dd7092d234；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_native_modifier",
  "source_extraction_id": "b914c1b571894896a474b9ab1408ca7f",
  "version": 2,
  "memory_type": "entities"
}
-->