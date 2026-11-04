# 登记后预售许可证查看按钮未实现
在苏州市房地产监测V3项目中，登记后详情页面中的“查看预售许可证”按钮未实现；已修复。

## 问题根因
- 登记后详情页面中的“查看预售许可证”按钮未实现

## 解决方案
- `permitConstants.js` 添加了 `resolvePermitFileUrl()` 用于解析附件地址
- `detail.vue` 在 `isRecorded` 且为查看模式时渲染该按钮，启动流程

## 验证与归属
- 验证证据: src=cursor session=8f60e217-5cbf-4370-829a-83d765cd7761
- 涉及文件: presale/permit/components/detail.vue, components/OperationBtnGroup/index.vue, detail-template-long-labels.md, permitConstants.js, utils/resolveServerAssetUrl.js, presale/entrustSale/components/detail.vue
- 所属项目: 苏州市房地产监测V3; 会话: 8f60e217-5cbf-4370-829a-83d765cd7761

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "permit_record_view_btn",
  "source_extraction_id": "ba65b1d725fd4ce6a4a63d7ccdd79309",
  "version": 1,
  "memory_type": "entities"
}
-->
