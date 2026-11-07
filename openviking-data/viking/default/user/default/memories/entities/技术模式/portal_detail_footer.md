# 门户弹窗公共底栏组件
门户 publicPortal 弹窗统一接入 PortalDetailFooter.vue 公共底栏，按钮居右、尺寸 80×40、距右 40px。

## 样式规范
- 按钮居右对齐
- 按钮尺寸固定 80×40
- 按钮距右侧 40px

## 相关改造
- 与 PortalDetailHeader.vue 公共标题栏配套使用
- portal.scss 移除重复标题栏样式，修正正文内边距重复叠加
- 首页“更多”菜单弹窗与公告弹窗改用公共 header

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/PortalDetailFooter.vue、portal.scss
- 所属项目：门户；来源会话ID：session_bcf22123674b5cdf5bb7fdb1484b1568；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_detail_footer",
  "source_extraction_id": "38c4fed0fdf5450498d3c66aeea4789a",
  "version": 1,
  "memory_type": "entities"
}
-->