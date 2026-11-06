# 预售选择楼幢弹窗布局修复
苏州市房地产监测V3 项目修复预售/现售「选择楼幢」弹窗（presale-select-building-dialog）使用 zs-select-dialog 导致的大块空白问题。

## 修改内容
- `dialog-right` 设为 `width: 100%`，去掉内层 `padding`；表格区域取消绝对定位，强制 `el-table` `width: 100%`
- `dialog-box` 改为 `height: auto`，避免无数据时下方/右侧大块留白
- `resolveBuildingList` 增加 `records` / `res.rows` 等兼容，减轻「接口有数据仍显示暂无数据」的情况

## 涉及文件
- `zhi2-web-admin/src/views/presale/permit/components/PresaleSelectBuildingDialog.vue`
- `zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue`

## 验证与归属
- 验证方式：刷新后打开「选择楼幢」看表格是否已横铺满弹窗
- 所属项目：苏州市房地产监测V3
- 来源会话ID：b5dcbf27-aa94-4d27-a97a-978ba9a2e7cd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_dialog_fix",
  "source_extraction_id": "2fe7eac52e9242108067236bba5afb01",
  "version": 1,
  "memory_type": "entities"
}
-->