# PresaleProgressDialog.vue
预售许可申请中“工程形象进度查看”弹窗组件，位于 zhi2-web-admin/src/views/presale/permit/components/。

## 功能
- 查看/维护各楼幢工程形象进度及附件
- 只读态曾仅显示“已上传/未上传”文本，无法查看附件

## 修复后行为
- 数据模型为 snapshotFiles（busId→附件列表）
- 只读态按文件名渲染可点击链接，调用 downloadServerAssetFile 下载/查看
- 维护态上传成功同步更新映射

## 关联
- 所属项目：苏州市房地产监测V3（szfc-v3）
- 相关Bug：禅道6297（2026-11-06修复）


<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "presale_progress_dialog",
  "source_extraction_id": "8ded1a65a371411082bf410429dac993",
  "version": 1,
  "memory_type": "entities"
}
-->