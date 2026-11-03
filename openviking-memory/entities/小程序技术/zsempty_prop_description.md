# ZsEmpty 文案 prop 误用 text 及分包 svg 构建 500
苏住房C 小程序空状态组件 ZsEmpty 的 text 属性无效，且分包 static 下 svg 被构建清除报 500。

## 问题现象
- ZsEmpty 有 11 个调用点写 text="…"，组件只认 description，文案静默不显示
- pages_benefit 分包空状态图报 Failed to load local image resource .../empty.svg status 500

## 根因
- ZsEmpty prop 契约无 text，未声明属性只落 $attrs 不渲染，不报错不提示
- 分包页面 svg 放分包 static 目录，构建清理流程剔除未登记资产，微信工具请求不存在路径返 500（非 404）

## 解决方案
- 批量把 pages_benefit 下 11 处 ZsEmpty 的 text 改成 description（balancePublicity、assetsPublicity 等多文件）
- 公共 svg 放回主包路径（用 mainStaticPaths.js 统一登记），不在分包 static 放 svg
- 新增公共组件后用 grep 反查调用点 prop 名与声明一致，作为文案不显示首排查项

## 验证与归属
- 所属项目：苏住房C
- 来源会话：f33d070f-15e7-4d33-aa9e-f5133dc9ff92（2026-08-24）
- 代码基线：4630e8e
- 涉及文件：ZsEmpty.vue、ZsImage.vue、mainStaticPaths.js、balancePublicity/index.vue、fundPublicity/index.vue、PublicityTab.vue

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zsempty_prop_description",
  "source_extraction_id": "57a3eea8f908476fa5da61782238e5bf",
  "version": 1,
  "memory_type": "entities"
}
-->