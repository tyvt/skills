# ZsImage subpackage 静默失败
苏住房C 的 publishHouse/type.vue 问号图标因 ZsImage 的 subpackage 属性指错分包，资源路径解析失败而静默不显示。

## 问题根因
- 图片走 ZsImage，属性 subpackage="pages_transaction"，但图标资源实际在 pages_owner 分包下
- 小程序分包之间不能跨包取静态资源，subpackage 指错时编译期不报错，仅资源路径解析失败，属「静默失败」类

## 解决方案
- subpackage 必须填图片真实所在分包名（本例去掉错误值后从 pages_owner 正确加载）；资源在哪个分包调用方就声明哪个，或把常用图标上提到主包 src/static
- 排查顺序：图标/图片不显示 → 先确认 ZsImage 的 src 路径与 subpackage 是否同分包 → 再看资源是否真实存在于该分包 static 目录；不要先怀疑样式（宽高/display）
- 同批纯样式微调（权证类型末项补 border-bottom、下一步按钮 margin-top 改 40px）无复用价值，不单独提炼

## 验证与归属
- 验证：会话 cf1f68c5，基线 f1939b0；type.vue 问号图标未显示因 subpackage="pages_transaction" 指向错误分包，去掉后从 pages_owner 正确加载
- 涉及文件：src/pages_transaction/publishHouse/type.vue、src/components/ZsImage/ZsImage.vue、src/utils/index.js
- 所属项目：苏住房C；来源会话ID：cf1f68c5-695c-43d8-90ef-21ec5979676b；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsimage_subpackage",
  "source_extraction_id": "f684d63a5e0143f29d14a1b71d05f06a",
  "version": 1,
  "memory_type": "entities"
}
-->