# 按钮宽度全局修复
苏住房C小程序因 ZsButton 默认 width:inherit 与 .long 写在 scoped 样式中，导致底部提交按钮过窄，已全局修复。

## 问题根因
- `ZsButton` 默认 `width: inherit`，在 `display:flex; align-items:center` 父容器中按钮收缩为文字宽度
- `.long` 写在组件 scoped 样式中，父组件传入的 `class="long"` 在小程序端无法命中 scoped 规则，`width:100%` 不生效

## 修复内容
- `ZsButton.vue` 移除 `width: inherit`，新增 `block` 属性绑定 `zs-button--block` 类
- `ZsButton.vue` 将 `round` 属性绑定到 `zs-button--round` 类
- `uni.scss` 全局增加 `.zs-button.long`、`.zs-button--block`、`.btn-container > .zs-button:only-child`、`.submit-button-wrapper > .zs-button` 的 `width:100%` 覆盖规则

## 涉及文件
- 涉及文件：`register.vue`、`ZsButton.vue`、`uni.scss`、`bindProject.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：76068bd5-64a1-4185-a1a3-b190ca34998b

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zsbutton_width_global_fix",
  "source_extraction_id": "881586bec5ef4745b92508ce244b74a9",
  "version": 1,
  "memory_type": "entities"
}
-->
