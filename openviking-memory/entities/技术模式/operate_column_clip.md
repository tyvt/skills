# 操作列表头「操作」文字被裁切与错位
维护-开户与自治-表决等页面的子表操作列，表头「操作」文字显示不全或按钮被裁，且各页表现不一致，根因是业务页给 zs-operate-column 写死固定宽度。

## 问题现象
- 维护-开户（maintenance/accountOpen/owner）与自治-表决等子表操作列表头「操作」两字被省略号或裁切
- 不同页面表现不一致，部分页面按钮被裁
- 操作列同时写 fixed: right 时，固定列与数据列之间留出空白块

## 根因
- 操作列由公共组件 zs-operate-column 统一渲染，页面侧写死 :width（如 60/80），「操作」两字加内边距装不下
- 原生 el-table-column 与 zs-table-column 混用也会引起同类空白块

## 解决方案
- 列宽兜底下沉到 zs-operate-column 组件内部，按按钮文本测算并给最小值
- 业务页面只声明按钮，不再传固定 :width；已写死的页面逐个删掉 width 而非改大数字
- 操作列不要写 fixed: right；最终改用 zs-table-column、取消 fixed: right
- 改完按「同列不同页面」横比表头是否完整、按钮是否等距

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 7a62e9a6 用户反馈「表格列出现空白」「两个都不行」
- 涉及文件：src/components/zs-operate-column/zs-operate-column.vue、maintenance/accountOpen/owner/components/OpenDetailTable.vue
- 所属项目：产品2.0；来源会话：7a62e9a6-5f35-46c3-b3af-b44bad9ba866；代码基线：6accf9a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operate_column_clip",
  "source_extraction_id": "e59099027e5d4206a29ce912d71e4142",
  "version": 1,
  "memory_type": "entities"
}
-->