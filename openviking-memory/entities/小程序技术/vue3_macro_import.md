# Vue3 script setup 误 import 编译器宏警告
苏住房C 小程序多个 SFC 在 <script setup> 里误 import defineProps/defineEmits，编译时持续刷 compiler macro 警告。

## 问题现象
- zhi2-mobile-shimin 多个 SFC 写 `import { defineProps, defineEmits } from 'vue'`
- 编译/差量编译时终端持续刷 Vue 3 编译器提示，提示二者是 compiler macro、无需 import

## 根因
- defineProps/defineEmits 是编译器宏，由 <script setup> 编译期注入，显式 import 被识别为错误用法
- 虽不阻断编译但污染编译输出掩盖真正报错；首次全量编译旧输出残留终端易误以为没修好

## 解决方案
- 把 defineProps/defineEmits 从 vue 的 import 列表删掉，只保留真正需要的 ref/computed/onMounted 等
- 若文件只用到宏不需要任何 vue 导出，直接整行 import 删除
- 改完只需差量编译，终端仍出现旧提示属全量编译旧输出可忽略
- 本次在 page-query/components 下修了 5 个文件：FilterPopupComponent、NewFilterComponent、CompanyItem、PropertyCard、PropertyItem

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C；来源会话：b7ff0fc8-8e3a-4961-ab91-06155333fe7b；代码基线：5f0f4dc
- 涉及文件：src/page-query/components/FilterPopupComponent.vue、NewFilterComponent.vue、CompanyItem.vue、PropertyCard.vue、PropertyItem.vue

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "vue3_macro_import",
  "source_extraction_id": "f6816503b931464c9b89b467f68dad1b",
  "version": 1,
  "memory_type": "entities"
}
-->