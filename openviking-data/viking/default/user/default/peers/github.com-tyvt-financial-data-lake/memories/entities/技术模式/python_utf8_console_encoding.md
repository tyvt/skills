# Python 中文控制台编码报错致输出阶段退出
用 Python 在控制台打印中文统计（如回测漏斗）时，可能因控制台编码报错使程序在输出阶段退出。

## 现象
- 筛选已跑到输出阶段，打印中文漏斗时控制台编码报错，程序随即退出
- 报错只发生在输出环节，正式结果文件与缓存没有被触碰

## 处理方式
- 改用 Python UTF-8 模式重跑，避免控制台默认编码无法输出中文
- 在全新的隔离目录重跑，隔离本次运行与正式产出、缓存

## 归属
- 所属项目：数据湖选股模块回测
- 来源会话：2026-11-15 回测首次筛选运行

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "技术模式",
  "name": "python_utf8_console_encoding",
  "source_extraction_id": "0a55fb9673d94997ae851ace04b2dc6d",
  "version": 1,
  "memory_type": "entities"
}
-->