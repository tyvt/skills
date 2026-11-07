# 建设用地规划证不动产权证号错序
苏州市房地产监测V3 中「建设用地规划许可证」字段顺序不符设计稿，不动产权证号位于第4位，已调整至第7位。

## 问题根因
- `BaseLandLicForm.vue` 与 `changeDetail.vue` 中「建设用地规划许可证」字段顺序不符设计稿
- 不动产权证号位于第4位

## 修复方案
- 将不动产权证号移至用地性质之后（第7位）
- 查看态与编辑态同步，校验规则不变

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/216.md
- 涉及文件：projectManagement/certificate/planLic/detail.vue、stateLandLic/detail.vue、路由信息.json、conLandLic/detail.vue、conLandLic/components/BaseLandLicForm.vue、conLandLicChange/detail.vue、conLandLic/changeDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：2ad09f88-3393-44cf-96b0-eda0601788c6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "land_lic_misorder",
  "source_extraction_id": "dd2d49bc6bd5474d9cb19e215fd2759b",
  "version": 1,
  "memory_type": "entities"
}
-->