# szf 图片按分包拆分缺失致500
苏住房C 小程序筛选弹窗重置图标报 Failed to load local image resource .../reset.svg status 500，根因是 images/szf/ 资源按 resolveSzfImageSubpackage 归对应分包，但文件仅放主包。

## 问题现象
- 筛选弹窗重置图标报 [渲染层网络层错误] Failed to load local image resource /pages_transaction/static/images/szf/reset.svg status 500
- 报错文案像网络/服务器问题或 ZsImage 路径拼接 bug，实际是构建产物里分包缺少该文件

## 根因
- conditionScreening.vue 写相对路径 <ZsImage src="images/szf/reset.svg" />
- ZsImage 经 resolveStaticUrl 按 utils/index.js 的 resolveSzfImageSubpackage 把 images/szf/ 资源归属 pages_transaction 分包，实际请求该分包路径
- 该目录只放 reset.png，reset.svg 仅存在于主包 src/static/images/szf/，分包缺失故 500

## 解决方案
- 新增 szf 图片不要只放主包 src/static/，须同时（或按引用页面所在分包）复制到对应分包 src/pages_xxx/static/images/szf/
- 同名不同扩展名（png vs svg）必须按引用串精确匹配，不能想当然复用
- 排查同类 500 先核对 src 串与 resolveSzfImageSubpackage 解析出的分包路径，再到 target 分包目录 ls 确认文件存在

## 验证与归属
- 验证：会话 ffbc909f conditionScreening.vue 第204行引用 reset.svg；修复复制 reset.svg 到 pages_transaction 分包 static/images/szf/
- 涉及文件：conditionScreening.vue、ZsImage.vue、utils/index.js、pages_transaction/static/images/szf/reset.svg、主包 static/images/szf/reset.svg、scripts/migrate-vote-static.mjs、utils/mainStaticPaths.js
- 所属项目：苏住房C；来源会话ID：ffbc909f-a8cb-4166-8285-a0ac8381920f；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "szf_image_subpackage_500",
  "source_extraction_id": "6effc7066ae1427b831acada34d3612d",
  "version": 1,
  "memory_type": "entities"
}
-->