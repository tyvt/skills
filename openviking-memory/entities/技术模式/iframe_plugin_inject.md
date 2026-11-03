# 插件未注入iframe子页失效
页面在 iframe 中渲染，脚本仅注入主页面未进子 frame 致插件不生效，需配置 all_frames 注入（含 about:blank 子页）。

## 问题根因
- 页面在 iframe 中渲染，脚本仅注入主页面未进入子 frame
- 导致插件在子页不生效

## 修复方案
- 插件需配置 all_frames 注入（含 about:blank 子页）

## 验证与归属
- 验证证据：src=H5/001.md
- 涉及文件：@混淆图片.html
- 来源会话：6ecaed5d-de7a-48b4-9f19-36f8045db884；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "iframe_plugin_inject",
  "source_extraction_id": "ec014e6704ab4b4c97a1f8eea1e7cab1",
  "version": 1,
  "memory_type": "entities"
}
-->