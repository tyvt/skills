# ArchiveDetailDialog 状态选项名不匹配致 DictTag find 报错
ArchiveDetailDialog.vue 的 contentInfo「状态」项引用 `this.dirStateOptions`，但 data 中只有 `fileDirStateOptions`，导致 options 为 undefined，进入详情视图触发 `Cannot read properties of undefined (reading 'find')`。

## 问题根因
- `DictTag` 内用 `this.options.find(...)` 解析字典标签（getLabel/getTagType）
- ArchiveDetailDialog.vue 的 contentInfo「状态」写的是 `this.dirStateOptions`
- data 里实际只有 `fileDirStateOptions`，无 `dirStateOptions`，options 一直为 undefined
- 进入详情视图模式即触发 `Cannot read properties of undefined (reading 'find')`

## 解决方案
- 将「状态」的 options 改为 `this.fileDirStateOptions`（与 data 一致）
- 经 `initDict()` 中 `getDicts('IS_START')` 赋给 `fileDirStateOptions` 后，详情状态标签正常

## 验证与归属
- 验证证据：extracted source=cursor project=bugfix
- 涉及文件：ArchiveDetailDialog.vue；dict-tag.vue；vue.js
- 来源会话ID：c7437440-9b9d-4339-9758-66a24e4c7ff7
- 所属项目：bugfix；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dicttag_dirstateoptions",
  "source_extraction_id": "20272dbf54aa4840a79ddd749472adaa",
  "version": 1,
  "memory_type": "entities"
}
-->