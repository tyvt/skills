# llama-cli Exit Code 3221225725 Fix
Newer llama.cpp builds crash with exit code 3221225725 unless interactive mode is disabled.

## Problem
- llama-cli exits with code `3221225725` under default settings on newer builds (e.g., b10617).
- Root cause: the new version defaults to interactive mode, which fails in automated or non-interactive runs.

## Solution
- Launch with `--single-turn --simple-io` flags to disable interactive mode and use simple I/O.

## Relations
- Applied when running llama.cpp (Qwen2.5-1.5B) for the book-summarizer project.
- Documented in book-summarizer/001.md (session 16cfcbd7-f1da-4c37-85fc-9b33c312a150).

## 验证与归属
- 所属项目：book-summarizer
- 验证证据：extracted source=cursor project=book-summarizer
- 来源会话：16cfcbd7-f1da-4c37-85fc-9b33c312a150


<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "llama_cli_fix",
  "source_extraction_id": "ab00cea45f8d44d99f79bff584876b5e",
  "version": 1,
  "memory_type": "entities"
}
-->
