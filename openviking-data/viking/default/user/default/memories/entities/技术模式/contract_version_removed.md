# 合同范本标签移除
苏州市房地产监测V3 中 2016 版合同 UI 已移除工具栏「范本：SUZHOU_2016」标识，改动 2 个文件共 -7 行。

## 改动内容
- `chapters/suzhou2016/components/SzToolbar.vue`：删掉模板中 version span、无用 version prop，样式选择器由 `.s16-toolbar__code, .s16-toolbar__version` 收敛为 `.s16-toolbar__code`
- `views/contract/index.vue`：去掉 `<sz-toolbar>` 上的 `:version="templateVersion"` 传参；`templateVersion` 计算属性保留（isSuzhou2016 仍依赖其做版本判定）
- 临时挂静态路由实跑验证：工具栏左侧仅显示「苏州市商品房买卖合同」，`.s16-toolbar__version` 元素已不存在，页面文本无 `SUZHOU_2016`，右侧按钮布局不变无报错

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：chapters/suzhou2016/components/SzToolbar.vue、views/contract/index.vue、src/router/index.js、driver.js
- 所属项目：苏州市房地产监测V3；来源会话ID：5c1c1534-3904-44fd-ab90-b03d3aab9b9c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_version_removed",
  "source_extraction_id": "f45b2d9001e245ccb9ed80599939ed23",
  "version": 1,
  "memory_type": "entities"
}
-->