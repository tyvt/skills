
# 拼接遗漏config.js及脏名致面板异常
持仓面板因拼接遗漏与脏数据导致行业丢失、名称退化、股息率缺失。

## 根因
- `index.html` 拼接遗漏 `<script src="config.js">` 致 `window.PANEL_CONFIG` 为 undefined，`tgtOf()` 返 null 行业丢、名称退化代码
- 旧数据导入将 `code` 写入 `name` 致 `nameOf()` 覆盖真名
- 底仓股息率依赖 `config.targets[].dps` 缺失

## 关键修复
- 补回标签（第619行），新增 `realName()` 名等代码视未填重解析
- 抽 `dpsOf()` 无 dps 用股息率×现价反推

## 涉及文件
- D:/repository/数据湖/分析产出/持仓面板/index.html
- D:/repository/数据湖/分析产出/持仓面板/.build/part1.html
- D:/repository/数据湖/分析产出/持仓面板/.build/part3.html
- D:/repository/数据湖/分析产出/持仓面板/_selftest.js
- D:/repository/数据湖/分析产出/持仓面板/portfolio.js
- D:/repository/数据湖/分析产出/持仓面板/README.md
- index.html
- config.js

## 验证与归属
- 验证证据：src=数据湖/002.md
- 来源会话：01a1665c-eaa4-70c5-a400-7684f1fa41bc；代码基线 none


<!-- MEMORY_FIELDS
{
  "category": "数据湖技术模式",
  "name": "拼接遗漏configjs及脏名致面板异常",
  "source_extraction_id": "589afdd8dd9244a2b8efd0ea3c13b587",
  "version": 1,
  "memory_type": "entities"
}
-->