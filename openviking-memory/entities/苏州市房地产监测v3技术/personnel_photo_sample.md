# PersonnelPhotoField证件照示例
苏州市房地产监测V3的PersonnelPhotoField.vue默认展示证件照示例图并铺满180×270框。

## 功能约定
- 示例图路径：zhi2-web-admin/src/assets/images/personnel-photo-sample.png
- 默认展示该图，去掉重复标题条，铺满180×270框
- 支持sampleImage属性覆盖默认图

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- E2E断言改为查加载（personnel-basic-info-visual.spec.js）
- 涉及文件：PersonnelPhotoField.vue、personnel-basic-info-helpers.js
- 来源会话：d7ebf2d0-69b6-470e-b1b9-11873a199e6d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "personnel_photo_sample",
  "source_extraction_id": "48282b6d94f34f6a8a8894ba97586423",
  "version": 1,
  "memory_type": "entities"
}
-->