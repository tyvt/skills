# 列表页表格高度跟随内容修复
园区物管2.0 列表页表格高度改为跟随内容，去除 .list-card 内多余空白。

## 修改内容
- zs-table.vue：取消 .list-card 内自动撑满高度
- index.scss：表格容器改为按内容收缩

## 分支与提交
- develop/v2.6.1：提交 82149c069 fix 列表页表格高度跟随内容
- develop/v2.6.2：合并自 261，提交 9945a2cec
- develop/v2.6.2-yulin：合并自 262，提交 5b3b058de，改动未 push 远程

## 验证与归属
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue、src/styles/index.scss
- 所属项目：园区物管2.0；来源会话：a3cdf258-43f5-4adb-9bc0-7f0801f15768

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_table_height_follow_content",
  "source_extraction_id": "d4c167325849479e80ae46b9e66aeb77",
  "version": 1,
  "memory_type": "entities"
}
-->