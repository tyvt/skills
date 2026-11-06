# 预售许可证查看按钮修复
苏州市房地产监测V3 中备案后详情页缺失「查看预售许可证」按钮，已通过新增解析与按钮逻辑修复。

## 问题
- 备案后详情页缺少「查看预售许可证」按钮，因功能未实现

## 修复要点
- `permitConstants.js` 新增 `resolvePermitFileUrl()`，按顺序读取 `permitFileSite`/`permitDocSite`/`permitUrl`
- `detail.vue` 在 `isRecorded` 且查看模式时右上角显示「查看预售许可证」按钮，点击新标签打开 PDF
- 同步开启「流程查看」并传入 `:bus-code="appendixBusCode"`

## 涉及文件
- zhi2-web-admin/src/views/presale/permit/permitConstants.js
- zhi2-web-admin/src/views/presale/permit/components/detail.vue
- vite.config.js

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 来源会话：8f60e217-5cbf-4370-829a-83d765cd7761；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_btn_fix",
  "source_extraction_id": "6e590f142e9a49449b6145ec50c5ca14",
  "version": 1,
  "memory_type": "entities"
}
-->