# vite build 管道截断误报退出码 1
用 `vite build | head` 截断输出时，SIGPIPE 使 vite 进程退出码为 1，并非真实构建失败。

## 问题现象
- `vite build | head` 因输出被截断触发 SIGPIPE，导致 vite 退出码为 1
- 退出码 1 易误判为构建失败，实际构建可能已成功

## 解决方案
- 确认构建状态时直接运行 `npx vite build`，避免接 `| head` 等截断管道引发 SIGPIPE 误报

## 验证与归属
- 验证证据：extracted source=cursor session=97483054-f372-458c-b11a-afe35cc4d287
- 所属项目：产品2.0；代码基线：none；来源会话：97483054-f372-458c-b11a-afe35cc4d287

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_build_sigpipe",
  "source_extraction_id": "708689435f864318965b557f3ab6ccf6",
  "version": 1,
  "memory_type": "entities"
}
-->