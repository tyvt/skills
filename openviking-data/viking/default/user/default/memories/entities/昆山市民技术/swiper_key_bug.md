# swiper-item key误用未定义index
昆山市民 swiper-item 的 v-for 使用 menu in swiperMenuList 但 :key 绑定未定义的 index 变量。

## 问题根因
- swiper-item 的 v-for 使用 `menu in swiperMenuList`
- :key 绑定了未定义的 `index` 变量，触发警告

## 修复方案
- 改为 `(menu, pageIndex) in swiperMenuList`
- 以 `pageIndex` 为 key 消除警告

## 涉及文件
- package.json
- vite.config.js
- src/main.js
- src/request/index.js
- src/env/mp.js
- src/manifest.json
- src/App.vue
- src/pages_home/home.js

## 验证与归属
- 所属项目：昆山市民
- 验证证据：extracted source=cursor project=昆山市民
- 来源会话ID：03eda42a-989a-414d-9b8a-46649f591538
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "swiper_key_bug",
  "source_extraction_id": "ab8c60a92ea7445d845556d78d295742",
  "version": 1,
  "memory_type": "entities"
}
-->