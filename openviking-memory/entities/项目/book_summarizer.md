
# Book Summarizer
本地书籍摘要工具，通过本地 LLM 对 `.txt` 书籍进行摘要。

## 描述
- 位于 `d:/repository/book-summarizer` 的 Python 项目，通过本地 LLM 推理对书籍进行摘要。
- 使用 `bin/` 下的 llama.cpp (b10617) 与 `models/` 下的 Qwen2.5-1.5B 模型进行推理。

## 用法
- 将 `.txt` 文件放入 `books\` 目录并执行 `run.bat` 进行摘要。
- 输出写入 `d:\repository\book-summarizer\output\sample_summary.json`。

## 组件
- 配置：`config.yaml`
- 入口脚本：`summarize.py`、`run.bat`
- 源码模块：`src/__init__.py`、`src/chunker.py`、`src/chapter_parser.py`、`src/llama_runner.py`、`src/summarizer.py`
- 文档：`README.md`

## 关联
- 记录于 book-summarizer/001.md（会话 16cfcbd7-f1da-4c37-85fc-9b33c312a150）


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "book_summarizer",
  "source_extraction_id": "90c73514e50f41c38ba0d322cbec7cd4",
  "version": 2,
  "memory_type": "entities"
}
-->