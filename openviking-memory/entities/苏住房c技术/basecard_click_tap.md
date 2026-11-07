# 自定义组件@click不触发需改@tap并emit
苏住房C 小程序中自定义组件（如 commonNew/baseCard.vue）标签上的 @click 不会触发，需改用 @tap 并在根节点同时 emit click/tap。

## 问题现象
- pages_main/publicNotice 列表项「点击没反应」，页面看似可点但跳转逻辑未执行，控制台无报错
- 单选按钮、view 上的 @click 有时因编译器兼容侥幸生效，但自定义组件标签上的 @click 最不稳且失败时不报错不冒泡

## 根因
- 微信小程序事件是 @tap（bindtap），把 @click 绑在自定义组件标签上不会触发
- 组件内部未将点击事件 emit 出来，事件在组件边界静默丢失

## 解决方案
- 小程序端点击一律写 @tap
- 公共卡片组件 baseCard 在根节点绑 @tap 并同时 emit('click') 与 emit('tap')，兼容历史 @click 调用方
- 业务列表 ListIndex.vue / ListContractIndex.vue 统一改 @tap，与 bankList.vue、HalfCard.vue 等既有写法对齐
- 排查「点击无反应」先确认事件绑在原生节点还是自定义组件标签，再看组件是否 emit，勿先怀疑路由或权限

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 3aa806fa 最终结论「@click 绑在自定义组件 baseCard 上不会触发，事件没传到跳转逻辑」；修复为 baseCard.vue 根节点绑 @tap 并 emit，列表改 @tap
- 涉及文件：src/components/commonNew/baseCard.vue、pages_main/publicNotice/components/ListIndex.vue、ListContractIndex.vue、publicNotice.vue、pages/publicNotice/components/ListContractIndex.vue
- 所属项目：苏住房C；来源会话ID：3aa806fa-2f71-4575-9cb6-ed1ea81e5795；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "basecard_click_tap",
  "source_extraction_id": "cb687cdf13e34fa6a1124eadb650c4e7",
  "version": 1,
  "memory_type": "entities"
}
-->