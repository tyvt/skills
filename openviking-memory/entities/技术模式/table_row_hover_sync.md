# 表格行悬停色跨表体同步
zs-table 等表格需统一行悬停背景色，固定列与操作列因独立 DOM 必须同步 hover-row。

## 问题现象
- 用户要求所有表格行悬停背景统一为 #f5f7fa，但详情子表、弹窗内表格、带固定操作列表格悬停效果各不相同
- 固定列与操作列悬停不变色，zs-operate-column 写死白底不跟色

## 根因
- el-table 固定列渲染在独立 .el-table__fixed-body-wrapper，hover-row 只加在鼠标所在表体块
- zs-operate-column 单元格背景写死 #ffffff，即使行拿到 hover-row 也不跟色

## 修复方案
- 不在页面级写 .el-table__body tr:hover 覆盖
- variables.css 新增全局 token --table-row-hover-background-color: #f5f7fa
- element-ui.scss 统一 el-table 悬停规则覆盖主表体、固定列、选中行优先级
- zs-operate-column 去掉写死白底，改为悬停/选中跟随行背景
- zs-table.vue 悬停时把 hover-row 同步派发到主表体与所有固定列（含反向触发）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：最终结论「问题原因」两条 + 修改内容四点
- 涉及文件：variables.css、element-ui.scss、zs-table.vue、benefit/pubSubjectInfo/index.vue
- 所属项目：产品2.0；来源会话：80a5b505-898c-436f-8ccc-b4d6fd8cd107；代码基线：41c6961

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_row_hover_sync",
  "source_extraction_id": "13dd120e07024e50a04d22b10abf5663",
  "version": 1,
  "memory_type": "entities"
}
-->