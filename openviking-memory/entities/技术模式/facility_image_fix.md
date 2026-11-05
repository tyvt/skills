# 设施设备记录步骤图片回显修复
物业/设施详情中步骤图片因 DetailTemplate 的 image 类型做后缀判断而不显示，改用 images 类型修复。

## 问题根因
- `DetailTemplate` 中 `type: 'image'` 先按 URL 取后缀，仅 `jpg/jpeg/png/gif/bmp/webp/svg` 用 `<img>`，否则走「附件」分支显示成可点链接
- 接口地址常无后缀或路径不含 `.jpg`（如 `/profile/xxx`、带 token 查询串），被当非图片，显示为链接而非缩略图

## 解决方案
- 新增计算属性 `stepPictureUrlList`，从 `stepImages`（或对象 `url` 等字段）统一整理成字符串 URL 数组，与 `detailCallback` 编辑态数据一致
- 查看模式改为 `type: 'images'`：`DetailTemplate` 对 `images` 直接用 `resolveServerAssetUrl` 拼 `<img>`，不做后缀判断，无后缀站内图也能显示
- 无图片时仍用 `type: 'text'` 显示占位，与原空图 `-` 行为一致

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/dataProperty/recordProcess/components/recordProcessStepDialog.vue、scrappedRecord/detail.vue、mixins/detailMixins.js、maintenance/facility/components/FacilitySelectDialog.vue
- 所属项目：产品2.0；来源会话：321b7eb6-d1b4-4f6b-865c-11661215d619；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "facility_image_fix",
  "source_extraction_id": "b837a06438f441dda7f1aae99615b63a",
  "version": 1,
  "memory_type": "entities"
}
-->