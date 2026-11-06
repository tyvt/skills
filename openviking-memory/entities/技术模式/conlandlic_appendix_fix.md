# 要件上传缺省图错误路径与未注册修复
苏州市房地产监测V3 中 conLandLic 详情页误引不存在的 AppendixEmpty 路径且 AppendixPackageSection 未注册组件，导致 Vite 解析报错，已修复。

## 问题根因
- conLandLic/detail.vue、changeDetail.vue 误写为已不存在的 @/components/AnnexUpload/components/AppendixEmpty.vue
- AppendixPackageSection/index.vue 模板使用 AppendixEmpty 但未注册组件

## 修复内容
- conLandLic 两个文件改为 @/components/AppendixEmpty/index.vue（与 presale/surveyChange/detail.vue 一致）
- AppendixPackageSection/index.vue 补上 import 与 components 注册

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：src/components/AppendixEmpty/index.vue、conLandLic/detail.vue、conLandLic/changeDetail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：3e018025-42b0-4579-8189-908990fe5d69

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "conlandlic_appendix_fix",
  "source_extraction_id": "78f87c11712447268d552847ce02e222",
  "version": 1,
  "memory_type": "entities"
}
-->