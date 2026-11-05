# 小区搜索页行政区域筛选修复
泰兴小程序小区搜索页行政区域/街道/社区三级筛选不显示问题已完成修复。

## 改动要点
- `getDeptNodeId` 依次尝试 `id`→`deptId`→`value`→`code`→`deptCode`，避免区域节点因缺 `id` 被 `toPickerItems` 过滤。
- 三个筛选器由 `:data-list` 改为 `:dataList`，对齐项目其他页面，确保小程序端正确接收选项数据。
- `getRegionNodes` 对 `type` 做大小写不敏感判断，兼容虚拟根节点 `type='A'` 的包装节点。
- 补充调试日志：接口失败输出 `[complex-select] 加载部门树失败`；有数据但区域列表为空时输出首层节点字段。

## 验证与归属
- 模拟数据验证三级级联：维阳区→政基物业→金源盛世小区。
- 涉及文件：`src/staff/pages/complex-select/index.vue`、`useAreaDict.js`、`system.js` 等。
- 来源会话ID：f3da0ae1-d9e7-4d38-a9b0-33c0d1b0b09f；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_select_area_fix",
  "source_extraction_id": "51cb70092e4e466f85cae7370abe915c",
  "version": 1,
  "memory_type": "entities"
}
-->