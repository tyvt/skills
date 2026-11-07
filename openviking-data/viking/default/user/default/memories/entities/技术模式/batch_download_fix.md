# 公共收益回单批量下载按钮禁用修复
苏住房G项目公共收益回单详情页「批量下载凭证」按钮原需先勾选才能点击，已改为始终可点击并智能下载。

## 问题根因
- 按钮绑定 `:disabled="!ids.length"`，未勾选时灰色禁用，看起来像坏了
- 实际未勾选也应允许下载全部回单凭证

## 修复内容
- 文件 `pubBankReceiptApply/components/detailTable.vue` 移除按钮禁用条件，按钮始终可点击
- 优化下载逻辑：已勾选则下载勾选记录，未勾选则自动下载该申请单下全部回单凭证（按总笔数拉取）
- 补充样式避免按钮区域被遮挡
- 注：「凭证下载状态」列图片异常多为 `voucherFileUrl` 无效或跨域，与按钮无关

## 涉及文件与归属
- 文件：`pubBankReceiptApply/components/detailTable.vue`、`property/bankReceiptApply/components/detailTable.vue`
- 所属项目：苏住房G；来源会话：6d19cd50-429c-4d48-9d3e-7689a0730262
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "batch_download_fix",
  "source_extraction_id": "513adfa05f2944cc8ff76ab9dbfa86cd",
  "version": 1,
  "memory_type": "entities"
}
-->