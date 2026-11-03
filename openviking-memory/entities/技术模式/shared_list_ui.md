# 多菜单共用列表组件入口UI归属
苏住房G「物业合同」与「前期物业合同」两菜单共用同一列表组件，测试环境有橙色说明框+默认已备案筛选，正式环境没有，实为环境差异与入口UI归属问题。

## 问题根因
- 说明框、默认 bizState、重置回默认值写在共用组件页面级状态，非各入口独立；一处缺失两入口同缺
- 日志截图只覆盖测试环境易误判为代码未走到正式；实际是一级环境差异：动态路由下菜单由 sys_menu 下发，入口缺失/未授权/旧版本菜单致正式环境没有

## 解决方案
- 需「只在某入口出现」的区块用基于路由/入口判定（如 isAddListPage）做 v-if，不为两菜单复制组件
- 入口级默认值（默认筛选、重置回退、提示文案配色）写同一处并注释「两个入口共用」，避免只在一个入口验证
- 收尾明确告知：代码已改、build通过但未提交未推送，正式环境需重新部署才出现，用户所见「没有」可能只是未发布

## 验证与归属
- 验证：本批会话 325b93f2 用户诉求「测试环境有说明、正式环境没有」
- 结论：共用组件 propertyContract/components/index.vue 恢复 v-if="isAddListPage" 说明框、默认 bizState:'2'、重置回已备案、#fff7e6 背景，注明两入口共用且尚未提交
- 涉及文件：property/propertyContract/components/index.vue、propertyContract/index.vue、propertyContractTemporary/index.vue
- 所属项目：苏住房G；来源会话ID：325b93f2-5682-453d-a064-b7974bf0dfa4；代码基线：a700def

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shared_list_ui",
  "source_extraction_id": "b3536856883b46aa95bcd23a6b8147f5",
  "version": 1,
  "memory_type": "entities"
}
-->