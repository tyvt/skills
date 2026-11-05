# 自定义组件点击无响应修复
苏住房C(zhi2-mobile-shimin)小程序中因微信小程序 `@click` 绑在自定义组件 `baseCard` 上不触发，导致列表项点击无响应，已修复。

## 问题根因
- 微信小程序里 `@click` 绑在自定义组件 `baseCard` 上不会触发，事件未传到跳转逻辑

## 修复方案
- `baseCard.vue` 根节点绑定 `@tap` 并 `emit('click')` / `emit('tap')`，使所有使用 `base-card` 的页面都能响应点击
- `ListContractIndex.vue` / `ListIndex.vue` 将 `@click` 改为 `@tap`(与 `bankList.vue`、`HalfCard.vue` 写法一致)

## 验证与归属
- 点击「物业服务合同」列表项跳转到 `/pages_owner/company/info/contracts`
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`baseCard.vue`、`ListContractIndex.vue`、`ListIndex.vue`
- 来源会话ID：3aa806fa-2f71-4575-9cb6-ed1ea81e5795；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "basecard_click_fix",
  "source_extraction_id": "7566ecdbf0c54726904383a9644f43fe",
  "version": 1,
  "memory_type": "entities"
}
-->