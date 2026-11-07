# v-money 指令空值守卫
太仓G 项目大量 `v-money:2` 未传对象绑定，指令 inserted 时 binding.value 为 undefined，直接解构会抛 TypeError。

## 问题根因
- 项目大量 `v-money:2` 未传对象绑定，inserted hook 中 `binding.value` 为 undefined
- money.js 直接解构 `const { normal, limit, maxIntLength } = value` 会在 inserted hook 抛 TypeError

## 解决方案
- 约定在 inserted/unbind 使用 `const { normal, limit, maxIntLength } = value || {}`
- 与 AmountInput 组件选型（zs-input+v-money）是不同层面问题，勿混淆

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 8f9057d0 maintainDecision/detail 报 directive money inserted 解构 undefined；结论在 money.js 两处加 value||{}
- 涉及文件：zhi1-web-admin/src/directives/formatter/money.js、maintainDecision/detail.vue、AmountInput/index.vue
- 所属项目：太仓G；来源会话：8f9057d0-7dbf-4966-9b52-d5d8411e8e4b；代码基线：9638e2f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v_money_guard",
  "source_extraction_id": "f34e3449713b413fb2df21abd5c1b15e",
  "version": 1,
  "memory_type": "entities"
}
-->