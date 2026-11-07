# PortalTable 分页页码多出一页问题
PortalTable 组件 displayedPages 误用 Math.max 导致总页数为 1 时仍渲染两个页码。

## 问题根因
- displayedPages 写成了 Math.max(2, this.pages)
- Vue 中 v-for="num in N" 遍历 1…N，总页数 1 时画出「1、2」，第 2 页被 disabled 但界面多出一页

## 修复方法
- 改为 return this.pages，10 条每页 10 条时只显示第 1 页
- 刷新「可售楼盘展示」等使用 PortalTable 的页面验证

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/PortalTable.vue
- 所属项目：门户；来源会话：176808fe-ac0e-40e4-872f-fa68fc7638ab

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_table_pagination",
  "source_extraction_id": "7779062f47aa4113bae1c0d272741bd0",
  "version": 1,
  "memory_type": "entities"
}
-->