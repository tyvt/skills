# book-summarizer
本地书籍摘要程序，使用 llama.cpp 与 Qwen2.5-1.5B 模型对书籍进行摘要处理。

## 技术选型
- 模型：Qwen2.5-1.5B（986MB），存放于 `models/`
- 推理引擎：llama.cpp b10617，存放于 `bin/`
- 早期从 GitHub / HuggingFace 直链下载失败（网络超时），后通过国内镜像成功安装

## 关键问题与修复
- llama-cli 压测出现退出码 `3221225725`（访问冲突），因新版默认进入交互模式不会自动退出
- 已通过 `--single-turn --simple-io` 参数修复

## 使用方式
- 项目路径 `d:epositoryook-summarizer\`，示例书已跑通，输出位于 `output\sample_summary.json`
- 将 `.txt` 文件放入 `books\` 后执行 `run.bat` 即可处理正式书籍

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "book_summarizer",
  "source_extraction_id": "62b333a7f9fe44d6a9b17e5681e305f9",
  "version": 1,
  "memory_type": "entities"
}
-->