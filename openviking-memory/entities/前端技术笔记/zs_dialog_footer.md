# 嵌套zs-dialog footer溢出修复
弹窗内再开 zs-dialog 时内层 footer 被裁切或跑出可视区域，需修改 calculateHeight 逻辑。

## 问题根因
- zs-dialog 的 calculateHeight 把 dialogElement.style.height 设为 offsetHeight 像素值
- 嵌套或绝对定位拖拽时 flex 布局无法随内容伸缩，footer 脱离预期流

## 解决方案
- calculateHeight 末尾改为 dialogElement.style.height = 'auto'，由 flex 自然分配 header/body/footer
- 保留 minHeight 等其它逻辑，复测「弹窗里再开选择弹窗」场景 footer 完整可见
- 与「zs-dialog 传 header="" 留空标题条」等不同问题，此处为嵌套高度计算

## 验证与归属
- 验证证据：会话 7f3a94cb 诉求 3 用户反馈嵌套弹窗 footer 溢出，结论 calculateHeight 改为 height auto
- 涉及文件：zhi2-web-admin/src/components/zs-dialog/index.vue
- 所属项目：2-0；来源会话：7f3a94cb-8b2a-4c1e-9d3e-4f8a1b2c3d4e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zs_dialog_footer",
  "source_extraction_id": "359c236a1969416fa338e5f5e1bf3a00",
  "version": 1,
  "memory_type": "entities"
}
-->