# 输入框后缀高度不一致双根因
带后缀（如面积后缀 ㎡）的输入框组本地 dev 正常、生产后缀高出一截，根因为错误 flex 拉伸策略与 CSS 加载顺序竞态叠加。

## 问题现象
- 带后缀输入框组本地 dev 正常，部署生产后后缀比输入框高出一截
- 已部署 input-group-fix.css 仍不生效（commit 5bb6be7 已上线但样式仍不对）
- 生产域名 https://www.ylzhwy.com:8081/ 验证仍失败

## 根因分析
- 根因一：上一版用 align-items:stretch + align-self:stretch，表单项容器 min-height:38px 把后缀纵向撑满，输入框固定 36px，高度不一致
- 根因二：index.html 用 media="none" + onload 异步加载 element-ui.css / input-group-fix.css，生产构建下顺序不稳定，修复样式可能被 element-ui 默认样式覆盖
- 本地 dev 由 Vite 注入样式顺序稳定所以看不出来

## 解决方案
- 纵向对齐改 align-items:center 并显式删掉 align-self:stretch，按尺寸给后缀写固定高度（medium:36px）
- 两个 link 改同步顺序加载（去掉 media="none"+onload 链式触发），element-ui.css 在前、覆盖样式在后
- 覆盖样式在 element-ui.css 文件末尾追加一份兜底，确保 element-ui 无论何时生效都压得住
- 部署后强刷缓存再验证

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 会话 6e092b88 结论：双根因确认与修复（element-ui.scss 改 center、移除 stretch、固定高度；index.html 改同步加载）
- 涉及文件：components/AmountInput/index.vue、components/zs-input/zs-input.vue、styles/element-ui.scss、public/assets/css/element-ui.css、index.html
- 所属项目：产品2.0；来源会话：6e092b88-7451-45d2-9591-af86334101f0；代码基线：1fa4993

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "input_suffix_height",
  "source_extraction_id": "4a0d09f28e58446e8eec2d811704c187",
  "version": 1,
  "memory_type": "entities"
}
-->