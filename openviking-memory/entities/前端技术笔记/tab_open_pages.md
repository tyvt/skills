# 页签栏滚动与打开页数修复
园区V0 项目将可打开页面数量从5个增加到15个，并修复了页签栏滚动条左侧奇怪图标与末位页签被遮挡的问题。

## 问题现象
- 全局滚动条样式给所有滚动条加左右箭头按钮，页签栏横向滚动时左侧出现奇怪图标
- 右侧滚动条箭头占用约14px，加上页签栏 width:88.5% 未铺满，最后一个页签（如「提取业主信息」）被挤掉部分，关闭按钮不可点

## 解决方案
- 为 #myTab 单独设置滚动条样式，隐藏左右箭头按钮
- 页签栏改为 left:220px; right:0，与内容区对齐并占满宽度
- 滚动逻辑改用 getBoundingClientRect，新增页签时滚到该页签本身
- 增加 scroll-padding-inline:20px，保证末尾页签完整可见
- 打开页面数量限制从5个提升到15个（标题需求）

## 涉及文件与归属
- 涉及文件：main.css、BaseJs.js、index.html、bootstrap-tab.js
- 所属项目：园区V0；来源会话ID：a726fbc6-506c-419b-8b8c-b02f10958d6b；代码基线：none
- 验证：Ctrl+F5 强制刷新后，滚动条左侧无奇怪图标，末位页签完整显示且可关闭

## 验证与归属
- 验证证据：extracted source=cursor project=园区V0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "tab_open_pages",
  "source_extraction_id": "3b01b994d2274aec966ad5632121ebeb",
  "version": 1,
  "memory_type": "entities"
}
-->
