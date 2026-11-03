# Vue3 迁移移除 .native 修饰符
Vue3 已移除 `.native` 修饰符，模板里的 `@click.native`/`@input.native` 会静默不生效，须全局检索改法。

## 问题根因
- Vue3 移除 `.native` 修饰符，`@click.native`、`@input.native` 等会静默不生效，无报错但事件不绑定

## 解决方案
- 迁 Vue3 时全局检索 `.native`（含 login 等页），改为组件自身支持的 `@click`/`v-on` 或在包裹元素上监听原生事件

## 验证与归属
- 验证证据：会话 98fe164c 中 login.vue:28 的 `.native` 写法未生效，用户要求全局搜类似写法改 Vue3
- 涉及文件：zhi2-web-admin/assets/views/login.vue、zhi2-web-admin/src/views/login.vue
- 所属项目：2-0；来源会话：98fe164c-3ca7-4574-8920-11075d32c5c9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_native_modifier",
  "source_extraction_id": "96994393a37c46d59cb68b2dd4ca2698",
  "version": 1,
  "memory_type": "entities"
}
-->