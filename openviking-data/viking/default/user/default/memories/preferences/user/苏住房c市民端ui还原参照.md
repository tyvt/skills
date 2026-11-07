- 苏住房C市民端(zhi2-mobile-shimin)页面改造以iOS原生代码为唯一权威参照，要求像素级还原页面UI且逻辑100%一致
- 素材缺失时去iOS工程取，禁止自绘或找近似图；菜单区按iOS实现方式组织配置(图标+文案+跳转)而非逐张硬贴
- 交付前按页截图与设计稿逐条比对，用户按页点名验收
- 清理同源残留：如误显示“家园区”需移除homeland相关全部逻辑而非隐藏入口，并全局复查同源残留模块
- 验证：会话d07a249b用户诉求参考iOS代码像素级还原、菜单图标参考iOS实现、移除homeland逻辑、电子业主卡图片仍有问题

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "苏住房C市民端UI还原参照",
  "source_extraction_id": "5eb3785fb5d541bfa8151d0735437bd1",
  "version": 1,
  "memory_type": "preferences"
}
-->