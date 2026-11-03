# SVG图标重构误删改用组件内置CSS绘制
苏住房C小程序在重构中误删SVG矢量图标文件，导致状态指示类小图标静默失效，最终改用组件内置CSS绘制。

## 问题现象
- 卡片右侧勾选圆圈整块不显示，页面无任何报错
- 小程序里SVG加载失败不会抛错，仅呈现透明占位，需肉眼发现
- 根因为icon-checked.svg、icon-nocheck.svg等在重构中被删，模板仍通过ZsImage引用致404

## 排查与解决
- 排查顺序：确认仅图标类缺失→检查src/static目录文件是否存在→从git历史恢复被删SVG（本例恢复8个）
- 最终采纳更稳做法：状态由数据决定的小图标用组件内置CSS画（未选中灰空心圆，选中蓝渐变圆+白勾）
- 落地TitleCard组件内，删除失效的ZsImage插槽引用避免死代码
- 判断标准：装饰性大图走static资源，状态指示类小图标优先内置CSS/SVG字符串

## 验证与归属
- 验证会话7f2654d5：用户报选择样式与勾选圆圈缺失，恢复8个SVG并在TitleCard内置CSS单选圆圈
- 涉及文件：pages_owner/house/components/TitleCard.vue、owner/authentication.vue、TypeChoose_Suzhufang.vue
- 所属项目：苏住房C；代码基线：9832ba3；来源会话ID：7f2654d5-5bab-4165-aa36-1e84ddbdfa13

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "svg_css_fallback",
  "source_extraction_id": "28d9eabd30b54d718cb36189284f8f55",
  "version": 1,
  "memory_type": "entities"
}
-->