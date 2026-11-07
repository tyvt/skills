# 编辑弹窗重拉详情丢字段
子表编辑弹窗打开时重请求详情接口，但详情接口不返回某些字段（如 relBusinessId），导致提交更新接口时该字段缺失，后端参数校验 400。

## 现象
- 列表行有 relBusinessId 值，但编辑弹窗重建 payload 时该字段被静默丢掉
- 提交更新接口因字段缺失直接 400

## 根因
- 编辑弹窗表单数据源从「列表行」切换成「详情接口返回」，详情接口未携带的字段在重建 payload 时丢失

## 解决方案
- 打开编辑弹窗时先把列表行中的该字段预填进表单
- 详情加载完成后仅在该字段缺失时回退使用列表行数据（不覆盖详情已返回的值）
- buildSubmitPayload 中按「当前表单 → 原始表单 → 列表行数据」三级优先级显式带上该字段
- 同类「编辑弹窗重拉详情」的子表都应检查详情接口字段覆盖面，缺的字段用列表行兜底

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 1ee4f9a4 核销明细编辑保存 400，根因是详情接口未返回 relBusinessId；通过 handleUpdate 传行数据、弹窗预填、buildSubmitPayload 三级优先兜底修复
- 涉及文件：src/views/benefit/pubVerificationReceipts/components/VerificationReceiptDetailTable.vue、VerificationReceiptDetailDialog.vue
- 所属项目：园区物管2.0；来源会话ID：1ee4f9a4-13b3-4034-ad86-3721cc8340be

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "edit_popup_detail_field_loss",
  "source_extraction_id": "5b26d684e1994d57a0497c243d77061a",
  "version": 1,
  "memory_type": "entities"
}
-->