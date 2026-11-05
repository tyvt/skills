# 单元拆分弹窗UI布局修复
园区物管2.0 中单元拆分弹窗曾存在布局容器错用、空数据异常、弹窗偏大、加载闪烁问题，已按数据量分场景重构布局。

## 问题根因
- 布局容器错用：弹窗内用了详情页 sub-container，内边距与表格样式不匹配
- 空数据展示异常：total=0 时仍走表格模式，出现搜索栏+空表格
- 弹窗尺寸偏大：表格模式用 medium（1300px），三列内容空旷
- 加载闪烁：数据未返回前先渲染表格结构

## 修复方案
- ≤6 条（含无数据）：form-box + 勾选卡片（同房屋选择弹窗），弹窗尺寸 mini（616px）
- >6 条：dialog-right + 搜索 + 表格 + 分页（同选择弹窗），弹窗尺寸 common（900px）
- 打开先显示 loading 避免闪烁；表格限制 max-height=360 避免过高；无数据显示 el-empty 不再空表格+搜索栏

## 验证与归属
- 验证：cursor 会话 5b2911f5 提取，已修复并请用户刷新验证
- 涉及文件：zhi2-web-admin/src/views/building/houseImport/detail.vue、zhi2-web-admin/src/views/benefit/pubMerchantNumber/components/pubMerchantTerminalTable.vue、zhi2-web-admin/src/views/building/unit/index.vue
- 所属项目：园区物管2.0；来源会话：5b2911f5-d317-4814-93d2-d063ea72a749；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unit_split_popup",
  "source_extraction_id": "4549e150f8d74af48f97510d9aa91ad6",
  "version": 1,
  "memory_type": "entities"
}
-->