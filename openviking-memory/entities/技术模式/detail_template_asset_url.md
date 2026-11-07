# DetailTemplate图片转绝对路径致依赖反代
园区公共收益项目(zhi2-web-admin)中，detail-template.vue 图片地址转站点根绝对路径须依赖 /zhi2 反代，需改相对路径保持一致。

## 问题根因
- detail-template.vue 图片地址使用 resolvePublicAssetUrl 转站点根绝对路径
- 绝对路径须依赖 /zhi2 反代，部署耦合度高

## 解决方案
- 改用 resolveServerAssetUrl 保持相对路径
- 与 ImageUpload 组件图片处理方式一致

## 涉及文件
- src/utils/resolveServerAssetUrl.js
- src/components/detail-template/detail-template.vue
- src/views/company/companyRegister/detail.vue
- src/vite.config.js

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：2339a924-fde7-4822-9f1d-c02ed74f8b35；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_asset_url",
  "source_extraction_id": "cfd7b23fcef747ecbde4acd045c019b6",
  "version": 1,
  "memory_type": "entities"
}
-->