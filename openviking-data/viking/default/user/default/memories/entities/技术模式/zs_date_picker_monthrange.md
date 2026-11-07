# zs-date-picker 缺少 monthrange 分支：拆成两个单月选择器
在对账文件列表改造中，zs-date-picker 在 range:true 时仅支持 daterange/datetimerange，无 monthrange 分支，需用两个单月选择器实现月份区间。
## 问题根因
- zs-date-picker 源码 type 计算表达式在 range:true 时只在 daterange/datetimerange 间切换，无 monthrange 分支
- 原生 el-date-picker 支持 monthrange，照搬到 zs-date-picker 会误以为支持
- 通过 attrs 透传 type:'monthrange' 理论可行，但项目无此用法，唯一验证过的月份用法是单月 type:'month'
## 解决方案
- 拆成两个单月选择器（开始月份/结束月份），查询参数保持后端约定的 xxxBegin/xxxEnd 成对字段
- 改日期区间控件前先读 zs-date-picker 的 type 计算表达式确认支持的类型组合
- 凡组件未声明的类型一律拆成单值控件，比透传 attrs 更可控
- 与「营业期限结束可为 null 时不用 daterange」不同：本条是组件能力缺类型，而非可空值语义问题
## 验证与归属
- 验证证据：会话 16e73830，用户要求按框架规范改 pubRecBankFile 列表，追问 monthrange 支持情况，结论拆两单月选择器
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRecBankFile/index.vue、zhi2-web-admin/src/components/zs-date-picker/zs-date-picker.vue
- 所属项目：苏住房G；来源会话ID：16e73830-99fb-4000-928d-063072072d4d；代码基线：e590ffa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_date_picker_monthrange",
  "source_extraction_id": "6309376b0dde46f082e58b77a70f3936",
  "version": 1,
  "memory_type": "entities"
}
-->