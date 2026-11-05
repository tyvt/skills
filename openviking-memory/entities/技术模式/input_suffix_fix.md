# 输入框后缀与输入框高度不一致修复
产品2.0 的 zhi2-web-admin 中输入框后缀（如㎡）与 36px 输入框高度不一致问题已定位并修复，根因为错误 flex 拉伸与 CSS 加载竞态。

## 问题根因
- 生产环境 commit 5bb6be7 已部署 input-group-fix.css，但样式仍不正确
- 上次修复用了 align-items: stretch + align-self: stretch，在表单项 min-height: 38px 下后缀被纵向撑高，而输入框固定 36px
- index.html 用 media="none" + onload 异步加载 element-ui.css 和 input-group-fix.css，生产环境加载顺序不稳定

## 修复内容
- element-ui.scss 改为 align-items: center，移除 align-self: stretch，按尺寸为后缀设固定高度（medium: 36px）
- input-group-fix.css 同步更新修复规则
- element-ui.css 末尾追加修复样式，确保加载后生效
- index.html 改为同步顺序加载，移除不可靠 onload

## 涉及文件与归属
- 涉及文件：input-group-fix.css、element-ui.css、element-ui.scss、index.html
- 所属项目：产品2.0；来源会话：6e092b88-7451-45d2-9591-af86334101f0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "input_suffix_fix",
  "source_extraction_id": "0d97247c6f304cc4a9cc4f1e6b453cb7",
  "version": 1,
  "memory_type": "entities"
}
-->