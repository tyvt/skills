# 服务周报区域选择列表不全
苏住房G 街道账号在服务周报选「物业管理区域」列表不全且无分页，补分页后因手动高度计算末行被裁。

## 问题现象
- 街道账号服务周报选物业管理区域有 101 条数据，列表未显示全且无分页
- 补分页后最后一条被挡住半边

## 根因分析
- 选择弹窗区域列表打开即全量取一次，未带 pageNum/pageSize 也未接 zs-pagination，超出静默截断
- 首轮修复手动算 tableHeight 传 zs-table，与 flex 纵向布局实际空间偏差，表格偏高被 overflow:hidden 裁行

## 修复方案
- rangeTable.vue 改用项目内置 fill-height，删全部手动 tableHeight 计算逻辑
- table-container 改 flex 纵向，表格 flex 占满、zs-pagination 固定底部
- selectRangeDialog.vue 移除不再需要的高度重算逻辑，避免与 fill-height 抢高度

## 经验沉淀
- 选择类弹窗大数据集必须服务端分页，表格高度交给 fill-height 不要手算
- 涉及文件 system/message/components/rangeTable.vue、selectRangeDialog.vue、index.vue、service/index.vue；会话 0b5e17ad；基线 c2a604a

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "range_select_pagination_bug",
  "source_extraction_id": "0486331f426744389b891531c5cf81c6",
  "version": 1,
  "memory_type": "entities"
}
-->