# detail_setrow_guard
园区物管2.0 详情页 mounted 误读 sessionStorage.setRow 仅新增选资产路径写入的修复模式。

## 问题根因
- benefit/housePart 等页 mounted 里无条件 JSON.parse(sessionStorage.getItem('setRow')) 并访问 row.houseId
- 从列表点「查看」进入时不会写入 setRow，parse(null) 得 null 再取属性直接报错
- setRow 只在列表「新增→选择资产」时由 handlePick 写入用于新增预填；查看/编辑应走 detailMixins.init() 拉详情

## 解决方案
- 仅在 formMode === 'add' 时执行该段；对 setRow 做空值判断并用 row?.houseId
- 与「sessionStorage 草稿回显」类条目不同：误把新增专用 key 当成所有模式入口

## 验证与归属
- 验证：会话 ad4fc981 中 housePart/detail.vue mounted 无条件读 setRow 导致列表进详情报错；限定 add + 空值安全访问后恢复
- 涉及文件：housePart/detail.vue、detailMixins.js；所属项目：园区物管2.0；代码基线：177bc3ce4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_setrow_guard",
  "source_extraction_id": "a1f1b35f47af4915ad79cae6583607ea",
  "version": 1,
  "memory_type": "entities"
}
-->