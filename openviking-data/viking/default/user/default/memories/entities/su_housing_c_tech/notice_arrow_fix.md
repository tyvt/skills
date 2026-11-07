# 公示列表页箭头显示修复
苏住房C 小程序 `pages_main/publicNotice` 列表卡片箭头错位问题已修复。

## 问题根因
- notice-list-card 的 flex 样式写在 base-card 子组件上，scoped CSS 在小程序端未穿透
- 箭头被当作块级元素堆在日期下方

## 修复内容
- 在 ListIndex.vue 与 ListContractIndex.vue 中，将 class="notice-list-card" 从 base-card 移到内层包裹 div
- 样式保持不变，flex 现作用在组件自身 DOM 上，箭头显示在卡片右侧并垂直居中

## 验证与归属
- 验证证据：npm run build 通过无编译错；extracted source=cursor project=苏住房C
- 涉及文件：ListIndex.vue、ListContractIndex.vue、publicNotice.vue、index.vue
- 来源会话ID：0654e8d6-e325-415f-81d9-23f35e1436b6

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "notice_arrow_fix",
  "source_extraction_id": "cbccc77e23c04a3fb98fe21d70df4ad3",
  "version": 1,
  "memory_type": "entities"
}
-->