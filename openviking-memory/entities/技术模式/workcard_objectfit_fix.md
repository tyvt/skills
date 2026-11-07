# 缺少 object-fit 的证件下载
html2canvas 原生不支持 object-fit，导致证件下载时图像被拉伸。

## 问题
- `html2canvas` 不支持 `object-fit`，导致下载时证件照片和 logo 变形。

## 解决方案
- 新增 `html2canvasObjectFit.js` 在 `onclone` 期间根据 object-fit 在 canvas 上重绘图像。
- `WorkCardDialog.vue` 和 `InfoCardDialog.vue` 在 `handleDownload` 中处理 `.work-card__photo`、`.work-card__logo` 节点。

## 文件
- WorkCardDialog.vue, AgencyPersonnelList.vue, InfoCardDialog.vue, spec e2e, resolveServerAssetUrl.js, html2canvasObjectFit.js, package.json.

## 验证
- 验证证据: src=苏州市房地产监测V3-leftover/020.md; 会话 0b2661f5-bbe8-434f-86da-96244d6397a7; 项目 苏州市房地产监测V3.

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：0b2661f5-bbe8-434f-86da-96244d6397a7


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workcard_objectfit_fix",
  "source_extraction_id": "5cb4457da8b74ad0b105228a1b4260cf",
  "version": 1,
  "memory_type": "entities"
}
-->
