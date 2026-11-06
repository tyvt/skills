# 详情页右侧无遮罩抽屉遮挡修复
苏州市房地产监测V3 修复无遮罩右侧抽屉（modal=false）遮挡详情页第三列表单的问题，主表单整体左移。

## 原因
- 右侧抽屉来自 OperationBtnGroup 的 attachmentDraw（审核流程时间线）及价格备案详情本地 el-drawer「查看备案记录」，均为 modal=false，主区域宽度不变会盖住最右一列

## 修复方式
- 新增 `detailSideDrawerInset.js`：按来源 ID 登记多个抽屉，取最大宽度给 `.detail-container` 加 padding-right（关闭一个不误伤另一打开的抽屉）
- `attachmentDraw.vue`：抽屉打开/变宽/关闭时同步 inset
- `recordPriceMngSuzhou/detail.vue` 与 `changeDetail.vue`：本地备案记录抽屉同样处理
- 全局样式 `styles/detail-side-drawer-inset.scss`（在 index.scss 引入）

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：6e015a9d-77e6-4012-9871-981bdb55899e
- 涉及文件：detailSideDrawerInset.js、attachmentDraw.vue、recordPriceMngSuzhou/detail.vue、changeDetail.vue、styles/detail-side-drawer-inset.scss
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "v3_drawer_inset",
  "source_extraction_id": "1c43be6e1763445fbf0f4d5695251802",
  "version": 1,
  "memory_type": "entities"
}
-->