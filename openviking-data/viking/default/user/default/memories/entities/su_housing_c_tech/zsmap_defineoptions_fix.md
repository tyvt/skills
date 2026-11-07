# ZsMap.vue defineOptions 报错修复
苏住房C 小程序 ZsMap.vue 在微信小程序运行时报 defineOptions is not defined。

## 问题根因
- 项目使用 Vue 3.2.45，defineOptions 是 Vue 3.3+ 才提供的编译宏
- 微信小程序运行时无该宏，报 ReferenceError: defineOptions is not defined

## 修复方式
- 按项目内 ZsPaging.vue 惯例，将 defineOptions({ inheritAttrs: false }) 改为单独 <script> 块 export default { inheritAttrs: false }
- 功能不变：仍禁止自动透传 attrs，组件手动将 class 和 style 绑定到 <map>

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/components/ZsMap/ZsMap.vue、src/components/ZsPaging/ZsPaging.vue、package.json
- 来源会话ID：7b29aae4-6de6-4f5e-9c69-1a5875a30571

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zsmap_defineoptions_fix",
  "source_extraction_id": "fc4dc38dfc23468783e1317ace9d6fe2",
  "version": 1,
  "memory_type": "entities"
}
-->