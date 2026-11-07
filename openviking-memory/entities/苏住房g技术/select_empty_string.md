# B端选择框空值统一用空串
B 端选择类字段的「未选」状态应统一用空字符串 '' 表示，避免 null/undefined 在不同序列化链上引发歧义。

## 问题现象
- 后台筛选/选择类条件（操作符、查询键等）空值表示有三种写法并存：undefined、null、''
- null 在某些控件被当成「已选中的空选项」，undefined 不渲染，'' 才稳定显示 placeholder，三者被 JSON.stringify 区别对待（undefined 的 key 被整体丢弃，null 保留）

## 根因
- 空值语义没有统一，导致「没选却带空条件」「禁用态还显示占位符」「清空后参数 key 消失」互相打架且都不报错

## 解决方案
- 选择类字段「未选」统一用空字符串 ''，只在提交前做一次显式剔除（不依赖 JSON 自动省略）
- 禁用态同时清掉 placeholder，避免灰色占位残留成可选项；清空外键/下拉写 '' 而非 undefined，否则字段被请求序列化整体丢掉
- 与「清空外键写成 undefined 会被 JSON.stringify 省略导致解绑失败」是同一根因在不同组件上的实例，但此处是新建选择框的默认值约定

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：zs-advanced-query 操作符/字段下拉区分「启用且有占位符」与「禁用且无占位符」，多操作符字段默认值从首项改为空交由用户选择
- 涉及文件：zhi2-web-admin/src/components/zs-advanced-query/zs-advanced-query.vue
- 所属项目：苏住房G；来源会话：429acee0-eca5-4450-8610-60939deb48d6；代码基线：5ccda28

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "select_empty_string",
  "source_extraction_id": "be6275e6d8164640a8327727cd8ac6dd",
  "version": 1,
  "memory_type": "entities"
}
-->