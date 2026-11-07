# fddydetail字段映射与富文本电话修复
苏住房C小程序 `fddydetail.vue` 因接口字段名与页面字段名不一致导致数据读不到，已修复并支持富文本内电话拨打。

## 问题根因
- 页面原字段与接口实际字段不匹配：`loadLimit`→`loanAmount`、`loadTerm`→`loanTerm`、`loadRate`→`loanRate`、`otherFees`→`otherCharges`、`contact`→`contactInformation`
- 联系方式显示 `-` 是因为页面读 `contact` 而接口返回 `contactInformation`

## 修复要点
- `fddydetail.vue`：字段名全部对齐接口；联系方式用 `ZsRichText` 渲染 `contactInformation`（号码可点击拨打）
- 有 `qrCodeAddress` 时在下方展示微信二维码
- `formatRichTextContent` 增强：纯文本 `
` 转 `<br/>`，多行内容正常换行

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/components/ZsRichText/ZsRichText.vue、src/components/PhoneCall/PhoneCall.vue、src/utils/index.js、fddydetail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：9264f45e-ecce-4dd7-99a3-b9af544b8e18；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "fddydetail_fix",
  "source_extraction_id": "28e8d98968314a9086db1bb85f1eddd6",
  "version": 1,
  "memory_type": "entities"
}
-->