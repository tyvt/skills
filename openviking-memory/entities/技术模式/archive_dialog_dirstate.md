# ArchiveDetailDialog字典项误引dirState致options未定义
ArchiveDetailDialog.vue 的 contentInfo 中"状态"项绑定 this.dirStateOptions，但 data 仅定义 fileDirStateOptions，致使 DictTag 内 options 为 undefined 并调用 find 报错。

## 问题根因
- contentInfo 的"状态"项误绑 this.dirStateOptions
- data 仅定义 fileDirStateOptions，字段名不匹配致 DictTag options 为 undefined
- DictTag 内对 undefined options 调用 find 报错

## 解决方案
- 将该 options 改为 this.fileDirStateOptions 以匹配 initDict 赋值

## 验证与归属
- 验证证据：src=bugfix/003.md
- 涉及文件：ArchiveDetailDialog.vue
- 来源会话ID：c7437440-9b9d-4339-9758-66a24e4c7ff7
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "archive_dialog_dirstate",
  "source_extraction_id": "a3bfbac947954a81ad8f12ef85714da5",
  "version": 1,
  "memory_type": "entities"
}
-->