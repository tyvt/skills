# 变更详情contentInfo末增remark独占行
自治变更房产详情弹窗 contentInfo 数组末尾追加 remark 项（显示名"变更内容"），layout 的 xs/sm/md/lg/xl 全部设为 24 实现独占一行。

## 问题根因
- zhi2-web-admin/src/views/autonomy/change/property/detail.vue 原 contentInfo 缺少变更内容项且未独占一行

## 解决方案
- contentInfo 数组末尾追加 remark 项，显示名"变更内容"
- remark 项 layout 的 xs/sm/md/lg/xl 全部设为 24 实现独占一行

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/views/autonomy/change/property/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor session=667f57c4-46bf-4026-b4cf-866c7a9cab67
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contentinfo_remark_layout",
  "source_extraction_id": "d50e546115c8453f98a64d69c3ed6dce",
  "version": 1,
  "memory_type": "entities"
}
-->