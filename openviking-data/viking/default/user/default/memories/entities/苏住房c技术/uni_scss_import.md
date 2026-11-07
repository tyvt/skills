# uni.scss相对路径@import构建失败
苏住房C 的 uni.scss 被注入每个页面样式块，其中相对路径 @import 会按当前页面目录解析导致构建找不到文件，必须改用 @/ 别名。

## 现象与根因
- zhi2-mobile-shimin 在 pages_tab/benefit/index.vue 编译时构建失败，报找不到 styles/zs-button.scss；文件确实存在于 src/styles/ 下
- src/uni.scss 是 uni-app 全局变量注入入口，会被塞进每个页面/组件的样式块
- 其中写的相对路径 @import './styles/zs-button.scss' 以「当前正在编译的 .vue 文件所在目录」为基准解析（如 pages_tab/benefit/），而非以 src/uni.scss 所在目录解析，路径落空
- 同一页面在 H5 可能侥幸不出错，构建 mp-weixin 时必现

## 解决方案
- uni.scss 及任何被全局注入的 scss 里，样式导入一律写项目别名 @import '@/styles/zs-button.scss'（与既有 @import "@/styles/btn.scss" 保持一致），禁止用 ./ 或 ../ 相对路径
- 新增公共样式文件时先在 uni.scss 里按别名挂好，再在页面里按需补充
- 改完跑一次 npm run build 核对，而不是只看 dev 热更新

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话 8f10f353：报错来自 terminals/15.txt:21-35；结论明确「uni.scss 被注入每个页面样式，相对路径按当前页面文件解析」，修复为 @import '@/styles/zs-button.scss'，改后 npm run build 通过
- 涉及文件：src/uni.scss、pages_tab/benefit/index.vue、src/styles/zs-button.scss、src/styles/btn.scss
- 所属项目：苏住房C；代码基线：5f0f4dc；来源会话ID：8f10f353-5bab-456e-8115-00b593a5bd85

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "uni_scss_import",
  "source_extraction_id": "2e192de19d9f4bb18647ef27da14cff8",
  "version": 1,
  "memory_type": "entities"
}
-->