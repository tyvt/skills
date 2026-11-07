# 回单核销删除单据金额同步修复
园区公共收益 zhi2-web-admin 修复回单核销详情页删除单据后「基本信息」中「本次核销金额」不更新的问题。

## 问题原因
- 删除单据时 table.js 的 handleDelete 仅刷新子表列表，不通知父页面
- 详情页 detail.vue 已通过 @refresh="getDetail" 绑定刷新，但删除操作从未触发该事件
- 导致「基本信息」里的「本次核销金额」仍显示旧值

## 修改文件
- zhi2-web-admin/src/views/benefit/pubVerificationReceipts/components/VerificationReceiptDetailTable.vue

## 主要改动
- 新增 deleteSuccessCallback() 方法，删除单据成功后 this.$emit('refresh')
- 触发父组件 getDetail 重新调用详情接口，同步更新「本次核销金额」（列表清空时变为 0 或空）

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：dca7c647-3133-4108-a280-c82a7ee0abb4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "receipt_delete_fix",
  "source_extraction_id": "c7a49d90ffe84975b691194a3bab1e33",
  "version": 1,
  "memory_type": "entities"
}
-->