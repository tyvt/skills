# 苏住房C弹窗ZsPopup伪元素事实
苏住房C的ZsPopup组件中`.popup-container::after`为空白壳伪元素，全库10+项目均无蓝色渐变样式。

## 伪元素现状
- 唯一命中：ZsPopup.vue中`.popup-container::after`，content为空、无background、无border-radius:50%、无`::before`
- 全库（含i淮安H5、泰兴小程序、昆山市民等10+项目）均为同一套空壳`::after`，无任何项目写蓝色渐变

## 类型样式缺失
- 模板有`:class="type"`对应`.error`/`.warning`/`.success`，但苏住房C内无任何对应CSS
- 涉及文件：ZsPopup.vue
- 验证证据：extracted source=cursor project=苏住房C；来源会话ID：dbf1d248-7d94-4036-9d42-d7e63b814f60

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zspopup_pseudoelement_fact",
  "source_extraction_id": "30a2036c9e1f47b7b6a75df36df72229",
  "version": 1,
  "memory_type": "entities"
}
-->