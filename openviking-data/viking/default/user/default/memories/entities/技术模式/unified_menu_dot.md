# UnifiedLogin 菜单子项圆点伪元素
统一登录页四列菜单子项文字前的圆点由 ::before 伪元素绘制，而非列表符号。

## 问题背景
- 商品房/存量房/经纪机构/住房租赁四列菜单子项前缀圆点是 .menu-sub-item::before 绘制的小圆点
- 不是 <ul>/<li> 列表符号，改 list-style 无效

## 解决方案
- 去掉前缀应删除或隐藏 .menu-sub-item::before 伪元素规则
- 清理时一并移除仅服务于伪元素的 .menu-sub-more::before 等冗余规则

## 验证与归属
- 验证证据：会话 eb3f6c13 用户要求去掉文字前圆点，结论删除上述伪元素
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue
- 所属项目：门户；来源会话ID：eb3f6c13-b556-4a5f-8a57-32d5e3554b44；代码基线：a1e5beb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_menu_dot",
  "source_extraction_id": "68e834d5fe024c5aae8fd9b4419b2716",
  "version": 1,
  "memory_type": "entities"
}
-->