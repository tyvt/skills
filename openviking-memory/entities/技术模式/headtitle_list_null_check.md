# 列表项未判空直接访问value引发读取属性报错
`zhi2-web-admin/src/components/HeadTitle/index.vue` 中 this.list 存在 undefined 元素时直接访问 item.value 导致报错。

## 问题根因
- this.list 存在 undefined 元素
- 直接访问 item.value 触发读取属性报错

## 解决方案
- 模板使用 v-if="item && item.value" 增加空值保护
- 计算属性使用 this.list.filter((item) => item && item.value)

## 验证与归属
- 验证证据：src=2-0/014.md
- 涉及文件：zhi2-web-admin/src/components/HeadTitle/index.vue
- 来源会话ID：81bba5d5-8e98-492f-90aa-3fa01f341b6d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headtitle_list_null_check",
  "source_extraction_id": "e92e113b6217448e810aa27c305e1d32",
  "version": 1,
  "memory_type": "entities"
}
-->