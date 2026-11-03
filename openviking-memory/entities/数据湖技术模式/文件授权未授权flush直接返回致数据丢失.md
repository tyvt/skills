
# File System Access 未授权时 flush 直接返回致数据丢失
持仓面板用 File System Access API 保存时，刷新后未授权致 flush 直接 return，内存改动丢失。

## 现象
- 新增交易提示已保存，刷新后记录消失

## 根因
- 数据分内存、IndexedDB、holding.sqlite 三层；改动进内存，450ms 防抖后 flush() 保存
- 刷新后浏览器要求重新授权，`dbStale=true`，flush() 该分支直接 return，不写文件也不写缓存

## 修复方案
- `dbStale` 分支仍写内存快照进浏览器缓存，不碰文件
- `dirty` 标记持久化到缓存并启动恢复，防 reconcile() 误覆盖
- reconcile() 拿到授权后有未保存改动立刻补写文件
- 横幅区分「授权写入」(有改动)与「授权并同步」(无改动)
- 监听 pagehide/beforeunload/切后台兜底推进缓存

## 验证
- node _selftest.js：待授权新增一笔→缓存2笔→刷新两笔在→授权写入后文件2笔
- 修复前刷新后 601298 在=0；修复后=1，601000=1

## 涉及文件
- 分析产出/持仓面板/index.html
- 分析产出/持仓面板/config.js
- 分析产出/持仓面板/portfolio.js
- 分析产出/持仓面板/_selftest.js

## 验证与归属
- 来源会话：session-12c5a5c9-6a1b-48dd-a554-1fba34f5640e；代码基线 none


<!-- MEMORY_FIELDS
{
  "category": "数据湖技术模式",
  "name": "文件授权未授权flush直接返回致数据丢失",
  "source_extraction_id": "589afdd8dd9244a2b8efd0ea3c13b587",
  "version": 1,
  "memory_type": "entities"
}
-->