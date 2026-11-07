# zs-table 边框样式修复
产品2.0 中 zs-table 的 border 属性传递与全局样式冲突导致列竖线显示异常，已修复。
## 问题根因
- zs-table 的 :border 传给 el-table，为 true 时加 el-table--border
- .list-card 全局样式之前无条件给所有单元格加 border-right，忽略 border 属性
## 修复方案
- index.scss：列竖线仅在 el-table--border 时显示，border:true 显示横线+竖线，border:false 仅横线
- zs-table.vue：增加 isBorderEnabled 和容器类 zs-table-container--border，与 border 属性同步
## 使用说明
- border:true 显示列竖线+行横线；border:false 仅行横线无列竖线
- 行与行之间横线为列表页默认样式，非 border 控制
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：49ee8efa-ceee-4350-9446-1a98b38420eb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_border_fix",
  "source_extraction_id": "1c09274c8b434289b317093b24eed6ea",
  "version": 1,
  "memory_type": "entities"
}
-->