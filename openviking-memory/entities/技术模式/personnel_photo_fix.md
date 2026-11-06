# 从业人员证件照示例图接入
苏州市房地产监测V3 项目中，证件照示例图已接入从业人员表单的「示例图」区域。

## 改动说明
- 静态资源：图片保存为 zhi2-web-admin/src/assets/images/personnel-photo-sample.png
- PersonnelPhotoField.vue：默认展示示例图（经纪机构/租赁从业人员共用），去掉重复标题条，整图铺满右侧 180×270 框
- 仍可通过 sampleImage 覆盖默认图；E2E 断言改为检查示例图是否成功加载

## 生效范围与注意
- 生效页面：机构端经纪机构从业人员、租赁从业人员新增/编辑/查看时的「个人证件照」右侧示例框
- 视觉回归 personnel-basic-info-visual.spec.js 基线可能需按新图更新；提交时图片与组件改动一起纳入版本库

## 涉及文件与归属
- 涉及文件：PersonnelPhotoField.vue、personnel-basic-info-helpers.js、personnel-basic-info-visual.spec.js
- 所属项目：苏州市房地产监测V3
- 来源会话ID：d7ebf2d0-69b6-470e-b1b9-11873a199e6d；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_photo_fix",
  "source_extraction_id": "2f30ec58d9394013bd84cd5ef6e15455",
  "version": 1,
  "memory_type": "entities"
}
-->