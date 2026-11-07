# 租赁合同备案问号提示改造
苏州市房地产监测V3 中租赁合同备案的「产权证类型」「产权证书编号」两个问号提示，已对齐苏找房 verification 模块换成提示图片，已完成并提交 0bfec58dd。

## 改动内容
- `PropertyVerifyDialog.vue` 图片相关改动，两个「？」提示文字全部换成苏找房项目提示图片
- 「产权证类型」问号对应苏找房 tipComponent type=4，tooltip 内两列证书封面图（左列房产证示例：新版红色房屋所有权证+旧版深色封面；右列不动产证示例：红色封面）
- 「产权证书编号」问号对应苏找房 tipWarrant，按区域×证型动态切换红框标注的登记簿图示
- 区域口径与苏找房一致：`RD002=工业园区` 出园区专用图示

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：PropertyVerifyDialog.vue、e2e/fixtures/lease-contract-helpers.js、e2e/presale/lease-contract-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话ID：3112e935-8b6c-4c36-bde1-da3d29bbabd9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_qmark_image",
  "source_extraction_id": "f45b2d9001e245ccb9ed80599939ed23",
  "version": 1,
  "memory_type": "entities"
}
-->