# 园区物管V0 意见维护单选切换残留旧选项ID
园区物管V0 业主投票意见维护弹窗在单选场景下切换选项时未清空旧选项 ID，已修复。

## 问题根因
- dialog.js 在「选择表决」且单选（optionBegin/optionEnd 均为 1，max === 1）时，选项列表误用多选表格
- 切换选项时 selection 同时含新旧两项，原逻辑在 selection.length > max 时取消新选项，旧选项残留 chooseList
- 提交时 idStrArr 带上之前的选项 ID

## 解决方案
- handleChooseVote：当 max === 1 且已选超过 1 项时，先 clearSelection() 再只勾选当前项，实现单选切换并清空旧 ID
- close：关闭弹窗时重置 chooseList，避免下次打开残留上次数据

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管V0
- 涉及文件：EstateManagement-Park/src/main/webapp/ownerVote/components/dialog.js
- 所属项目：园区物管V0；来源会话ID：ac2d34d3-11af-46a8-91d6-aec8e65207bb

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "dialog_single_select",
  "source_extraction_id": "699078b4f19642a0bb7063574b980cd1",
  "version": 1,
  "memory_type": "entities"
}
-->