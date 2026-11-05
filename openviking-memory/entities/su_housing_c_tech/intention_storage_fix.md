# intention/list 联系方式跳转修复
苏住房C 小程序 pages_transaction/intention/list 在微信小程序点击「联系方式」报错。

## 问题根因
- 微信小程序环境没有 sessionStorage
- list 复用 my.vue 的 viewItem，误用浏览器 API sessionStorage 导致报错

## 修复方式
- my.vue 的 viewItem 改为 uni.setStorageSync（与同文件 editItem 一致）
- detail.vue 读取详情改为 uni.getStorageSync，并增加 || '{}' 防止空值解析报错

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_transaction/intention/my.vue、src/pages_transaction/intention/detail.vue
- 来源会话ID：f3006cc6-3479-4cab-8a4c-e366714a4084

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "intention_storage_fix",
  "source_extraction_id": "fc4dc38dfc23468783e1317ace9d6fe2",
  "version": 1,
  "memory_type": "entities"
}
-->