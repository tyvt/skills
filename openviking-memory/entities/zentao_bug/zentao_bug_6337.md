---
audit_status: valid
last_checked: 2026-11-27T22:12:05+08:00
verdict_note: 苏州V3 chooseHouseDialog.vue 命中 syncSelectedHouseHighlight/handleClickNode/selectedHouse，复用高亮机制属实
---
# 禅道缺陷 6337
预售合同签订模块缺陷：新增合同时点击左侧楼幢会清空右侧已选房屋数据。

## 基本信息
- 缺陷标题：预售合同签订：新增合同时，点了左边楼幢后，右边已选房屋数据会被清空。
- 禅道链接：http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6337。
- 原始截图 fileID=21960；2026-11-27 重新激活时新增复现图与期望图两张截图。
- 所属代码库：zhi3-web-admin-h5（会话 GitLab 同伴标识）。

## 根因与历史
- 2026-11-09 曾修复（commit `0910feb64`），2026-11-27 重新激活：点击左侧楼幢再次清空右侧已选房屋，旧修复未保持。
- 根因：单选改造（task #2513，commit `51b073064`）重新引入清空逻辑，`handleClickNode` 在 447-448、457-458、470-471 行执行 `selectedHouse = null`。
- 现成机制：`syncSelectedHouseHighlight()` 可在列表重载后恢复高亮，修复优先复用该机制。

## 修复与验证
- 2026-11-27 实施修复：移除楼幢点击/单元点击处的 `selectedHouse` 清空块，保留 `syncSelectedHouseHighlight()`；264-265 行清空属弹窗关闭清理，予以保留。
- ESLint 检查 0 错误（2 条既有警告）；生产构建 EXIT=0。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6337",
  "source_extraction_id": "1e3c306705ff400ca5f07fd77aa5614e",
  "version": 1,
  "memory_type": "entities"
}
-->