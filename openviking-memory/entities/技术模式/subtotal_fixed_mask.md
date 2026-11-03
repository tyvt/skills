# 小计行固定操作列穿透遮罩修复
带合计/小计行且横向滚动时，右侧固定操作列被小计数据穿透，需用 td:last-child 选择器与伪元素遮罩修复。

## 现象
- 表格有合计/小计行且横向滚动时，右侧固定操作列下方能看到小计行数据「穿透」上来，z-index 观感错乱
- 操作列小计单元格右侧多出一条竖线、底边横线又缺失

## 根因
- 固定列（fixed-right）的表体与小计行是不同层叠上下文，小计行单元格没有表体 class（class-name 只作用于表体，小计/合计行命中不到）
- 针对 zs-operate-column-cell 的选择器完全没生效；列间 1px 右边框由列本身绘制，会穿过固定层露出

## 解决方案
- 选择器改用 td:last-child 命中操作列小计单元格，不靠 class-name
- 保留/恢复 fixed-footer-wrapper::after 白色伪元素遮罩盖住右侧 1px 竖线，bottom 刻意留 1px 以保留操作列底边横线（整块 inset:0 会把底边一起盖掉）
- 有合计行时把固定右列容器设 overflow:visible，否则伪元素遮罩被裁切
- 改动点在 zs-table 公共组件，页面级 CSS 无法修

## 验证与归属
- 验证证据：会话 8e29a239 用户反馈横滚+小计时操作列显示底部数据，最终恢复 ::after（right:-1px, bottom:1px）并有合计行时 fixed-right 设 overflow:visible
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue、src/styles/index.scss、src/views/maintenance/receiptin/index.vue
- 所属项目：产品2.0；来源会话ID：8e29a239-a740-473b-921d-cd75f2915a3e；代码基线：49a7aa3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtotal_fixed_mask",
  "source_extraction_id": "1feff99c09f5411780734b6be1b7bdaf",
  "version": 1,
  "memory_type": "entities"
}
-->