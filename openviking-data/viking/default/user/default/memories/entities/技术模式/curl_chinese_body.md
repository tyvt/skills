# Windows curl 中文报文内联陷阱
Windows 下将含中文的 JSON body 内联进 curl 命令行会被本地代码页转码，导致服务端回「请求数据格式错误」假象。

## 问题现象
- 复现 App 抓包报文（含中文+约5KB签名）时，内联 `--data-binary '{...}'` 致服务端返回 `{"result":"fail","info":"请求数据格式错误"}`，实为编码破坏而非参数错。

## 根因
- Windows 命令行参数按本地代码页转码，中文字节被破坏，服务端解析失败。
- 错误信息指向数据格式，掩盖真实编码原因，易误判为参数问题。

## 解决方案
- 用 `--data-binary @captured_generate_req.json`（文件）或 heredoc 走 stdin，保证字节一致。
- 复现服务端问题优先用 App 原样抓包报文，不手工拼「差不多的」参数，以定位真实故障（本例结论：参数没问题，问题在服务端出报告/PDF 环节）。
- 自包含脚本 `bash curl_真实报文.sh gen|pre|both`，body 内嵌脚本文件而非命令行。
- 交付后端时附原始 json + curl 说明。

## 验证与归属
- 验证：会话 d30f0407（基线 fd5072d）实测同报文走文件/stdin 得真实失败（gen→生成报告失败、pre→HTTP500），确认参数无误。
- 涉及文件：D:/android-work/captured_generate_req.json、captured_preview_req.json、真实报文curl.md、curl_真实报文.sh；来源会话：d30f0407；代码基线：fd5072d。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "curl_chinese_body",
  "source_extraction_id": "324bcc3c77904f009d1e12d70ec4e463",
  "version": 1,
  "memory_type": "entities"
}
-->