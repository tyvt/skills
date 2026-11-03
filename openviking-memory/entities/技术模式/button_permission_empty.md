# 临时放开按钮权限只能写 permission: [] 且交付前接回真实权限串
四个证书管理页调试时将按钮 attrs.permission 改为 [] 或 false 以绕过校验，但空权限数组语义是「无任何权限要求」，等于对所有登录用户开放。

## 问题根因
- permission: [] 语义是「没有任何权限要求」而非「权限待定」，按钮对所有登录用户可见可点
- 列表页 mixin table.js 的 operationButtons()（工具栏）与 buttons()（行操作）产出按钮，ListTemplate.js 渲染前做权限过滤，空数组一路放行
- 不报错也不告警，是最易被忽略的状态

## 交付红线
- permission: [] / permission: false 只能本地调试，不得进入提交；交付前必须接回真实权限串 [this.perms.add] / [this.perms.remove]
- 真实权限串由页面 perms 映射提供，菜单权限与代码权限串须同一口径
- 排查「按钮该显未显/不该显却显」时先看 attrs.permission 是否为空数组或 false

## 涉及文件与归属
- 涉及文件：stateLandLic/index.vue、StateTable.vue、PlanTable.vue、LicTable.vue、src/mixins/table.js、ListTemplate.js
- 来源会话：session-5a6b17af-0563-48cc-9291-a5ae66869a16；代码基线：235e6ee

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "button_permission_empty",
  "source_extraction_id": "fbafd4fd1605421ead8749279bdeff62",
  "version": 1,
  "memory_type": "entities"
}
-->