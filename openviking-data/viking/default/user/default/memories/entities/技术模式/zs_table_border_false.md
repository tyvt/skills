# zs-table border=false 列竖线规范
zs-table 设 :border=false 仍显示列竖线，因全局样式无条件给单元格加 border-right，须收窄到 el-table--border 作用域。

## 问题现象
- 资产租赁申请、资源租赁申请（列表页与详情页同理）将 zs-table 的 :border 设为 false，列竖线仍存在

## 根因
- zs-table 的 border 只往 el-table 打 el-table--border 类
- .list-card 全局样式无条件给所有单元格加 border-right，忽略 border 属性开关

## 修法规范
- 将列竖线规则收窄到 .el-table--border 作用域：border=true→列竖线+行横线；border=false→只留行横线
- zs-table 补 isBorderEnabled 判定并输出容器类 zs-table-container--border，让两种口径组件层可辨
- 验收向用户说明：border=false 仍见行间横线是列表页默认样式，非 border 控制的列竖线
- 公共层改完须回归其他模块列表，属全站表格边框规范一部分

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 会话 49ee8efa 根因明确为 .list-card 全局无条件加 border-right，index.scss 收窄到 el-table--border、zs-table.vue 增 isBorderEnabled/zs-table-container--border
- 涉及文件：styles/index.scss、components/zs-table/zs-table.vue、benefit/assetLeaseApply/index.vue
- 所属项目：产品2.0；来源会话：49ee8efa-ceee-4350-9446-1a98b38420eb；代码基线：41c6961

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_border_false",
  "source_extraction_id": "741d126eb5854e64aed1e6056f86c066",
  "version": 1,
  "memory_type": "entities"
}
-->