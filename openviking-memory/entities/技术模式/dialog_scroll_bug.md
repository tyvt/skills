# 弹窗内容超出无法滚动问题排查
苏住房G项目 develop/v2.6.2-suzhufang 分支弹窗内部内容超出却无法滚动，develop/v2.6.2 无此问题。

## 问题根因
- 当前分支包含提交 4defa2128（新增高度自适应 + neutralizeInnerScrollContainers）和 4879d1d31（引入 zs-dialog--scrollable 模式）导致无法滚动
- develop/v2.6.2 停留在 f1b078cb9，zs-dialog 使用 form-box 的 overflow:auto + max-height 内部滚动，无 scrollable 模式，故正常

## 涉及提交与分支
- 问题分支：develop/v2.6.2-suzhufang（含 4defa2128、4879d1d31）
- 正常分支：develop/v2.6.2（旧逻辑）

## 涉及文件与归属
- 文件：zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue、src/views/system/menu/index.vue
- 所属项目：苏住房G；来源会话：17392583-56a4-49a0-82fb-430a5f1aadfe；验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_scroll_bug",
  "source_extraction_id": "02759d82d8a9496b98e4adfceff55de0",
  "version": 1,
  "memory_type": "entities"
}
-->