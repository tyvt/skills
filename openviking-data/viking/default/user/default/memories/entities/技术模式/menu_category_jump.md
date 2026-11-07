# 跨项目跳转用 query 传菜单大类标题
门户跳本项目时在 URL query 带菜单大类标识，本项目 navbar 在配置标题后追加括号显示。

## 背景与原因
- 同一后台被门户多个大类入口共用，navbar 仅显示配置名时使用户分不清来源入口。
- 跨项目信息只能靠 URL 传参，这是唯一干净通道。

## 解决方案
- 门户侧跳转 URL 的 query 带大类编码（优先编码，不传中文名做业务判断）。
- 本项目 navbar 读取 query，在配置标题后追加「（大类）」展示，不替换原标题。
- 两端均改：门户前端子模块+主仓、本项目前端子模块+主仓，共 4 仓库分别提交 gitlink。
- query 缺失时仅显示配置标题，不报错或空括号。

## 验证与归属
- 验证：会话 session-30a69780（基线 89e5947）用户诉求从门户跳本项目带大类标题追加 navbar。
- 四仓库提交：门户前端子模块 bf5902a10、门户主仓 04cc4ec、房地产监测V3前端子模块 596d8a786、主仓 837bffd。
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue、permission.js、.gitmodules；所属项目：苏州市房地产监测V3；来源会话：session-30a69780-4954-4a8a-935b-5ab33a65444e。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "menu_category_jump",
  "source_extraction_id": "fec19138b36e482986eec549c6e4ea48",
  "version": 1,
  "memory_type": "entities"
}
-->