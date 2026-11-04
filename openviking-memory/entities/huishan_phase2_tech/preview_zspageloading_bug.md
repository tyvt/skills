# preview.vue 缺失 ZsPageLoading 组件修复
惠山二期H5 中 preview.vue 因引用不存在的 ZsPageLoading 组件导致报错，已从无锡市区目录复制补全。

## 问题原因
- preview.vue 引用 @/components/ZsPageLoading/ZsPageLoading.vue，但该组件在当前项目不存在
- 该组件仅存在于「无锡市区」目录，且此目录在 .gitignore 中未被纳入版本控制

## 处理方案
- 已从 无锡市区/zhi2-mobile-admin-h5-c-unlimited/src/components/ZsPageLoading/ 复制到当前项目对应路径
- 组件为页面级加载动画（旋转 spinner +「加载中...」文案）
- benefit/index.vue、gauge/index.vue 等页面也依赖此组件

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 涉及文件：preview.vue、@/components/ZsPageLoading/ZsPageLoading.vue、benefit/index.vue、gauge/index.vue
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）
- 来源会话ID：50bd54d9-da06-4e47-b5a7-b5123d1eb366；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "preview_zspageloading_bug",
  "source_extraction_id": "079561c593f04c1e850fa705e0d082e1",
  "version": 1,
  "memory_type": "entities"
}
-->