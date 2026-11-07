# 列表页表格高度跟随内容约定
园区物管2.0 后台列表页表格高度随内容收缩，取消 .list-card 自动撑满，禁止业务页各自覆盖。

## 现象
- 列表页表格下方出现大片空白，逐页改样式无效。

## 根因
- zs-table 在 .list-card 内自动撑满剩余高度（flex/height:100%），行数少时留白。

## 解决方案
- zs-table.vue 取消 .list-card 内自动撑满高度逻辑，index.scss 表格容器改 height:auto 按内容收缩。
- 改动经 develop/v2.6.1 → 2.6.2 → 2.6.2-yulin 按分支顺序逐级合并。
- 约定：列表页表格高度策略只改 zs-table 组件与全局 index.scss 两公共落点，禁止业务页面各自覆盖高度。

## 关联信息
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue、zhi2-web-admin/src/styles/index.scss、zhi2-web-admin/src/mixins/ListTemplate.js。
- 所属项目：园区物管2.0；来源会话：a3cdf258-43f5-4adb-9bc0-7f0801f15768；代码基线：036.md。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_table_height_policy",
  "source_extraction_id": "9f99b2420b5a45eaa510bde19c0c7eb0",
  "version": 1,
  "memory_type": "entities"
}
-->
